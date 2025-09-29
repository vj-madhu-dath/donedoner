"use client";

import { useState, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="I just finished..."
        className="flex-grow text-base"
        aria-label="New task"
      />
      <Button type="submit" size="icon" aria-label="Add task">
        <Plus className="h-5 w-5" />
      </Button>
    </form>
  );
}
