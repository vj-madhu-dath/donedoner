"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types';
import { suggestHabits } from '@/ai/flows/ai-powered-habit-suggestions';
import { useToast } from './use-toast';

const LOCAL_STORAGE_KEY = 'donedoer-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  
  const [suggestedTask, setSuggestedTask] = useState<string | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
      toast({
        title: "Error",
        description: "Could not load your saved tasks.",
        variant: "destructive"
      });
    }
    setIsLoaded(true);
  }, [toast]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Error writing to localStorage", error);
        toast({
            title: "Error",
            description: "Could not save your tasks.",
            variant: "destructive"
        });
      }
    }
  }, [tasks, isLoaded, toast]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  const completedTasks = tasks.filter(task => task.completed).map(task => task.text);

  const getSuggestion = useCallback(async () => {
    const tasksForSuggestion = completedTasks.length > 0 ? completedTasks : tasks.map(t => t.text);

    if (tasksForSuggestion.length === 0) {
        setSuggestedTask("Add some tasks first to get a personalized suggestion!");
        return;
    }

    setLoadingSuggestion(true);
    setSuggestedTask(null);
    try {
        const result = await suggestHabits({ completedTasks: tasksForSuggestion });
        setSuggestedTask(result.suggestedTask);
    } catch (error) {
        console.error("Error getting AI suggestion:", error);
        setSuggestedTask("Sorry, I couldn't come up with a suggestion right now. Please try again.");
        toast({
            title: "AI Suggestion Error",
            description: "There was a problem getting a suggestion.",
            variant: "destructive"
        });
    } finally {
        setLoadingSuggestion(false);
    }
  }, [completedTasks, tasks, toast]);

  return { tasks, addTask, toggleTask, deleteTask, isLoaded, getSuggestion, suggestedTask, loadingSuggestion };
}
