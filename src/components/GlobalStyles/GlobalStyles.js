import './GlobalStyles.scss';
import './grid.css';
import PropTypes from 'prop-types';

function GlobalStyles({ children }) {
  return children;
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
