import { Mentor } from "@/types/user";
import { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { GraduationCap, X, Search } from "lucide-react";
import useFetchMentorsList from "@/hooks/useFetchMentorsList";
import useDebounce from "@/hooks/useDebounce";
import MobileMentorCard from "./MobileMentorCard";

type MobileSearchbarProps = {
  closeSearchBar: () => void;
};

const MobileSearchbar = ({ closeSearchBar }: MobileSearchbarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [mentorsList, setMentorsList] = useState<Mentor[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

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
      setMentorsList(result?.mentors || []);
    } catch (error) {
      setMentorsList([]);
    } finally {
      setIsSearching(false);
    }
  };

  const closeSearch = () => {
    setSearchValue("");
    setMentorsList([]);
    closeSearchBar();
  };

  return (
    <div
      className="max-w-md sm:max-w-sm w-full mx-auto px-4 relative md:hidden mb-4"
      ref={searchRef}
    >
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
          className="w-full pl-10 pr-10 py-5 rounded-sm    focus-visible:ring-2 focus-visible:ring-primary/50"
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
        <>
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70  backdrop-blur-sm z-40"
            onClick={closeSearch}
            style={{ top: "var(--navbar-height, 72px)", marginTop: "3rem" }}
          />

          <div className="fixed top-18 left-1/2 p-4 transform -translate-x-1/2 mt-14 bg-background border rounded-lg shadow-xl z-50 max-w-screen overflow-hidden ">
            {isSearching ? (
              <div className="flex overflow-x-auto custom-scrollbar gap-6 pb-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-64 min-w-[240px]" />
                ))}
              </div>
            ) : mentorsList.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-32 w-75">
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
                  className=" grid gap-0 grid-flow-col auto-cols-[170px] md:auto-cols-[240px]"
                  onClick={closeSearch}
                >
                  {mentorsList.map((mentor) => (
                    <MobileMentorCard key={mentor._id} mentor={mentor} />
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

export default MobileSearchbar;
