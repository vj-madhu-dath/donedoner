import type { Task } from '@/types';
import { TaskItem } from './TaskItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12 px-6 border-2 border-dashed rounded-lg">
        <p className="font-medium">Your done list is empty.</p>
        <p className="text-sm">Add a task you've completed to get started!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[40vh] pr-4 -mr-4" data-radix-scroll-area-root>
      <ul className="space-y-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
