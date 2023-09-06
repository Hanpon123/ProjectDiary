import './Home.css';
import Projectdiary from './img/logo.png'; 
import organzie from './img/organize.png';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import database from './firebaseConfig';


function Home() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const user = database.currentUser;

  const handleLogin = async () => {

    try {
      await signInWithEmailAndPassword(database, email, password); 
      const user = database.currentUser;
      if(!user.emailVerified) throw 'อีเมลล์ของคุณยังไม่ได้รับการยืนยัน'
      navigate("/Upload");
    } catch (error) {
      alert(error);
      if(error==''){
        alert("รหัสผ่านของคุณไม่ถูกต้อง");
      }
      setError(error.message);
    }

  }

  const guest = async () => {
    // navigate("App");
    navigate("Choose");
  }

  const register = async () => {
    navigate("Register");
  }

  const forgot = async () => {
    navigate("Forgot");
  }

  return ( 
    <home> 
        <div className='table'>
            <div className='colorBar'></div>
            <div className='main'>
                <Link to = '/App' className='dev'>ข่าวสารจากผู้พัฒนา</Link>
                <img className='logo' src={Projectdiary}></img>
                <img className='organize' src={organzie}></img>
            </div>
            <div className='content'>
              <div className='Login'>
                <a className='loginText'>Login</a>
                <div className='loginFrame'>
                  <div>
                    <input className='email' onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Email'></input>
                    <div><input className='password' onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password'></input></div>
                    <button className='handleLogin' onClick={handleLogin} type='submit'>Login</button>
                    <button className='guest' onClick={forgot} type='submit'>ลืมรหัสผ่าน</button>
                    <div>
                      <button className='guest' onClick={register} type='submit'>Register</button>
                      <button className='guest' onClick={guest} type='submit'>เข้าชมเว็บไซต์</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='news'><a className='newsText'>ข่าวสารต่างๆ</a></div>
            </div> 
        </div>
    </home> 
  ); 
} 

export default Home;
