import type { Task } from '@/types';
// import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CheckIcon } from '@/components/ui/CheckIcon';

interface TaskItemProps {
  task: Task;
  // onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  totalTasks: number;
  index: number;
}

export function TaskItem({ task, index, totalTasks, onDeleteTask }: TaskItemProps) {
  let formattedTime = '';
  if (task.createdAt && typeof task.createdAt.getMonth === 'function') {
    try {
      formattedTime = format(task.createdAt, "h:mm a");
    } catch (e) {
      console.error('Could not format time:', task.createdAt, e);
      // formattedTime remains empty, so nothing will be rendered for the time.
    }
  }

  const taskNumber = totalTasks - index;


  return (
    <li className={cn(
      "flex items-center gap-4 p-3 rounded-lg transition-all duration-300", "bg-secondary/30"
    )}>
      <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary text-primary-foreground font-bold text-sm shrink-0">
        {taskNumber}
      </div>
      <div className="flex-grow">
        <div
          className={cn(
            "transition-all duration-300 text-card-foreground flex items-center gap-2"
          )}
        >
          <span className = "inline-block max-w-md break-words">{task.text}</span>
          <CheckIcon className="shrink-0 h-10 w-10"/>
        </div>
        {formattedTime && (
          <p className={cn(
            "text-xs",
            "text-muted-foreground"
          )}>
            {formattedTime}
          </p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(task.id)}
        className="h-8 w-8 text-muted-foreground opacity-50 hover:opacity-100 hover:bg-destructive/20 hover:text-destructive shrink-0 hideable-for-capture"
        aria-label={`Delete task: ${task.text}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
}
