export function SkeletonCard() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-200" />

      <div className="flex-1 space-y-2">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
