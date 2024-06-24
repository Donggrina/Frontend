import React from 'react';
import styles from './family-schedule-list.module.scss';
import { DailyTodo } from '@/api/calendar/request.type';
import CalendarTodo from '@/components/calendar-monthly/calendar-todo';
import { motion } from 'framer-motion';
import { horizontalVariants } from '@/components/framer';
interface FamilyScheduleListProps {
  data: DailyTodo[];
}

export default function FamilyScheduleList(props: FamilyScheduleListProps) {
  return (
    <ul className={styles['schedule-list']}>
      {props.data.map((todo, index) => (
        <motion.li key={todo.id} variants={horizontalVariants} custom={index} initial="hidden" animate="visible">
          <CalendarTodo todo={todo} />
        </motion.li>
      ))}
    </ul>
  );
}
