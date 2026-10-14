import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VariationModal = ({ open, onClose, items, selectedVariation, onSelectVariation, isUpdateFromCard, isLoading }) => {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Select Option
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {/* Variation options modal */}
      </DialogContent>
    </Dialog>
  );
};

export default VariationModal;
