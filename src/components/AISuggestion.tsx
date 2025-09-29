"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, LoaderCircle } from 'lucide-react';

interface AISuggestionProps {
  onGetSuggestion: () => void;
  suggestedTask: string | null;
  loading: boolean;
}

export function AISuggestion({ onGetSuggestion, suggestedTask, loading }: AISuggestionProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-headline">
          <Sparkles className="text-primary h-5 w-5" />
          <span>AI Habit Suggestion</span>
        </CardTitle>
        <CardDescription>Let AI suggest a new task based on your completed ones.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4">
        {loading && (
          <div className="flex items-center text-sm text-muted-foreground">
             <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
             Thinking...
          </div>
        )}
        {suggestedTask && !loading && (
          <div className="p-3 rounded-md bg-secondary text-secondary-foreground w-full">
            <p>{suggestedTask}</p>
          </div>
        )}
        <Button onClick={onGetSuggestion} disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Suggest a new habit
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
