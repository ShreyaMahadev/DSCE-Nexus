import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#1e40af',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#3b82f6',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1e40af',
    fontWeight: 'bold',
  },
  eventContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  eventTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#1e293b',
  },
  eventDate: {
    fontSize: 12,
    color: '#64748b',
  },
  workingDays: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: '#1e40af',
    padding: 10,
    backgroundColor: '#f0f9ff',
    borderRadius: 4,
  }
});

const CalendarPDF = ({ events, semester, getSemesterSuffix, workingDays }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>DSCE Calendar of Events</Text>
      <Text style={styles.subHeader}>
        {semester}{getSemesterSuffix(semester)} Semester Academic Calendar
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regular Events</Text>
        {events
          .filter(event => event.type === 'regular')
          .map((event, index) => (
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CIA Examinations</Text>
        {events
          .filter(event => event.type === 'cia')
          .map((event, index) => (
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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Holidays</Text>
        {events
          .filter(event => event.type === 'holiday')
          .map((event, index) => (
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
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          <CalendarIcon className="w-7 h-7 text-indigo-600" />
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
            <CalendarIcon className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-lg">No events generated yet. Please input dates and generate the calendar.</p>
          </div>
        )}
      </div>

      {events.length > 0 && (
        <div className="mt-8 border-t pt-8">
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
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white px-6 py-4 rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-lg text-lg font-medium"
          >
            {({ loading }) => (
              <>
                <Download className="w-6 h-6" />
                {loading ? 'Preparing PDF...' : 'Download Calendar PDF'}
              </>
            )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default Calendar;