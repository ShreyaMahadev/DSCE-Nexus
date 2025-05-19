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
  subHeader: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center',
    color: '#3b82f6',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 30,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f8fafc',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#1e40af',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: 1,
    borderColor: '#3b82f6',
    paddingBottom: 5,
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
    fontStyle: 'italic',
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
      <Text style={styles.header}>DAYANANDA SAGAR COLLEGE OF ENGINEERING</Text>
      <Text style={styles.subHeader}>
        Department of Computer Science and Engineering{'\n'}
        Calendar of Events for {semester}{getSemesterSuffix(semester)} Semester
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events</Text>
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
    <div className="card p-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <CalendarIcon className="w-7 h-7 text-blue-400" />
        <h2 className="text-2xl font-semibold text-gray-100">Calendar Preview</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-300">
          <Calculator className="w-5 h-5" />
          <span>Total Working Days: {workingDays}</span>
        </div>

        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center text-gray-300 py-12">
              <CalendarIcon className="w-16 h-16 mx-auto mb-6 opacity-50" />
              <p className="text-lg">No events generated yet. Please input dates and generate the calendar.</p>
            </div>
          ) : (
            events.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                  event.type === 'cia'
                    ? 'bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 shadow-sm'
                    : event.type === 'holiday'
                    ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500 shadow-sm'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2">
                  {event.type === 'holiday' ? (
                    <Flag className="w-5 h-5 text-amber-600" />
                  ) : event.type === 'cia' ? (
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                  ) : (
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  )}
                  <h3 className={`font-medium ${
                    event.type === 'holiday' 
                      ? 'text-red-900' 
                      : event.type === 'cia'
                      ? 'text-purple-900'
                      : 'text-blue-900'
                  }`}>{event.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
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
                <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  {loading ? 'Preparing PDF...' : 'Download Calendar PDF'}
                </button>
              )}
            </PDFDownloadLink>
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
    type: PropTypes.oneOf(['cia', 'regular', 'holiday']).isRequired
  })).isRequired,
  semester: PropTypes.string.isRequired,
  getSemesterSuffix: PropTypes.func.isRequired,
  workingDays: PropTypes.number.isRequired
};

export default Calendar;