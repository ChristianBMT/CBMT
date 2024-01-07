"use client";

import { useState, useRef, useCallback, KeyboardEvent, useEffect } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Tag = { value: string; label: string };

type MultiSelectProps = {
  tagData: Tag[];
  selectedTags: Tag[];
  onTagsChange: (selectedTags: Tag[]) => void;
};

export function MultiSelect({
  tagData,
  selectedTags,
  onTagsChange,
}: MultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSelected(selectedTags);
    onTagsChange(selectedTags);
  }, [selectedTags]);

  const handleUnselect = useCallback(
    (data: Tag) => {
      const updatedSelected = selected.filter((s) => s.value !== data.value);
      setSelected(updatedSelected);
      onTagsChange(updatedSelected); // Notify parent about updated selected tags
    },
    [selected, onTagsChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            setSelected(newSelected);
            onTagsChange(newSelected); // Notify parent about updated selected tags
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, onTagsChange]
  );

  const selectables = tagData.filter((data) => !selected.includes(data));

  const handleTagSelect = (data: Tag) => {
    setInputValue("");
    const updatedSelected = [...selected, data];
    setSelected(updatedSelected);
    onTagsChange(updatedSelected); // Notify parent about updated selected tags
  };

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible">
      <div className="group px-3 py-2 text-sm rounded-md border border-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
        <div className="flex gap-1 flex-wrap">
          {selected.map((data) => {
            return (
              <Badge key={data.value} variant="secondary">
                {data.label}
                <button
                  className="ml-1 rounded-full outline-none focus:ring-1 focus:ring-white/25 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(data);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(data)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Filter topics"
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1 focus-within:ring-0"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md bg-white dark:bg-black text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((data) => {
                return (
                  <CommandItem
                    key={data.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      handleTagSelect(data);
                    }}
                    className={"cursor-pointer"}
                  >
                    {data.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
