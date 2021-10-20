import './Register.css'
import { auth } from '../../Database/firebase';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ChPassword, setChPassword] = useState('')

    const RegisterHandle = () =>{
        auth
            .createUserWithEmailAndPassword(email, password)
    }

    return(
        <div className="container-register">
            <div className="Register">
                <div className="text-register">
                    <h1>Re<span>gis</span>ter</h1>
                </div>
                <div className="email-re">
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="password-re">
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="ch-password-re">
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={(e) => setChPassword(e.target.value)}/>
                </div>
                <div className="buttonElem-re">
                    <div className="btn-register" onClick={RegisterHandle}>Register</div>
                    <Link className="loginlink" to="/">Back To Login</Link>
                </div>
            </div>    
        </div>
    )
}

export default Register;