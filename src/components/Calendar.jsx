
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
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#1e40af',
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#475569',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e40af',
    padding: 8,
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  evenRow: {
    backgroundColor: '#f8fafc',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    color: '#1e293b',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
  },
  workingDays: {
    fontSize: 14,
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
      <Text style={styles.subHeader}>
        {semester}{getSemesterSuffix(semester)} Semester Academic Calendar
      </Text>
      
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Event</Text>
          <Text style={styles.tableHeaderCell}>Date</Text>
          <Text style={styles.tableHeaderCell}>Type</Text>
        </View>
        
        {events.map((event, index) => (
          <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={styles.tableCell}>{event.title}</Text>
            <Text style={styles.tableCell}>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.tableCell}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.workingDays}>
          Total Working Days: {workingDays}
        </Text>
      </View>
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
