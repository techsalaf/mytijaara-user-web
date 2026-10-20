import React from "react";
import { Skeleton, Grid, Container } from "@mui/material";

// GEMINI-MYTJ: Keep detail-page loading UI available to the production bundle.
const ProductDetailsSkeleton = () => (
  <Container sx={{ py: 4 }}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" width="100%" height={380} sx={{ borderRadius: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" width="70%" height={40} />
        <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="50%" height={45} sx={{ borderRadius: 1 }} />
      </Grid>
    </Grid>
  </Container>
);

export default ProductDetailsSkeleton;
