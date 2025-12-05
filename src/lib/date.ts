import dayjs from "dayjs";

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};

export const isOverdue = (date?: dayjs.ConfigType) => {
  if (!date) return false;
  return dayjs(date).isBefore(dayjs());
};