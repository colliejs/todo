import React from "react";
import { MenuItem, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface StyledMenuItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const StyledMenuItem: React.FC<StyledMenuItemProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <MenuItem
      onClick={onClick}
      selected={selected}
      sx={{
        color: selected ? "primary.main" : "text.primary",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Typography variant="body1">{label}</Typography>
      {selected && <CheckIcon fontSize="small" />}
    </MenuItem>
  );
};
