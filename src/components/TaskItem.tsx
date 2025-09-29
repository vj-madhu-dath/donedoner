import type { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItem({ task, onToggleTask, onDeleteTask }: TaskItemProps) {
  let formattedDate = '';
  if (task.createdAt && typeof task.createdAt.getMonth === 'function') {
    try {
      formattedDate = format(task.createdAt, "MMM d, yyyy 'at' h:mm a");
    } catch (e) {
      console.error('Could not format date:', task.createdAt, e);
      // formattedDate remains empty, so nothing will be rendered for the date.
    }
  }


  return (
    <li className={cn(
        "flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
        task.completed ? "bg-secondary/30" : "bg-card hover:bg-accent"
      )}>
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => onToggleTask(task.id)}
        aria-label={`Mark task ${task.text} as ${task.completed ? 'not done' : 'done'}`}
        className="h-5 w-5"
      />
      <div className="flex-grow">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "cursor-pointer transition-all duration-300",
            task.completed ? "line-through text-muted-foreground" : "text-card-foreground"
          )}
        >
          {task.text}
        </label>
        {formattedDate && (
          <p className={cn(
              "text-xs",
              task.completed ? "text-muted-foreground/80" : "text-muted-foreground"
            )}>
            {formattedDate}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(task.id)}
        className="h-8 w-8 text-muted-foreground opacity-50 hover:opacity-100 hover:bg-destructive/20 hover:text-destructive shrink-0"
        aria-label={`Delete task: ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
