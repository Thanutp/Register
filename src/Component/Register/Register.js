import './Register.css'
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import firestore from '../../Database/firebase';
import { auth } from '../../Database/firebase';
import emailjs from 'emailjs-com';

function Register(){
    const Users = firestore.collection('Users');
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ChPassword, setChPassword] = useState('');

    const RegisterHandle = async () =>{
        if(ChPassword == password){
            auth
            .createUserWithEmailAndPassword(email, password).then( async(res) =>{
                if(res){
                    setMessage('สมัครสำเร็จ!!')
                    await Users.doc(res.user.uid).get().then((data) =>{
                        if(!data.exists){
                            Users.doc(res.user.uid).set({
                                Id : res.user.uid,
                                Name : res.user.email.substring(0, email.lastIndexOf("@")),
                                Photo : res.user.photoURL ? res.user.photoURL : require('../../img/Noimg.jpg'),
                                email : res.user.email
                            }).then(() =>{
                                emailjs.send('service_72488e6','template_hsbetfq',{
                                    user_email: email
                                },'user_ouv59cb6iCxEjtbRBnJ5U')
                                .catch((e) => console.log(e))
                            })
                        }
                    })
                }
            }).catch((err) =>{
                console.log(err.message)
            })
            setChPassword('');
            setPassword('');
            setEmail('');
        }else{
            setErrMessage('รหัสผ่านไม่ตรงกัน')
            setPassword('');
            setChPassword('');
        }
    }

    const Clearmessage = () =>{
        setErrMessage('');
        setMessage('');
    }
    
    return(
        <div className="container-register">
            <div className="Register">
                <div className="text-register">
                    <h1>Re<span>gis</span>ter</h1>
                </div>
                <div className="input-register">
                    <div className="email-re">
                        <p>Email</p>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onClick={Clearmessage}/>
                    </div>
                    <div className="password-re">
                        <p>Password</p>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onClick={Clearmessage}/>
                    </div>
                    <div className="ch-password-re">
                        <p>Confirm Pass</p>
                        <input type="password" name="ChPassword" value={ChPassword} onChange={(e) => setChPassword(e.target.value)} onClick={Clearmessage}/>
                    </div>
                </div>
                <div className="buttonElem-re">
                    { message ? (
                        <>
                        <div className="Success"><span>{message}</span></div>
                        </>
                    ) : null }
                    { errMessage ? (
                        <>
                        <div className="Error"><span>{errMessage}</span></div>
                        </>
                    ) : null }
                    <div className="btn-register" onClick={RegisterHandle}>Register</div>
                    <Link className="loginlink" to="/">Back To Login</Link>
                </div>
            </div>    
        </div>
    )
}

export default Register;