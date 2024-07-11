import dayjs from "dayjs";
import utc from "dayjs";
import timezone from "dayjs";

dayjs.extend(utc);
dayjs.extend(timezone);

const minDate = dayjs().toDate();
const minTime = dayjs().hour(7).minute(0).toDate();
const maxTime = dayjs().hour(17).minute(0).toDate();

const filterPassedTime = (time: Date) => {
  const currentTime = dayjs(time);
  const startTime = dayjs().hour(7).minute(0);
  const endTime = dayjs().hour(17).minute(0);
  return currentTime.isAfter(startTime) && currentTime.isBefore(endTime);
};

export { minDate, minTime, maxTime, filterPassedTime };
