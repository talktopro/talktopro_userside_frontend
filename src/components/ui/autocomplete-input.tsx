"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface AutocompleteInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  suggestions?: string[]
  onChange?: (value: string) => void
  onSelectSuggestion?: (value: string) => void
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ className, suggestions = [], onChange, onSelectSuggestion, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    // Merge the forwarded ref with our local ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    // Filter suggestions based on input value
    useEffect(() => {
      if (inputValue.trim() === "") {
        setFilteredSuggestions([])
        return
      }

      const filtered = suggestions.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      )
      setFilteredSuggestions(filtered)
    }, [inputValue, suggestions])

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      setShowSuggestions(true)
      onChange?.(value)
    }

    // Handle suggestion selection
    const handleSelectSuggestion = (suggestion: string) => {
      setInputValue(suggestion)
      setShowSuggestions(false)
      setActiveSuggestionIndex(-1)
      onSelectSuggestion?.(suggestion)
      onChange?.(suggestion)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showSuggestions || filteredSuggestions.length === 0) return

      // Arrow down
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveSuggestionIndex((prevIndex) => (prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0))
      }
      // Arrow up
      else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveSuggestionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1))
      }
      // Enter
      else if (e.key === "Enter" && activeSuggestionIndex > -1) {
        e.preventDefault()
        handleSelectSuggestion(filteredSuggestions[activeSuggestionIndex])
      }
      // Escape
      else if (e.key === "Escape") {
        setShowSuggestions(false)
        setActiveSuggestionIndex(-1)
      }
    }

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setShowSuggestions(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    return (
      <div className="relative w-full">
        <input
          {...props}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover shadow-md"
          >
            <ul className="py-1">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={cn(
                    "flex cursor-pointer items-center px-3 py-2 text-sm",
                    index === activeSuggestionIndex
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {suggestion}
                  {inputValue === suggestion && <Check className="ml-auto h-4 w-4" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  },
)

AutocompleteInput.displayName = "AutocompleteInput"

export { AutocompleteInput }