// Import the Skeleton component from @mui/material
import { Skeleton } from '@mui/material';
import React from 'react';

// Export ProductSkeleton as a default export
export function ProductSkeleton() {
  return (
    <>
      {/* Render three Skeleton components */}
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </>
  );
}