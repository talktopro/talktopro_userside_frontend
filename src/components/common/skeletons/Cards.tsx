import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCards = () => {
  return (
    <div className="flex flex-wrap not-sm:justify-center sm:justify-start gap-3">
      {[...Array(8)].map((_, index) => (
        <Skeleton
          className="w-[280px] min-w-[280px] h-80 rounded-lg bg-muted"
          key={index}
        />
      ))}
    </div>
  );
};

export default SkeletonCards;
