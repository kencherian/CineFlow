import React from 'react';

const Skeleton = () => {
  return (
    <div className="animate-pulse bg-white/5 rounded-2xl w-full aspect-[2/3] shadow-lg">
      {/* The aspect-[2/3] ensures the skeleton matches the exact aspect ratio of standard movie posters */}
    </div>
  );
};

export default Skeleton;