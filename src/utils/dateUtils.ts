import dayjs from "dayjs";
import utc from "dayjs";
import timezone from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const minDate = dayjs().toDate();
const minTime = dayjs().hour(7).minute(0).toDate();
const maxTime = dayjs().hour(17).minute(0).toDate();

const filterPassedTime = (time: Date): boolean => {
  const currentDate = new Date();
  const selectedDate = new Date(time);

  return currentDate.getTime() < selectedDate.getTime();
};

export { minDate, minTime, maxTime, filterPassedTime };
