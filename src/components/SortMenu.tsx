"use client";
import React from "react";
import { Menu } from "@mui/material";
import { StyledIconButton } from "@/components/StyledIconButton";
import { StyledMenuItem } from "@/components/StyledMenuItem";

export type SortType = "dueDate" | "createdAt" | "title" | "order" | "taskID";

interface SortMenuProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "createdAt", label: "Created At" },
  { value: "dueDate", label: "Due Date" },
  { value: "taskID", label: "Task ID" },
];

export const SortMenu: React.FC<SortMenuProps> = ({
  currentSort,
  onSortChange,
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
        src="/icons/sorter.svg"
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
        {SORT_OPTIONS.map((option) => (
          <StyledMenuItem
            key={option.value}
            label={option.label}
            selected={currentSort === option.value}
            onClick={() => {
              onSortChange(option.value);
              handleClose();
            }}
          />
        ))}
      </Menu>
    </>
  );
};
