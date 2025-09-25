import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

dayjs.locale('pt-br');

type Props = {
  selectedDate: null | dayjs.Dayjs;
  onDateSelect: (date: dayjs.Dayjs) => void;
  minDate?: dayjs.Dayjs | null;
};

const Calendario = ({ selectedDate, onDateSelect, minDate }: Props) => {
  /*---- TEMPO DO CALENDÁRIO ----*/
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        sx={{
          position: 'inline-block',
          width: 'fit-content',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '30px',
            height: '15px',
            backgroundColor: '#e8e8e8',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          },
        }}
      >
        <DateCalendar
          minDate={minDate || today.add(1, 'day')}
          shouldDisableDate={(date) => date.isSameOrBefore(today, 'day')}
          onChange={(newDate) => onDateSelect(newDate)}
          // value={selectedDate ? dayjs(selectedDate) : tomorrow}
          value={
            selectedDate ? dayjs(selectedDate) : minDate ? dayjs(minDate) : tomorrow
          }
          sx={{
            backgroundColor: '#e8e8e8',
            borderRadius: '8px',
            color: '#000',
            padding: '2px',
            width: '300px',
            '& .MuiPickersDay-root': {
              color: '#000',
            },
            '& .Mui-selected': {
              backgroundColor: '#ff914d !important',
            },
            '& .Mui-disabled': {
              opacity: 0.5,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default Calendario;
