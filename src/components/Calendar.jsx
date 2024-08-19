import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

const Calendar = () => {

    return (
        <div className='flex items-center min-h-screen'>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker orientation="landscape" />
                </LocalizationProvider>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Calendar;