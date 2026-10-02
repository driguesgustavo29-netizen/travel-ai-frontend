import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="space-y-2">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>
      <div className="h-8 w-24 bg-gray-200 rounded" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-28 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
