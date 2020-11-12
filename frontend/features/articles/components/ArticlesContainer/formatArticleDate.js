import { DateTime } from "luxon";


export const formatArticleDate = (date) => {
  const dt = DateTime.fromISO(date);
  return dt.toFormat("yyyy-mm-dd HH:mm");
};

export default formatArticleDate;
