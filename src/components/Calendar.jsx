import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 1,
  },
  tableCellLarge: {
    padding: 8,
    fontSize: 10,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 2,
  },
  workingDays: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'left',
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

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Sl. No.</Text>
          <Text style={styles.tableCellLarge}>Event</Text>
          <Text style={styles.tableCell}>Day</Text>
          <Text style={styles.tableCell}>Date</Text>
        </View>

        {events.map((event, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCellLarge}>{event.title}</Text>
            <Text style={styles.tableCell}>
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            <Text style={styles.tableCell}>
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
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
        <h2 className="text-2xl font-semibold text-gray-900">Calendar Preview</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Calculator className="w-5 h-5" />
          <span>Total Working Days: {workingDays}</span>
        </div>

        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl transition-colors ${
                event.type === 'holiday'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : event.type === 'cia'
                  ? 'bg-purple-50 border-l-4 border-purple-500'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {event.type === 'holiday' ? (
                  <Flag className="w-5 h-5 text-red-600" />
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
          ))}
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
```

```
import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 1,
  },
  tableCellLarge: {
    padding: 8,
    fontSize: 10,
    textAlign: 'left',
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 2,
  },
  workingDays: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'left',
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

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableCell}>Sl. No.</Text>
          <Text style={styles.tableCellLarge}>Event</Text>
          <Text style={styles.tableCell}>Day</Text>
          <Text style={styles.tableCell}>Date</Text>
        </View>

        {events.map((event, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            <Text style={styles.tableCellLarge}>{event.title}</Text>
            <Text style={styles.tableCell}>
              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
            </Text>
            <Text style={styles.tableCell}>
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
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
        <h2 className="text-2xl font-semibold text-gray-900">Calendar Preview</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Calculator className="w-5 h-5" />
          <span>Total Working Days: {workingDays}</span>
        </div>

        <div className="space-y-4">
          {events.length === 0 ? (
          <div className="text-center text-gray-300 py-12">
            <CalendarIcon className="w-16 h-16 mx-auto mb-6 opacity-50 text-gray-400" />
            <p className="text-lg">No events generated yet. Please input dates and generate the calendar.</p>
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl transition-colors ${
                event.type === 'holiday'
                  ? 'bg-red-50 border-l-4 border-red-500'
                  : event.type === 'cia'
                  ? 'bg-purple-50 border-l-4 border-purple-500'
                  : 'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <div className="flex items-center gap-3">
                {event.type === 'holiday' ? (
                  <Flag className="w-5 h-5 text-red-600" />
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
```The text color of the Calendar component's empty state has been updated to improve visibility.