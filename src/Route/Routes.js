import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Enroll from '../Component/Enroll/Enroll';
import Timetable from '../Component/Timetable/Timetable';
import Profile from '../Component/Profile/Profile';

function Routes(){
    return(
        <Switch>
            <Router path="/enroll">
                <Enroll />
            </Router>
            <Router path="/timetable">
                <Timetable />
            </Router>
            <Router path="/profile">
                <Profile />
            </Router>
        </Switch>
    );
}

export default Routes;