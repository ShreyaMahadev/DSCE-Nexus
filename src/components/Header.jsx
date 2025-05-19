import { GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
  return (
    <header className="text-center mb-24">
      <div className="flex items-center justify-center gap-4 mb-8">
        <GraduationCap className="w-14 h-14 text-blue-600" />
        <h1 className="text-6xl font-medium text-gray-900">
          {title}
        </h1>
      </div>
      <p className="text-xl text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;