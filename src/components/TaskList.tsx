import type { Task } from '@/types';
import { TaskItem } from './TaskItem';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12 px-6 border-2 border-dashed rounded-lg">
        <p className="font-medium">Your done list is empty.</p>
        <p className="text-sm">Add a task you've completed to get started!</p>
      </div>
    );
  }

  const totalTasks = tasks.length;

  return (
    <ScrollArea className="h-[40vh]" data-radix-scroll-area-root>
      <div className="pr-4">
        <ul className="space-y-3">
          {tasks.map((task,index) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              index={index}
              totalTasks={totalTasks}
            />
          ))}
        </ul>
      </div>
    </ScrollArea>
  );
}
