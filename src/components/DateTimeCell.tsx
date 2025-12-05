import React, { useState } from "react";
import { TableCell, Box, Typography } from "@mui/material";
import { DateTimePicker } from "./DatePicker";
import { formatDateTime, isOverdue } from "@/lib/date";
import Image from "next/image";
interface DateTimeCellProps {
  date?: string;
  onDateChange: (newDate: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

export const DateTimeTableCell: React.FC<DateTimeCellProps> = ({
  date,
  onDateChange,
  onOpenChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    onOpenChange?.(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onOpenChange?.(false);
  };

  const handleSave = (newDate: string) => {
    onDateChange(newDate);
    handleClose();
  };

  const overdue = isOverdue(date);
  const open = Boolean(anchorEl);

  return (
    <TableCell
      sx={{
        width: "180px",
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          minHeight: "24px",
        }}
      >
        {!date ? (
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={16}
            height={16}
            role="button"
            data-id="date-time-cell-icon"
            tabIndex={10}
            aria-label="Open date picker"
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: overdue ? "error.main" : "text.primary",
            }}
          >
            {formatDateTime(date)}
          </Typography>
        )}
      </Box>
      {open && (
        <DateTimePicker
          open={open}
          anchorEl={anchorEl}
          initialDate={date}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </TableCell>
  );
};
