import { School, Clock, BookOpen, Building2 } from 'lucide-react';
import { departments } from '../data/departments';
import PropTypes from 'prop-types';

function InputForm({ 
  semester,
  setSemester,
  semesterStart,
  setSemesterStart,
  semesterEnd,
  setSemesterEnd,
  cia1Date,
  setCia1Date,
  cia2Date,
  setCia2Date,
  cia3Date,
  setCia3Date,
  generateCalendar,
  getSemesterSuffix
}) {
  return (
    <div className="card p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3 text-white">
        <School className="w-7 h-7 text-blue-400" />
        Academic Details
      </h2>

      <div className="space-y-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-blue-900 bg-blue-900/20 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200/20"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}{getSemesterSuffix(sem.toString())} Semester
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Department
          </label>
          <select
            className="w-full px-4 py-3 rounded-xl border-blue-900 bg-blue-900/20 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200/20"
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Semester Start Date
          </label>
          <input
            type="date"
            value={semesterStart}
            onChange={(e) => setSemesterStart(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Semester End Date
          </label>
          <input
            type="date"
            value={semesterEnd}
            onChange={(e) => setSemesterEnd(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium text-white flex items-center gap-2 pt-4">
            <Clock className="w-6 h-6 text-blue-400" />
            CIA Examination Dates
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">CIA 1</label>
            <input
              type="date"
              value={cia1Date}
              onChange={(e) => setCia1Date(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">CIA 2</label>
            <input
              type="date"
              value={cia2Date}
              onChange={(e) => setCia2Date(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">CIA 3</label>
            <input
              type="date"
              value={cia3Date}
              onChange={(e) => setCia3Date(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        <button
          onClick={generateCalendar}
          className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl hover:from-teal-600 hover:via-emerald-600 hover:to-teal-600 transition duration-300 flex items-center justify-center gap-3 mt-8 shadow-lg"
        >
          <BookOpen className="w-6 h-6" />
          Generate Calendar
        </button>
      </div>
    </div>
  );
}

InputForm.propTypes = {
  semester: PropTypes.string.isRequired,
  setSemester: PropTypes.func.isRequired,
  semesterStart: PropTypes.string.isRequired,
  setSemesterStart: PropTypes.func.isRequired,
  semesterEnd: PropTypes.string.isRequired,
  setSemesterEnd: PropTypes.func.isRequired,
  cia1Date: PropTypes.string.isRequired,
  setCia1Date: PropTypes.func.isRequired,
  cia2Date: PropTypes.string.isRequired,
  setCia2Date: PropTypes.func.isRequired,
  cia3Date: PropTypes.string.isRequired,
  setCia3Date: PropTypes.func.isRequired,
  generateCalendar: PropTypes.func.isRequired,
  getSemesterSuffix: PropTypes.func.isRequired
};

export default InputForm;