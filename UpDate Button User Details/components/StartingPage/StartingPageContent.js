import { Link } from 'react-router-dom';
import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {

  return (
    <div className={classes.starting}>
      <h1>Welcome to Expense Tracker</h1>
      <h2>Track YOur Expenses And MAKE Your Life Easy</h2>
      <div className={classes.actions}>
      <Link to="/profile">
      <button>complete Your Profile</button>
      </Link>
      </div>
    </div>
  );
};

export default StartingPageContent;
