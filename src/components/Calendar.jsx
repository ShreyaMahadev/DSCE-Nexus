import { Calendar as CalendarIcon, Calculator, Flag, Download } from 'lucide-react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  headerImage: {
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
    textTransform: 'uppercase',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 30,
    backgroundColor: '#fff',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 30,
    backgroundColor: '#f0f0f0',
  },
  weekNoCell: {
    width: '8%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
  },
  monthCell: {
    width: '12%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
  },
  daysCell: {
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
    flexDirection: 'row',
  },
  dayColumn: {
    width: '16.66%',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 2,
  },
  workingDaysCell: {
    width: '10%',
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 5,
    textAlign: 'center',
  },
  remarksCell: {
    width: '20%',
    padding: 5,
  },
  cellText: {
    fontSize: 8,
    color: '#000000',
  },
  headerText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
  },
  holidayText: {
    fontSize: 8,
    color: '#ff0000',
  }
});

const CalendarPDF = ({ events, semester, workingDays }) => {
  // Group events by week
  const weeks = [];
  let currentDate = new Date(events[0]?.date);
  const endDate = new Date(events[events.length - 1]?.date);

  while (currentDate <= endDate) {
    const weekStart = new Date(currentDate);
    const weekEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= weekStart && 
             eventDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    });

    if (weekEvents.length > 0) {
      weeks.push({
        weekNo: weeks.length + 1,
        month: weekStart.toLocaleString('default', { month: 'short' }).toUpperCase(),
        events: weekEvents,
        workingDays: 5 // Simplified - you might want to calculate this properly
      });
    }

    currentDate.setDate(currentDate.getDate() + 7);
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            DAYANANDA SAGAR COLLEGE OF ENGINEERING{'\n'}
            {semester} SEMESTER CALENDAR OF EVENTS 2024-25
          </Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeaderRow}>
            <View style={styles.weekNoCell}>
              <Text style={styles.headerText}>WEEK NO.</Text>
            </View>
            <View style={styles.monthCell}>
              <Text style={styles.headerText}>MONTH</Text>
            </View>
            <View style={styles.daysCell}>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>MON</Text>
              </View>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>TUE</Text>
              </View>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>WED</Text>
              </View>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>THU</Text>
              </View>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>FRI</Text>
              </View>
              <View style={styles.dayColumn}>
                <Text style={styles.headerText}>SAT</Text>
              </View>
            </View>
            <View style={styles.workingDaysCell}>
              <Text style={styles.headerText}>WORKING DAYS</Text>
            </View>
            <View style={styles.remarksCell}>
              <Text style={styles.headerText}>REMARKS</Text>
            </View>
          </View>

          {/* Table Body */}
          {weeks.map((week, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.weekNoCell}>
                <Text style={styles.cellText}>{week.weekNo}</Text>
              </View>
              <View style={styles.monthCell}>
                <Text style={styles.cellText}>{week.month}</Text>
              </View>
              <View style={styles.daysCell}>
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, dayIndex) => (
                  <View key={dayIndex} style={styles.dayColumn}>
                    <Text style={styles.cellText}>
                      {week.events.find(e => new Date(e.date).getDay() === dayIndex + 1)?.date.split('-')[2] || ''}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.workingDaysCell}>
                <Text style={styles.cellText}>{week.workingDays}</Text>
              </View>
              <View style={styles.remarksCell}>
                <Text style={styles.cellText}>
                  {week.events
                    .filter(e => e.type === 'holiday' || e.type === 'cia')
                    .map(e => e.title)
                    .join(', ')}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.cellText, { marginTop: 10 }]}>
          Total Working Days: {workingDays}
        </Text>
      </Page>
    </Document>
  );
};

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