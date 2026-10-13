"use client";

import { useRef, useEffect } from "react";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useScratchpad } from "@/hooks/useScratchpad";

export function UnorderedListEditor() {
  const { bullets, setBullets, isLoaded } = useScratchpad();
  const inputRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  // Auto-resize textareas to fit their text content
  const resizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    inputRefs.current.forEach((el) => resizeTextarea(el));
  }, [bullets]);

  const handleItemChange = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    setBullets(updated);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // Enter key: create a new bullet item directly below
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const updated = [...bullets];
      updated.splice(index + 1, 0, "");
      setBullets(updated);
      setTimeout(() => {
        const nextEl = inputRefs.current[index + 1];
        if (nextEl) {
          nextEl.focus();
        }
      }, 0);
      return;
    }

    // Backspace on empty item: remove item and focus previous item
    if (e.key === "Backspace" && bullets[index] === "") {
      if (bullets.length > 1) {
        e.preventDefault();
        const updated = bullets.filter((_, i) => i !== index);
        setBullets(updated);
        setTimeout(() => {
          const prevEl = inputRefs.current[Math.max(0, index - 1)];
          if (prevEl) {
            prevEl.focus();
            prevEl.selectionStart = prevEl.selectionEnd = prevEl.value.length;
          }
        }, 0);
      }
      return;
    }

    // Up arrow navigation
    if (e.key === "ArrowUp") {
      const el = e.currentTarget;
      if (el.selectionStart === 0 && index > 0) {
        e.preventDefault();
        const prevEl = inputRefs.current[index - 1];
        if (prevEl) {
          prevEl.focus();
          prevEl.selectionStart = prevEl.selectionEnd = prevEl.value.length;
        }
      }
      return;
    }

    // Down arrow navigation
    if (e.key === "ArrowDown") {
      const el = e.currentTarget;
      if (el.selectionStart === el.value.length && index < bullets.length - 1) {
        e.preventDefault();
        const nextEl = inputRefs.current[index + 1];
        if (nextEl) {
          nextEl.focus();
          nextEl.selectionStart = nextEl.selectionEnd = 0;
        }
      }
      return;
    }
  };

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLTextAreaElement>
  ) => {
    const text = e.clipboardData.getData("text");
    if (text.includes("\n")) {
      e.preventDefault();
      const lines = text
        .split("\n")
        .map((line) => line.replace(/^(\s*[-*+]\s+)/, "").trim())
        .filter(Boolean);

      if (lines.length > 0) {
        const updated = [...bullets];
        if (updated[index] === "") {
          updated.splice(index, 1, ...lines);
        } else {
          updated.splice(index + 1, 0, ...lines);
        }
        setBullets(updated);
      }
    }
  };

  const handleContainerClick = () => {
    // Focus last item or add a new bullet if user clicks empty container area
    if (bullets.length === 0) {
      setBullets([""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    } else {
      const lastIndex = bullets.length - 1;
      const lastEl = inputRefs.current[lastIndex];
      if (lastEl) {
        lastEl.focus();
      }
    }
  };

  const activeCount = bullets.filter((b) => b.trim().length > 0).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 shadow-sm bg-card/90 backdrop-blur-md hover:bg-secondary/40 border-border text-foreground transition-all"
          title="Open Scratchpad"
        >
          <List className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Scratchpad</span>
          {isLoaded && activeCount > 0 && (
            <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary/20 text-foreground font-semibold text-xs flex items-center justify-center font-mono">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[320px] sm:max-w-sm flex flex-col p-6 bg-card text-card-foreground border-r border-border shadow-2xl"
      >
        <SheetHeader className="pb-3 border-b border-border/40 text-left">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <List className="h-4 w-4" />
              </div>
              <SheetTitle className="text-lg font-bold font-headline tracking-tight">
                Scratchpad
              </SheetTitle>
            </div>
            <span className="text-xs text-muted-foreground">
              {activeCount} {activeCount === 1 ? "item" : "items"}
            </span>
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Unordered thoughts & quick notes
          </SheetDescription>
        </SheetHeader>

        <ScrollArea
          className="flex-1 my-4 pr-3 cursor-text"
          onClick={handleContainerClick}
        >
          <ul className="space-y-1.5 list-none p-0 m-0">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 py-1 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                <textarea
                  ref={(el) => {
                    inputRefs.current[index] = el;
                    resizeTextarea(el);
                  }}
                  value={bullet}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={(e) => handlePaste(index, e)}
                  rows={1}
                  placeholder={
                    index === 0 && bullets.length === 1 ? "Type a note..." : ""
                  }
                  className="w-full bg-transparent border-none outline-none resize-none text-sm font-body text-card-foreground leading-relaxed p-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 overflow-hidden"
                  aria-label={`Scratchpad item ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </ScrollArea>

        <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground flex justify-between items-center">
          <span>Enter for new bullet</span>
          <span>Auto-saves</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
