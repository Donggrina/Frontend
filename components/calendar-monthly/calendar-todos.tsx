import { DailyTodo } from '@/api/calendar/request.type';
import { useCalendarContext } from '../calendar-compound/calendar';
import CalendarTodo from './calendar-todo';
import useDailyTodosQuery from '@/hooks/queries/calendar/use-daily-todos-query';
import CalendarListSkeleton from '../skeleton/calendar/calendar-list-skeleton';
import { motion } from 'framer-motion';
import { horizontalVariants } from '../framer';

interface CalendarTodosProps {
  dailyTodos: DailyTodo[];
}

export default function CalendarTodos({ dailyTodos }: CalendarTodosProps) {
  const calendarContext = useCalendarContext();
  const { year, month, date } = calendarContext;
  const yearMonthDate = [year, (month + 1).toString().padStart(2, '0'), date.toString().padStart(2, '0')].join('-');

  const { error, isError, isLoading } = useDailyTodosQuery(yearMonthDate);

  if (isLoading) return <CalendarListSkeleton />;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {dailyTodos.map((todo, index) => (
          <motion.li key={todo.id} custom={index} variants={horizontalVariants} initial="hidden" animate="visible">
            <CalendarTodo todo={todo} />
          </motion.li>
        ))}
      </ul>
    </>
  );
}
