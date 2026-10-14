import React from "react";
import { Box } from "@mui/system";
import OffersSectionPage from "components/home/section-page/OffersSectionPage";

export const SECTION_GAP = 3;

export const getServiceSections = (configData) => [
  {
    id: "popular",
    label: "Popular Services",
    icon: (
      <Box sx={{ color: "warning.dark", display: "flex" }}>
        <i
          className="fi fi-rr-star"
          style={{ fontSize: "16px", lineHeight: 1, display: "flex" }}
        />
      </Box>
    ),
    content: <OffersSectionPage />,
    mobileContent: <OffersSectionPage />,
  },
  {
    id: "all-services",
    label: "All Services",
    icon: (
      <Box sx={{ color: "info.main", display: "flex" }}>
        <i
          className="fi fi-rr-apps"
          style={{ fontSize: "16px", lineHeight: 1, display: "flex" }}
        />
      </Box>
    ),
    content: <OffersSectionPage />,
    mobileContent: <OffersSectionPage />,
  },
];

export default getServiceSections;
