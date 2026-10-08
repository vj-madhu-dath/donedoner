"use client";

import { useRef, useEffect } from "react";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Share2, Trash2, Download } from "lucide-react";
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, clearTasks, isLoaded } = useTasks();
  const listRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Client-side only logic can go here.
  }, []);

  const handleShare = async () => {
    if (listRef.current === null) {
      return;
    }
    
    // Hide elements we don't want in the PNG
    const elementsToHide = listRef.current.querySelectorAll('.hideable-for-capture');
    elementsToHide.forEach(el => el.classList.add('hide-for-capture'));

    const { toPng } = await import('html-to-image');

    const getFontEmbedCSS = async () => {
      const fontUrl = 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap';
      try {
        const response = await fetch(fontUrl);
        const cssText = await response.text();
        
        const fontFaces = await Promise.all(
          cssText.split('@font-face').slice(1).map(async (rule) => {
            const urlMatch = rule.match(/url\((https?:\/\/[^)]+)\)/);
            if (!urlMatch) return `@font-face {${rule}}`;

            const fontUrl = urlMatch[1];
            try {
              const fontResponse = await fetch(fontUrl);
              const fontBuffer = await fontResponse.arrayBuffer();
              const base64Font = btoa(String.fromCharCode(...new Uint8Array(fontBuffer)));
              const mimeType = fontResponse.headers.get('content-type') || 'font/woff2';
              
              return `@font-face {${rule.replace(urlMatch[0], `url("data:${mimeType};base64,${base64Font}")`)}}`;
            } catch (e) {
              console.error('Failed to fetch font resource:', e);
              return `@font-face {${rule}}`; // Fallback to original rule
            }
          })
        );
        return fontFaces.join('\n');
      } catch (e) {
        console.error('Failed to fetch font stylesheet:', e);
        return '';
      }
    };

    const scrollContainer = listRef.current.querySelector('[data-radix-scroll-area-root]');
    const scrollViewport = listRef.current.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');

    let originalContainerHeight = '';
    let originalViewportHeight = '';

    if (scrollContainer instanceof HTMLElement) {
      originalContainerHeight = scrollContainer.style.height;
      scrollContainer.style.height = 'auto';
    }
    if (scrollViewport) {
      originalViewportHeight = scrollViewport.style.height;
      scrollViewport.style.height = 'auto';
    }


    try {
      const fontEmbedCSS = await getFontEmbedCSS();
      
      // Create a wrapper div to add padding without cutting off content
      const wrapper = document.createElement('div');
      wrapper.style.padding = '2rem';
      wrapper.style.backgroundColor = 'hsl(240 10% 3.9%)';
      wrapper.style.display = 'inline-block';
      
      // Clone the content
      const clone = listRef.current.cloneNode(true) as HTMLElement;
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);
      
      const dataUrl = await toPng(wrapper, {
        cacheBust: true,
        fontEmbedCSS: fontEmbedCSS,
        backgroundColor: 'hsl(240 10% 3.9%)',
      });
      
      // Clean up the wrapper
      document.body.removeChild(wrapper);
      
      const link = document.createElement('a');
      const dateString = format(new Date(), 'MMMM d');
      link.download = `${dateString}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    } finally {
       if (scrollContainer instanceof HTMLElement) {
        scrollContainer.style.height = originalContainerHeight;
      }
      if (scrollViewport) {
        scrollViewport.style.height = originalViewportHeight;
      }
       // Show the elements again
      elementsToHide.forEach(el => el.classList.remove('hide-for-capture'));
    }
  };

  const handleExportCSV = () => {
    if (tasks.length === 0) {
      return;
    }

    // Create CSV header
    const headers = ['Task', 'Status', 'Created Date'];
    
    // Create CSV rows
    const rows = tasks.map(task => [
      `"${task.text.replace(/"/g, '""')}"`, // Escape quotes in task text
      task.completed ? 'Completed' : 'Pending',
      format(new Date(task.createdAt), 'yyyy-MM-dd HH:mm:ss')
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const dateString = format(new Date(), 'MMMM d');
    link.download = `${dateString}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
    
    // Clean up
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 text-foreground flex flex-col items-center pt-8 sm:pt-16 px-4">
      <main ref={listRef} className="w-full max-w-2xl space-y-8">
        <header className="text-center">
            <h1 className="text-5xl font-bold font-headline text-foreground tracking-tight">DoneDoner</h1>
            <p className="text-muted-foreground mt-2">What have you accomplished today?</p>
        </header>
        <Card className="shadow-lg border-none overflow-hidden bg-card text-card-foreground">
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

        {tasks.length > 0 && (
            <Card className="shadow-lg border-none overflow-hidden hideable-for-capture">
                <CardFooter className="flex justify-between gap-2 p-6 flex-wrap">
                    <Button variant="outline" onClick={handleShare} className="flex-1 min-w-[120px]">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share as PNG
                    </Button>
                    <Button variant="outline" onClick={handleExportCSV} className="flex-1 min-w-[120px]">
                        <Download className="mr-2 h-4 w-4" />
                        Export as CSV
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex-1 min-w-[120px]">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete All
                        </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete all
                            your tasks.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={clearTasks}>
                            Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        )}
      </main>

      <footer className="text-center text-muted-foreground text-sm mt-16 pb-8 hideable-for-capture">
        <p>Built with ❤️ and a sense of accomplishment.</p>
      </footer>
    </div>
  );
}
