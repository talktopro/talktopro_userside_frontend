import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="mb-2">
          <Skeleton className="h-10 w-full bg-muted pulse" />
        </div>
      ))}
    </>
  );
};

export default SkeletonTable;
