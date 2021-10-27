import './Register.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import firestore from '../../Database/firebase';
import { auth } from '../../Database/firebase';

function Register(){
    const Users = firestore.collection('Users');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ChPassword, setChPassword] = useState('');

    const RegisterHandle = () =>{
        if(ChPassword == password){
            auth
            .createUserWithEmailAndPassword(email, password).then( async(res) =>{
                if(res){
                    setMessage('Success!!')
                    Users.doc(res.user.uid).get().then((data) =>{
                        if(!data.exists){
                            Users.doc(res.user.uid).set({
                                Id : res.user.uid,
                                Name : res.user.email.substring(0, email.lastIndexOf("@")),
                                Photo : res.user.photoURL ? res.user.photoURL : require('../../img/Noimg.jpg'),
                                email : res.user.email
                            })
                        }
                    })
                }
            }).catch((err) =>{
                console.log(err)
            })
            setChPassword('');
            setPassword('');
            setEmail('');
        }else{
            alert('รหัสผ่านไม่ตรงกัน')
            setPassword('');
            setChPassword('');
        }
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
                    <p>Confirm Pass</p>
                    <input type="password" name="ChPassword" value={ChPassword} onChange={(e) => setChPassword(e.target.value)}/>
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