import { useState, useEffect, FC, useRef } from "react"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"

interface IDateScrollerProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateScroller: FC<IDateScrollerProps> = ({ selectedDate, setSelectedDate }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [showShadow, setShowShadow] = useState({
    left: false,
    right: true
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const today = new Date()
    const nextDates: Date[] = Array.from({ length: 30 }, (_, i) => addDays(today, i))

    setDates(nextDates)
    setSelectedDate(today)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      // Show/hide left shadow based on scroll position
      setShowShadow((prev) => ({ ...prev, left: container.scrollLeft > 0 }))
      // Show/hide right shadow based on whether we've scrolled to the end
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1
      setShowShadow((prev) => ({ ...prev, right: !isAtEnd }))
    }
    handleScroll()

    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [dates]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  };

  return (
    <div className="relative">
      {/* Left fade shadow - conditionally shown */}
      {showShadow.left && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll pb-1 gap-2 custom-scrollbar mb-4 scroll-smooth"
      >
        {dates.map((date, index) => {
          const day = format(date, "dd")
          const weekday = format(date, "EEE")
          const month = format(date, "MMM")
          const isSelected =
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={cn(
                "flex-shrink-0 flex cursor-pointer flex-col items-center justify-center rounded-lg p-4 w-20 h-24 border transition-colors",
                isSelected ? "bg-purple-100 dark:bg-purple-900/50 border-purple-500/10" : "bg-muted hover:bg-muted/50",
              )}
            >
              <span className="text-xl font-bold">{day}</span>
              <span className="text-sm mt-1 opacity-70">{weekday}</span>
              <span className="text-xs opacity-70">{month}</span>
            </button>
          )
        })}
      </div>

      {/* Right fade shadow - conditionally shown */}
      {showShadow.right && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}
    </div>
  )
}

export default DateScroller