import React from "react";
import { Skeleton, Container } from "@mui/material";

// GEMINI-MYTJ: Keep provider/store loading UI available to the production bundle.
const StoreDetailsSkeleton = () => (
  <Container sx={{ py: 4 }}>
    <Skeleton variant="rectangular" width="100%" height={240} sx={{ borderRadius: 2, mb: 3 }} />
    <Skeleton variant="text" width="40%" height={40} />
    <Skeleton variant="text" width="25%" height={25} sx={{ mb: 3 }} />
    <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
  </Container>
);

export default StoreDetailsSkeleton;
