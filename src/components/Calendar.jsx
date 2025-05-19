
import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e40af',
    textTransform: 'uppercase',
    borderBottom: 2,
    borderColor: '#3b82f6',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 30,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f8fafc',
  },
  eventContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderLeft: 3,
    borderColor: '#3b82f6',
  },
  eventTitle: {
    fontSize: 14,
    marginBottom: 4,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 12,
    color: '#64748b',
  },
  workingDays: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
    color: '#1e40af',
    padding: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    fontWeight: 'bold',
  }
});

const CalendarPDF = ({ events, semester, getSemesterSuffix, workingDays }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>DSCE Calendar of Events</Text>
      <View style={styles.section}>
        {events.map((event, index) => (
          <View key={index} style={styles.eventContainer}>
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
      </View>
      <Text style={styles.workingDays}>
        Total Working Days: {workingDays}
      </Text>
    </Page>
  </Document>
);

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

      {events.length > 0 && (
        <div className="mt-8">
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
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {loading ? 'Preparing PDF...' : 'Download Calendar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-8">
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
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                {loading ? 'Preparing PDF...' : 'Download Calendar PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      )}
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
