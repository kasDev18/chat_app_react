export default function SidebarSkeleton() {
  return (
    <div className="flex items-center gap-2 md:gap-3 w-full py-2 px-2 md:px-4">
      <div className="flex-shrink-0">
        <div className="skeleton rounded-full bg-gray-700 w-8 h-8 md:w-10 md:h-10" />
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <div className="skeleton bg-gray-700 h-4 w-24 md:w-40 rounded" />
        <div className="skeleton bg-gray-700 h-3 w-16 md:w-28 rounded" />
      </div>
    </div>
  );
}
