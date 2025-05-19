
import { GraduationCap } from 'lucide-react';
import PropTypes from 'prop-types';

function Header({ title, subtitle }) {
  return (
    <header className="text-center py-20">
      <div className="relative">
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 -z-10" />
        <div className="flex items-center justify-center gap-4 mb-8">
          <GraduationCap className="w-14 h-14 text-teal-400" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default Header;
