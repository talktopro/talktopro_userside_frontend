
import { Skeleton } from "@/components/ui/skeleton";

const SingleSkeletonCard = () => {
  return (
    <div className="max-h-[80dvh] overflow-auto custom-scrollbar">
      <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {[...Array(1)].map((_, index) => (
          <Skeleton
            className="h-70 not-sm:h-50 rounded-lg bg-muted animate-pulse"
            key={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default SingleSkeletonCard
