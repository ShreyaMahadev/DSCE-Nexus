import { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Calendar from './components/Calendar';
import { nationalHolidays } from './data/holidays';

function App() {
  const [semester, setSemester] = useState('1');
  const [semesterStart, setSemesterStart] = useState('');
  const [semesterEnd, setSemesterEnd] = useState('');
  const [cia1Date, setCia1Date] = useState('');
  const [cia2Date, setCia2Date] = useState('');
  const [cia3Date, setCia3Date] = useState('');
  const [events, setEvents] = useState([]);
  const [workingDays, setWorkingDays] = useState(0);

  const calculateWorkingDays = (start, end, holidays) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let days = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const isHoliday = holidays.some(holiday => 
          new Date(holiday.date).toDateString() === currentDate.toDateString()
        );
        if (!isHoliday) {
          days++;
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  };

  const generateCalendar = () => {
    if (!semesterStart || !semesterEnd) return;

    const startDate = new Date(semesterStart);
    const endDate = new Date(semesterEnd);

    // Collect all events except semester end
    const allEvents = [
      { title: `${semester}${getSemesterSuffix(semester)} Semester Start`, date: semesterStart, type: 'regular' },
      { title: 'CIA 1', date: cia1Date, type: 'cia' },
      { title: 'CIA 2', date: cia2Date, type: 'cia' },
      { title: 'CIA 3', date: cia3Date, type: 'cia' },
      ...nationalHolidays
        .filter(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate >= startDate && holidayDate <= endDate;
        })
        .map(holiday => ({
          title: holiday.title,
          date: holiday.date,
          type: 'holiday'
        }))
    ].filter(event => event.date); // Filter out events with no dates

    // Sort events by date
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Add semester end as the last event
    const newEvents = [
      ...allEvents,
      { title: `${semester}${getSemesterSuffix(semester)} Semester End`, date: semesterEnd, type: 'regular' }
    ];

    setEvents(newEvents);
    setWorkingDays(calculateWorkingDays(semesterStart, semesterEnd, newEvents.filter(e => e.type === 'holiday')));
  };

  const getSemesterSuffix = (sem) => {
    const suffixes = {
      '1': 'st', '2': 'nd', '3': 'rd', '4': 'th',
      '5': 'th', '6': 'th', '7': 'th', '8': 'th'
    };
    return suffixes[sem] || 'th';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <Header 
          title="DSCE Calendar Generator" 
          subtitle="Create your personalized semester calendar with all important dates" 
        />

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <InputForm
            semester={semester}
            setSemester={setSemester}
            semesterStart={semesterStart}
            setSemesterStart={setSemesterStart}
            semesterEnd={semesterEnd}
            setSemesterEnd={setSemesterEnd}
            cia1Date={cia1Date}
            setCia1Date={setCia1Date}
            cia2Date={cia2Date}
            setCia2Date={setCia2Date}
            cia3Date={cia3Date}
            setCia3Date={setCia3Date}
            generateCalendar={generateCalendar}
            getSemesterSuffix={getSemesterSuffix}
          />

          <Calendar
            events={events}
            semester={semester}
            getSemesterSuffix={getSemesterSuffix}
            workingDays={workingDays}
          />
        </div>
      </div>
    </div>
  );
}

export default App;