import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const filterItems: string[] = ["Day", "Week", "Month"];

const AnalyticsGraph = () => {
   const [selectedFilter, setSelectedFilter] = useState<"Day" | "Week" | "Month">("Day");

   const today = new Date();

   const getWeekRange = () => {
      const endDate = today;
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6);
      return `${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
   };

   const getAnalyticsText = () => {
      switch (selectedFilter) {
         case "Day":
            return `Analytics for ${today.toLocaleDateString()}`;
         case "Week":
            return `Analytics from ${getWeekRange()}`;
         case "Month":
            return `Analytics for the month of ${today.toLocaleString("default", {
               month: "long",
            })}`;
      }
   };

   const handleFilterChange = (value: "Day" | "Week" | "Month") => {
      setSelectedFilter(value);
   };

   return (
      <div className="w-full rounded-lg border md:min-h-max p-2 pl-4">
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-lg font-semibold">Analytics</h3>
               <p className="m-0 text-xs">{getAnalyticsText()}</p>
            </div>
            <Select
               value={selectedFilter}
               onValueChange={handleFilterChange}
            >
               <SelectTrigger className="w-[180px] not-sm:w-[100px] focus:ring-0 focus:outline-none cursor-pointer">
                  <SelectValue placeholder="Filter" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     {filterItems.map((item, index) => (
                        <SelectItem
                           value={item}
                           key={index}
                           className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
                        >
                           {item}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
         <div className="flex items-center justify-center h-96">
            <p className="text-center">
               Need to show a graph to represent Bookings, Users, Mentors
            </p>
         </div>
      </div>
   );
};

export default AnalyticsGraph;