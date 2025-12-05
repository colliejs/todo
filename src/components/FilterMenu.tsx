"use client";
import React from "react";
import { Menu } from "@mui/material";
import { StyledIconButton } from "@/components/StyledIconButton";
import { StyledMenuItem } from "@/components/StyledMenuItem";

export type FilterType = "all" | "active" | "completed";

interface TodoFilterMenuProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "active", label: "進行中" },
  { value: "completed", label: "已完成" },
  { value: "all", label: "全部任務" },
];

export const FilterMenu: React.FC<TodoFilterMenuProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        src="/icons/filter.svg"
        active={Boolean(anchorEl)}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              minWidth: 152,
              bgcolor: "background.paper",
              borderRadius: 1,
              marginTop: 1 / 4,
            },
          },
        }}
      >
        {FILTER_OPTIONS.map((option) => (
          <StyledMenuItem
            key={option.value}
            label={option.label}
            selected={currentFilter === option.value}
            onClick={() => {
              onFilterChange(option.value);
              handleClose();
            }}
          />
        ))}
      </Menu>
    </>
  );
};
