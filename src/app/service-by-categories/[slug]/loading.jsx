export default function CategoryLoadingSkeleton() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24 animate-pulse">
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto h-4 w-40 bg-sp-tint/60 rounded" />
      </div>
      <div className="bg-white border-b border-sp-border py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-32 bg-sp-tint/70 rounded" />
            <div className="h-12 w-2/3 bg-sp-tint/60 rounded-sp-sm" />
            <div className="h-6 w-4/5 bg-sp-tint/40 rounded" />
          </div>
          <div className="lg:col-span-5 h-56 bg-sp-bg rounded-sp-md border border-sp-border" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-52 bg-white rounded-sp-md border border-sp-border" />
        <div className="h-52 bg-white rounded-sp-md border border-sp-border" />
        <div className="h-52 bg-white rounded-sp-md border border-sp-border" />
      </div>
    </div>
  );
}

