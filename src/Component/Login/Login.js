import { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../img/icon.png'
import './Login.css'

function Login({LoginGoogle, LoginHandler}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <>
        <div className="container-login">
            <div className="Login">
                <div className="text-login">
                    <h1>Lo<span>gi</span>n</h1>
                </div>
                <div className="email">
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password">
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="buttonElem">
                    <div className="btn-login" onClick={LoginHandler}>Login</div>
                    <Link className="registerlink" to="/register">Register</Link>
                <div className="btn-google" onClick={LoginGoogle} >
                    <img src={icon} />
                    <p>LoginWithGoogle</p>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;