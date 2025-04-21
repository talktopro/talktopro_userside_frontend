import { Mentor } from "@/types/user";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { GraduationCap, X } from "lucide-react";
import MentorCard from "./MentorCard";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { getAllMentors } = useFetchMentorsList();

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    if (value.trim().length > 0) {
      setIsSearching(true);
      try {
        const result = await getAllMentors({ search: value });
        setMentorsList(result);
      } catch (error) {
        setMentorsList([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setMentorsList([]);
      setIsSearching(false);
    }
  };

  const closeSearch = () => {
    setSearchValue("");
    setMentorsList([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    if (searchValue.length > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchValue]);

  return (
    <div className="w-full max-w-md sm:max-w-sm relative" ref={searchRef}>
      <div className="flex items-center relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full pr-8 not-md:hidden"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {searchValue.length > 0 && (
          <button
            className="absolute right-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={closeSearch}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {searchValue.length > 0 && (
        <>
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40"
            onClick={closeSearch}
            style={{ top: "var(--navbar-height, 72px)" }}
          />
          <div className="fixed top-18 left-1/2 p-4 transform -translate-x-1/2 mt-2 bg-background border rounded-lg shadow-xl z-50 w-fit max-w-4xl">
            {isSearching ? (
              <div className="flex overflow-x-auto custom-scrollbar gap-6 pb-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-64 min-w-[240px]" />
                ))}
              </div>
            ) : mentorsList.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-72 w-4xl">
                <GraduationCap
                  strokeWidth={1}
                  size={50}
                  className="opacity-60"
                />
                <p className="opacity-60 mt-3">No mentor details found!</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto custom-scrollbar">
                <div
                  className=" grid gap-4 grid-flow-col auto-cols-[170px] md:auto-cols-[240px]"
                  onClick={closeSearch}
                >
                  {mentorsList.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Searchbar;
