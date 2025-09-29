"use client";

import { useState, useEffect } from 'react';
import type { Task } from '@/types';
import { useToast } from './use-toast';

const LOCAL_STORAGE_KEY = 'donedoer-tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

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
      createdAt: new Date().toISOString(),
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

  return { tasks, addTask, toggleTask, deleteTask, isLoaded };
}
