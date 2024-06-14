import styles from './calendar-modal.module.scss';
import { BaseSyntheticEvent, useState } from 'react';
import CalendarModalTimeSelector from './calendar-modal-time-selector';
import CalendarModalCalendar from './calendar-modal-calendar';
import { DateTime } from '@/pages/calendar/create';
import Calendar from '../calendar-compound/calendar';
import CalendarInstance from '@/utils/date/date.utils';
import useSelect from '@/hooks/use-select';

interface CalendarModalProps {
  updateDateTime: (newDateTime: DateTime) => void;
  onClose: () => void;
}

export interface ModalDateTime {
  year: number;
  month: number;
  date: number;
  ampm: '오전' | '오후';
  hour: number;
  minute: number;
}

export default function CalendarModal({ updateDateTime, onClose }: CalendarModalProps) {
  const { selectedItem: selectedYear, handleSelectedItem: onSelectedYear } = useSelect<number>(
    CalendarInstance.currentYear,
  );
  const { selectedItem: selectedMonth, handleSelectedItem: onSelectedMonth } = useSelect<number>(
    CalendarInstance.currentMonth,
  );
  const { selectedItem: selectedDate, handleSelectedItem: onSelectedDate } = useSelect<number>(
    CalendarInstance.currentDate,
  );

  const onResetToday = () => {
    onSelectedYear(CalendarInstance.currentYear);
    onSelectedMonth(CalendarInstance.currentMonth);
    onSelectedDate(CalendarInstance.currentDate);
  };

  const [modalDateTime, setModalDateTime] = useState<ModalDateTime>({
    year: CalendarInstance.currentYear,
    month: CalendarInstance.currentMonth,
    date: CalendarInstance.currentDate,
    ampm: '오전',
    hour: 12,
    minute: 0,
  });

  const handleSelect = (type: string, e: BaseSyntheticEvent | IntersectionObserverEntry) => {
    setModalDateTime((prevModalDateTime) => ({
      ...prevModalDateTime,
      [type]: e.target.innerText,
    }));
  };

  const handleDateTimeSave = () => {
    updateDateTime(modalDateTime);
    onClose();
  };

  return (
    <div className={styles.outer}>
      <Calendar
        value={{
          year: selectedYear,
          month: selectedMonth,
          date: selectedDate,
          onSelectedMonth,
          onSelectedDate,
          onSelectedYear,
          onResetToday,
        }}
      >
        <Calendar.Year />
        <Calendar.Month />
        <CalendarModalCalendar dateTime={modalDateTime} onSelect={handleSelect} />
        <CalendarModalTimeSelector dateTime={modalDateTime} onSelect={handleSelect} />
        <button onClick={handleDateTimeSave} className={styles.save} type="button">
          저장하기
        </button>
      </Calendar>
    </div>
  );
}
