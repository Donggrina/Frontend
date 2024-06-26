import { CALENDAR_DAYS_KOREAN } from '@/utils/constants/calendar-constants';

export default function getDay(year: number, month: number, date: number) {
  const dateObj = new Date(year, month - 1, date);
  const day = dateObj.getDay();
  return CALENDAR_DAYS_KOREAN[day];
}
