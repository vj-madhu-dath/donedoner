"use client";

import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

const STORAGE_KEY_BULLETS = 'donedoner-scratchpad-bullets';
const STORAGE_KEY_LEGACY = 'donedoner-scratchpad';

const DEFAULT_BULLETS = [
  "Review priorities for today",
  "Brainstorm project ideas",
  "Draft notes and follow-ups",
];

export function useScratchpad() {
  const [bullets, setBullets] = useState<string[]>(DEFAULT_BULLETS);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BULLETS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBullets(parsed);
          setIsLoaded(true);
          return;
        }
      }

      // Check legacy text format if present
      const legacy = localStorage.getItem(STORAGE_KEY_LEGACY);
      if (legacy) {
        const lines = legacy
          .split('\n')
          .map((line) => line.replace(/^(\s*[-*+]\s+)/, '').trim())
          .filter(Boolean);
        if (lines.length > 0) {
          setBullets(lines);
          setIsLoaded(true);
          return;
        }
      }

      setBullets(DEFAULT_BULLETS);
    } catch (error) {
      console.error('Error loading scratchpad from localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not load your scratchpad.',
        variant: 'destructive',
      });
      setBullets(DEFAULT_BULLETS);
    }
    setIsLoaded(true);
  }, [toast]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY_BULLETS, JSON.stringify(bullets));
      } catch (error) {
        console.error('Error saving scratchpad to localStorage', error);
      }
    }
  }, [bullets, isLoaded]);

  return { bullets, setBullets, isLoaded };
}
