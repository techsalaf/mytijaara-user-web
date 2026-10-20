import React from "react";
import { Autocomplete, TextField } from "@mui/material";

// GEMINI-MYTJ: Restore the shared searchable select used by module filters.
const SearchableSelect = ({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  searchPlaceholder,
  emptyText = "No options found",
  disabled = false,
  sx = {},
}) => {
  const selectedOption =
    options.find((opt) => opt.id === value || opt.value === value) || null;

  return (
    <Autocomplete
      size="small"
      fullWidth
      disabled={disabled}
      options={options}
      getOptionLabel={(opt) => (opt ? opt.name || opt.label || "" : "")}
      isOptionEqualToValue={(option, val) =>
        option?.id === val?.id || option?.value === val?.value
      }
      value={selectedOption}
      onChange={(_, newValue) => {
        if (typeof onChange === "function") {
          onChange(newValue ? newValue.id ?? newValue.value : "");
        }
      }}
      noOptionsText={emptyText}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={selectedOption ? "" : (placeholder || searchPlaceholder)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
      )}
      sx={{
        width: "100%",
        ...sx,
      }}
    />
  );
};

export default SearchableSelect;
