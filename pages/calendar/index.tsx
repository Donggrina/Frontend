import Calendar from '@/components/calendar-compound/calendar';
import styles from './calendar.module.scss';
import CreateTodoButton from '@/components/calendar-monthly/create-todo-button';
import CalendarTodoDate from '@/components/calendar-monthly/calendar-todo-date';
import CalendarInstance from '@/utils/date/date.utils';
import useSelect from '@/hooks/use-select';
import CalendarTodos from '@/components/calendar-monthly/calendar-todos';
import useMonthlyTodosQuery from '@/hooks/queries/calendar/use-montly-todos-query';
import useDailyTodosQuery from '@/hooks/queries/calendar/use-daily-todos-query';
import CalendarMonthly from '@/components/calendar-monthly/calendar-monthly';

export default function CalendarPage() {
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

  const yearMonth = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}`;
  const yearMonthDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;

  const monthlyTodosQuery = useMonthlyTodosQuery(yearMonth);
  const dailyTodosQuery = useDailyTodosQuery(yearMonthDate);

  if (!dailyTodosQuery.isFetchedAfterMount) return;
  if (dailyTodosQuery.isPending || monthlyTodosQuery.isPending) return <p>loading</p>;
  if (dailyTodosQuery.isError || monthlyTodosQuery.isError) return <p>Error</p>;

  return (
    <main className={styles.outer}>
      <Calendar
        value={{
          year: selectedYear,
          month: selectedMonth,
          date: selectedDate,
          onSelectedYear,
          onSelectedMonth,
          onSelectedDate,
          onResetToday,
        }}
      >
        <div className={styles.yearContainer} style={{ position: 'relative', left: '-12px' }}>
          <Calendar.Year />
          <p className={styles.resetToday} onClick={onResetToday}>
            오늘 날짜
          </p>
        </div>
        <div style={{ position: 'relative', left: '-12px' }}>
          <Calendar.Month />
        </div>
        <CalendarMonthly monthlyTodos={monthlyTodosQuery.data} />
        <CalendarTodoDate />
        <CalendarTodos dailyTodos={dailyTodosQuery.data} />
        <CreateTodoButton />
      </Calendar>
    </main>
  );
}
