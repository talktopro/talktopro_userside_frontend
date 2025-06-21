import { Mentor } from "@/types/user";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { GraduationCap, X, Search } from "lucide-react";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import useDebounce from "@/hooks/useDebounce";
import MobileMentorCard from "./MobileMentorCard";

const MobileSearchbar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { getAllMentors } = useFetchMentorsList();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearchValue.trim().length > 0) {
      handleSearch(debouncedSearchValue);
    } else {
      setMentorsList([]);
    }
  }, [debouncedSearchValue]);

  const handleSearch = async (value: string) => {
    setIsSearching(true);
    try {
      const result = await getAllMentors({ search: value });
      setMentorsList(result);
    } catch (error) {
      setMentorsList([]);
    } finally {
      setIsSearching(false);
    }
  };

  const closeSearch = () => {
    setSearchValue("");
    setMentorsList([]);
  };

  return (
    <div className="w-full max-w-md sm:max-w-sm relative md:hidden mb-4" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search 
            size={18} 
            className="text-gray-400 dark:text-gray-500"
            strokeWidth={2.5}
          />
        </div>
        <Input
          type="text"
          placeholder="Search mentors..."
          className="w-full pl-10 pr-10 py-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-primary/50"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue.length > 0 && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={closeSearch}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {searchValue.length > 0 && (
        <div className="mt-4 bg-background rounded-lg shadow-sm border p-4">
          {isSearching ? (
            <div className="flex overflow-x-auto gap-4 pb-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-64 min-w-[170px] flex-shrink-0" />
              ))}
            </div>
          ) : mentorsList.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-40 w-full">
              <GraduationCap
                strokeWidth={1}
                size={50}
                className="opacity-60"
              />
              <p className="opacity-60 mt-3">No mentor details found!</p>
            </div>
          ) : (
            <div 
              className="w-full overflow-x-auto pb-2 "
              ref={scrollContainerRef}
            >
              <div className="flex gap-4">
                {mentorsList.map((mentor) => (
                  <div key={mentor._id} className="flex-shrink-0 w-[170px] ">
                    <MobileMentorCard mentor={mentor} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearchbar;