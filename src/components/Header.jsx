import { GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
  return (
    <header className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-6">
        <GraduationCap className="w-12 h-12 text-blue-400" />
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">
          {title}
        </h1>
      </div>
      <p className="text-lg text-gray-300">{subtitle}</p>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;