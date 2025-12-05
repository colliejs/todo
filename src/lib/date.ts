import dayjs from "dayjs";

export const formatDateTime = (date: dayjs.ConfigType) => {
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};