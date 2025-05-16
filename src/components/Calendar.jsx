import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  event: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
  },
  workingDays: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

const CalendarPDF = ({ events, semester, getSemesterSuffix, workingDays }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        {semester}{getSemesterSuffix(semester)} Semester Calendar
      </Text>
      {events.map((event, index) => (
        <View key={index} style={styles.event}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      ))}
      <Text style={styles.workingDays}>
        Total Working Days: {workingDays}
      </Text>
    </Page>
  </Document>
);

CalendarPDF.propTypes = {
  events: PropTypes.array.isRequired,
  semester: PropTypes.string.isRequired,
  getSemesterSuffix: PropTypes.func.isRequired,
  workingDays: PropTypes.number.isRequired,
};

function Calendar({ events, semester, getSemesterSuffix, workingDays }) {
  return (
    <div className="bg-navy-900/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-900/50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-3 text-white">
          <CalendarIcon className="w-7 h-7 text-blue-400" />
          {semester}{getSemesterSuffix(semester)} Semester Calendar
        </h2>
        <div className="flex items-center gap-4">
          {workingDays > 0 && (
            <div className="flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-lg">
              <Calculator className="w-5 h-5 text-blue-400" />
              <span className="text-blue-200 font-medium">{workingDays} Working Days</span>
            </div>
          )}
          {events.length > 0 && (
            <PDFDownloadLink
              document={
                <CalendarPDF
                  events={events}
                  semester={semester}
                  getSemesterSuffix={getSemesterSuffix}
                  workingDays={workingDays}
                />
              }
              fileName={`semester-${semester}-calendar.pdf`}
            >
              {({ loading }) => (
                <button 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg text-white"
                  disabled={loading}
                >
                  <Download className="w-5 h-5" />
                  {loading ? 'Preparing PDF...' : 'Download PDF'}
                </button>
              )}
            </PDFDownloadLink>
          )}
        </div>
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