import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, userEffect, useEffect } from 'react';
import { auth } from '../../Database/firebase';

function Navbar({Logout}){
    const location = useLocation();
    const [user, setUser] = useState('');
    const [logout, setLogout] = useState(false);
    console.log(logout)

    useEffect(() =>{
        auth.onAuthStateChanged((user) =>{
            setUser(user)
        })
    },[])

    return(
        <div className="container-navbar">
            <div className="navbar">
                <div className="text-navbar">
                    { location.pathname == '/profile' ? (
                        <span>ประวัติส่วนตัว</span>
                    ) : location.pathname == '/timetable' ? (
                        <span>ตารางเรียน</span>
                    ) : (
                        <span>ลงทะเบียนเรียน</span>
                    ) }
                </div>
                <div className="choose-navbar">
                    <Link to="/enroll" className="text-link">ลงทะเบียนเรียน</Link>
                    <Link to="/timetable" className="text-link">ตารางเรียน</Link>
                    <Link to="/profile" className="text-link">ประวัติส่วนตัว</Link>
                </div>
                <div className="user-navbar" onMouseOver={() => setLogout(true)} onMouseLeave={() => setLogout(false)}>
                    <div className="name-user"><span>{ user ? user.displayName : null }</span></div>
                    <div className="img-user" style={ user ? { backgroundImage : `url(${user.photoURL})` } : null }></div>
                    <div className={ logout == true ? 'Logout active' : 'Logout' }>
                        <div className="logout" onClick={() => Logout()}>
                            <div className="logout-box"><span>Logout</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;