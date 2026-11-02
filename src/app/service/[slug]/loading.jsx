export default function ServiceLoadingSkeleton() {
  return (
    <div className="bg-sp-bg min-h-screen pb-24 animate-pulse">
      <div className="border-b border-sp-border bg-white py-3 px-4">
        <div className="max-w-7xl mx-auto h-4 w-48 bg-sp-tint/60 rounded" />
      </div>
      <div className="bg-white border-b border-sp-border py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="h-4 w-36 bg-sp-tint/70 rounded" />
          <div className="h-12 w-3/4 bg-sp-tint/60 rounded-sp-sm" />
          <div className="h-6 w-2/3 bg-sp-tint/40 rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-48 bg-white rounded-sp-md border border-sp-border" />
          <div className="h-64 bg-white rounded-sp-md border border-sp-border" />
        </div>
        <div className="lg:col-span-4">
          <div className="h-96 bg-white rounded-sp-md border border-sp-border" />
        </div>
      </div>
    </div>
  );
}

