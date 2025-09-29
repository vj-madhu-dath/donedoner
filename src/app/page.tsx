"use client";

import { useRef } from "react";
import * as htmlToImage from 'html-to-image';
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, isLoaded } = useTasks();
  const listRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    if (listRef.current === null) {
      return;
    }

    htmlToImage.toPng(listRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'donedoer-list.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('oops, something went wrong!', err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 text-foreground flex flex-col items-center pt-8 sm:pt-16 px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold font-headline text-foreground tracking-tight">DoneDoer</h1>
        <p className="text-muted-foreground mt-2">What have you accomplished today?</p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <Card className="shadow-lg border-none" ref={listRef}>
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
          {tasks.length > 0 && (
            <CardFooter>
              <Button variant="outline" onClick={handleShare} className="w-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share as PNG
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>

      <footer className="text-center text-muted-foreground text-sm mt-16 pb-8">
        <p>Built with ❤️ and a sense of accomplishment.</p>
      </footer>
    </div>
  );
}
