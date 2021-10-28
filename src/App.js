import { auth, googleProvider } from './Database/firebase';
import firestore from './Database/firebase';
import { useLocation, Redirect } from 'react-router-dom';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from './img/icon.png';
import './App.css';

function App() {
  const location = useLocation();
  const [userLoginState,setUserLoginState] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const User = firestore.collection('Users');
  console.log(userLoginState)
  
  useEffect(() =>{
    if(sessionStorage.getItem('Auth')) {
      setUserLoginState(sessionStorage.getItem('Auth'))
    }
  },[])
  
  const LoginGoogle = () =>{
    auth.signInWithPopup(googleProvider)
    .then((result) =>{
      sessionStorage.setItem('Auth', true)
      setUserLoginState(sessionStorage.getItem('Auth'))
      const user = {
        Name : result.user.displayName,
        email : result.user.email,
        Photo : result.user.photoURL,
        Id : result.user.uid
      }
      console.log(user)
      User.doc(result.user.uid).set(user).then(() =>{
        console.log('Add!!')
      })
    })
  }

  const LoginHandler = () =>{
    auth  
      .signInWithEmailAndPassword(email, password)
        .then(() =>{
          sessionStorage.setItem('Auth', true)
          setUserLoginState(sessionStorage.getItem('Auth'))
          console.log('Login Success!!')
            }).catch((err) =>{
              if(email == '' && password == '' ){
                setMessage('กรุณาใส่ email เเละ password เพื่อ login');
              }else if(email != '' && password == ''){
                setMessage('กรุณาใส่ password เพื่อ login');
              }else if(email == '' && password != ''){
                setMessage('กรุณาใส่ email เพื่อ login');
              }else{
                console.log(err)
              }
            })
    }

    const Logout = () =>{
      auth.signOut().then(() =>{
        sessionStorage.removeItem('Auth')
        setUserLoginState(null)
        window.location.href = '/';  
        console.log('Logout!!')
      })
    }

    const Clearmessage = () =>{
      setMessage('');
      setEmail('');
      setPassword('');
    }

  return (
    <>
    { 
      location.pathname == '/' && !userLoginState && (
        <>
        <div className="container-login">
            <div className="Login">
                <div className="text-login">
                    <h1>Lo<span>gi</span>n</h1>
                </div>
                <div className="email">
                    <p>Email</p>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onClick={() => setMessage('')}/>
                </div>
                <div className="password">
                    <p>Password</p>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} onClick={() => setMessage('')}/>
                </div>
                { message ? (
                      <>
                      <div className="error"><span>{message}</span></div>
                      </>
                ) : null }
                <div className="buttonElem">
                    <div className="btn-login" onClick={LoginHandler}>Login</div>
                    <Link className="registerlink" to="/register" onClick={Clearmessage} >Register</Link>
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

    { 
      location.pathname == '/register' && !userLoginState && (
        <Register />
      )
    }

    { 
      userLoginState && (
        <Home Logout={Logout} LoginState={userLoginState}/>
      )
    }
    </>
  )
}

export default App;
