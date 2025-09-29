"use client";

import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { AISuggestion } from "@/components/AISuggestion";
import { useTasks } from "@/hooks/useTasks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, isLoaded, getSuggestion, suggestedTask, loadingSuggestion } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 text-foreground flex flex-col items-center pt-8 sm:pt-16 px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold font-headline text-foreground tracking-tight">DoneDoer</h1>
        <p className="text-muted-foreground mt-2">What have you accomplished today?</p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <Card className="shadow-lg border-none">
          <CardHeader>
            <TaskInput onAddTask={addTask} />
          </CardHeader>
          <CardContent>
            {isLoaded ? (
              <TaskList tasks={tasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
            ) : (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </CardContent>
        </Card>
        
        <AISuggestion 
          onGetSuggestion={getSuggestion} 
          suggestedTask={suggestedTask} 
          loading={loadingSuggestion}
        />
      </main>

      <footer className="text-center text-muted-foreground text-sm mt-16 pb-8">
        <p>Built with ❤️ and a sense of accomplishment.</p>
      </footer>
    </div>
  );
}
