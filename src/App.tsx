import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, GraduationCap, School, Flag, Calculator } from 'lucide-react';
import { nationalHolidays } from './data/holidays';

interface Event {
  title: string;
  date: string;
  type: 'cia' | 'lab' | 'regular' | 'holiday';
}

function App() {
  const [semester, setSemester] = useState('1');
  const [semesterStart, setSemesterStart] = useState('');
  const [semesterEnd, setSemesterEnd] = useState('');
  const [cia1Date, setCia1Date] = useState('');
  const [cia2Date, setCia2Date] = useState('');
  const [cia3Date, setCia3Date] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [workingDays, setWorkingDays] = useState(0);

  const calculateWorkingDays = (start: string, end: string, holidays: Event[]) => {
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

    const relevantHolidays = nationalHolidays
      .filter(holiday => {
        const holidayDate = new Date(holiday.date);
        return holidayDate >= startDate && holidayDate <= endDate;
      })
      .map(holiday => ({
        title: holiday.title,
        date: holiday.date,
        type: 'holiday' as const
      }));

    const allEvents = [
      { title: `${semester}${getSemesterSuffix(semester)} Semester Start`, date: semesterStart, type: 'regular' as const },
      { title: 'CIA 1', date: cia1Date, type: 'cia' as const },
      { title: 'CIA 2', date: cia2Date, type: 'cia' as const },
      { title: 'CIA 3', date: cia3Date, type: 'cia' as const },
      ...relevantHolidays,
      { title: `${semester}${getSemesterSuffix(semester)} Semester End`, date: semesterEnd, type: 'regular' as const }
    ].filter(event => event.date);

    allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setEvents(allEvents);
    setWorkingDays(calculateWorkingDays(semesterStart, semesterEnd, relevantHolidays));
  };

  const getSemesterSuffix = (sem: string) => {
    const suffixes: { [key: string]: string } = {
      '1': 'st', '2': 'nd', '3': 'rd', '4': 'th',
      '5': 'th', '6': 'th', '7': 'th', '8': 'th'
    };
    return suffixes[sem] || 'th';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GraduationCap className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              DSCE Calendar Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600">Create your personalized semester calendar with all important dates</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <School className="w-7 h-7 text-indigo-600" />
              Academic Details
            </h2>
            
            <div className="space-y-6">
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}{getSemesterSuffix(sem.toString())} Semester
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester Start Date
                </label>
                <input
                  type="date"
                  value={semesterStart}
                  onChange={(e) => setSemesterStart(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester End Date
                </label>
                <input
                  type="date"
                  value={semesterEnd}
                  onChange={(e) => setSemesterEnd(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-800 flex items-center gap-2 pt-4">
                  <Clock className="w-6 h-6 text-indigo-600" />
                  CIA Examination Dates
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CIA 1</label>
                  <input
                    type="date"
                    value={cia1Date}
                    onChange={(e) => setCia1Date(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CIA 2</label>
                  <input
                    type="date"
                    value={cia2Date}
                    onChange={(e) => setCia2Date(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CIA 3</label>
                  <input
                    type="date"
                    value={cia3Date}
                    onChange={(e) => setCia3Date(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 bg-white/50 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                </div>
              </div>

              <button
                onClick={generateCalendar}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition duration-300 flex items-center justify-center gap-3 mt-8 shadow-lg"
              >
                <BookOpen className="w-6 h-6" />
                Generate Calendar
              </button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <Calendar className="w-7 h-7 text-indigo-600" />
                {semester}{getSemesterSuffix(semester)} Semester Calendar
              </h2>
              {workingDays > 0 && (
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">{workingDays} Working Days</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    event.type === 'cia'
                      ? 'bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 shadow-sm'
                      : event.type === 'holiday'
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 shadow-sm'
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {event.type === 'holiday' && <Flag className="w-5 h-5 text-amber-600" />}
                    <h3 className="font-medium text-lg text-gray-800">{event.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <Calendar className="w-16 h-16 mx-auto mb-6 opacity-50" />
                  <p className="text-lg">No events generated yet. Please input dates and generate the calendar.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;