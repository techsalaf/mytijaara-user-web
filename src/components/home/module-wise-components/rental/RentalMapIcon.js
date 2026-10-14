import React from "react";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useTheme } from "@mui/material";

export const RentalMapIcon = ({ size = 20, color, ...props }) => {
  const theme = useTheme();
  return (
    <MapOutlinedIcon
      sx={{
        fontSize: size,
        color: color || theme.palette.primary.main,
      }}
      {...props}
    />
  );
};

export default RentalMapIcon;
