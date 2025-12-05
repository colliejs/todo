"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, TableRow, TableCell, Typography } from "@mui/material";
import Image from "next/image";
import { DateTimeTableCell } from "./DateTimeCell";
import { formatDateTime } from "@/lib/date";
import { StyledTextField } from "./StyledTextField";

interface TodoInputProps {
  onSave: (title: string, dueDate?: string) => void;
  onCancel: () => void;
}

export const AddingRow: React.FC<TodoInputProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const [createdAt] = useState(new Date());

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const handleSave = (title: string, dueDate?: string) => {
    onSave(title, dueDate);
    setTitle("");
    setDueDate(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (title.trim()) {
        handleSave(title, dueDate);
      } else {
        onCancel();
      }
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget?.dataset?.id === "date-time-cell-icon") {
        return;
      }

      if (title.trim()) {
        handleSave(title, dueDate);
      } else {
        onCancel();
      }
    }, 0);
  };
  return (
    <TableRow hover>
      {/* 1. Checkbox */}
      <TableCell
        sx={{
          pt: 0,
          pb: 0,
          width: "424px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image src="/icons/add.svg" alt="add" width={16} height={16} />
          <StyledTextField
            fullWidth
            placeholder="輸入後按下Enter進行儲存"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            inputRef={inputRef}
            sx={{
              pl: 1,
            }}
          />
        </Box>
      </TableCell>

      {/* 2. Due Date  */}
      <DateTimeTableCell
        date={dueDate}
        onDateChange={setDueDate}
      />

      {/* 3. Created At */}
      <TableCell>
        <Typography variant="body1" color="text.secondary">
          {formatDateTime(createdAt)}
        </Typography>
      </TableCell>

      {/* 4. Task ID */}
      <TableCell></TableCell>
    </TableRow>
  );
};
