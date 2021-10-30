import './Register.css'
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firestore from '../../Database/firebase';
import { auth } from '../../Database/firebase';
import emailjs from 'emailjs-com';

function Register(){
    const Users = firestore.collection('Users');
    const [errMes1, setErrMes1] = useState(null);
    const [errMes2, setErrMes2] = useState(null);
    const [errMes3, setErrMes3] = useState(null);
    const [errMes4, setErrMes4] = useState(null);
    const [errMes5, setErrMes5] = useState(null);
    const [errMes6, setErrMes6] = useState(null);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ChPassword, setChPassword] = useState('');

    const validate = () =>{
        const re = {
            'capital' : /[A-Z]/,
            'digit'   : /[0-9]/,
            'count'   : /[a-zA-z0-9]{6,}/
        }

        const validEmail = new RegExp('^[a-zA-Z0-9_)]+@(hotmail|outlook)+.(com|co.th)$');

        setErrMes1(re.capital.test(password))
        setErrMes2(re.digit.test(password))
        setErrMes3(re.count.test(password))
        setErrMes6(validEmail.test(email))

        return re.capital.test(password) && re.digit.test(password) && re.count.test(password) && validEmail.test(email)
    }

    const RegisterHandle = async () =>{
        if(ChPassword != '' && password != '' && email != ''){
            if(ChPassword == password){
                if(validate()){
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
                            console.log(err.code)
                            if(err.code == "auth/email-already-in-use"){
                                setErrMes5('Email นี้ถูกใช้เเล้ว');
                            }
                        })
                        setChPassword('');
                        setPassword('');
                        setEmail('');
                }else{
                    setChPassword('');
                    setPassword('');
                }
            }else{
                setErrMes4('รหัสผ่านไม่ตรงกัน');
                setChPassword('');
                setPassword('');
            }
        }
    }

    const Clearmessage = () =>{
        setMessage('');
        setErrMes1('');
        setErrMes2('');
        setErrMes3('');
        setErrMes4('');
        setErrMes5('');
        setErrMes6('');
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
                        { errMes5 ? (
                            <div className="Error">
                                <span>{errMes5}</span>
                            </div>    
                        ) : null }
                        { errMes6 == false ? (
                            <div className="Error">
                                <span>รูปแบบ email ไม่ถูกต้อง</span>
                            </div>    
                        ) : null }
                    </div>
                    <div className="password-re">
                        <p>Password</p>
                        <input type="password" name="password" value={password} onChange={(e) =>  setPassword(e.target.value)} onClick={Clearmessage}/>
                        { errMes1 == false ? (
                            <div className="Error">
                                <span>Password ต้องมีตัวอักษรตัวใหญ่อย่างน้อย 1 ตัว</span>
                            </div>
                        ) : null }
                        { errMes2 == false ? (
                            <div className="Error">
                                <span>Password ต้องมีตัวเลขอย่างน้อย 1 ตัว</span>
                            </div>
                        ) : null }
                        { errMes3 == false ? (
                            <div className="Error">
                                <span>Password ต้องมี 6 ตัวขึ้นไป</span>
                            </div>
                        ) : null }
                        { errMes4 ? (
                            <div className="Error">
                                <span>{errMes4}</span>
                            </div>    
                        ) : null }
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
                    <div className="btn-register" onClick={RegisterHandle}>Register</div>
                    <Link className="loginlink" to="/">Back To Login</Link>
                </div>
            </div>    
        </div>
    )
}

export default Register;