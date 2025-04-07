import { Calendar as CalendarIcon, Calculator, Flag } from 'lucide-react';
import PropTypes from 'prop-types';

function Calendar({ events, semester, getSemesterSuffix, workingDays }) {
  return (
    <div className="bg-navy-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-900/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
          <CalendarIcon className="w-7 h-7 text-blue-400" />
          {semester}{getSemesterSuffix(semester)} Semester Calendar
        </h2>
        {workingDays > 0 && (
          <div className="flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-blue-200 font-medium">{workingDays} Working Days</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              event.type === 'cia'
                ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-l-4 border-blue-500 shadow-sm'
                : event.type === 'holiday'
                ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-l-4 border-indigo-500 shadow-sm'
                : 'bg-gradient-to-r from-navy-900/30 to-blue-900/30 border-l-4 border-navy-500 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2">
              {event.type === 'holiday' && <Flag className="w-5 h-5 text-indigo-400" />}
              <h3 className="font-medium text-lg text-white">{event.title}</h3>
            </div>
            <p className="text-sm text-gray-300 mt-2">
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
          <div className="text-center text-gray-400 py-12">
            <CalendarIcon className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">No events generated yet. Please input dates and generate the calendar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['cia', 'lab', 'regular', 'holiday']).isRequired
  })).isRequired,
  semester: PropTypes.string.isRequired,
  getSemesterSuffix: PropTypes.func.isRequired,
  workingDays: PropTypes.number.isRequired
};

export default Calendar;