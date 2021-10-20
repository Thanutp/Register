import Login from './Component/Login/Login';
import { auth, googleProvider } from './Database/firebase';
import firestore from './Database/firebase';
import { useLocation, Redirect } from 'react-router-dom';
import Register from './Component/Register/Register';
import Home from './Component/Home/Home';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [userLoginState,setUserLoginState] = useState(null);
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
      sessionStorage.setItem('Auth', result.user.uid)
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

  const LoginHandler = (email, password) =>{
    auth  
      .signInWidthEmailAndPassword(email, password)
        .then(() =>{
          console.log('Login Success!!')
            }).catch((err) =>{
              console.log(err)
            })
    }

    const Logout = () =>{
      auth.signOut().then(() =>{
        sessionStorage.removeItem('Auth')
        setUserLoginState(null)
        console.log('Logout!!')
      })
    }

  return (
    <>
    { 
      location.pathname == '/' && !userLoginState && (
        <Login LoginGoogle={LoginGoogle} LoginHandler={LoginHandler} />
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
