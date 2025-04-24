import { useState, useEffect, FC } from "react"
import { format, addDays } from "date-fns"
import { cn } from "@/lib/utils"

interface IDateScrollerProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateScroller: FC<IDateScrollerProps> = ({ selectedDate, setSelectedDate }) => {
  const [dates, setDates] = useState<Date[]>([])

  useEffect(() => {
    const today = new Date()
    const nextDates: Date[] = Array.from({ length: 30 }, (_, i) => addDays(today, i))

    setDates(nextDates)
    setSelectedDate(today)
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  };

  return (
    <div className="flex overflow-x-auto pb-1 gap-2 custom-scrollbar mb-4">
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
  )
}

export default DateScroller