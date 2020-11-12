import { DateTime } from "luxon";


export const humanizeDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.toLocaleString(DateTime.DATETIME_MED);
};

export default humanizeDate;
