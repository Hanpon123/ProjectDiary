import { useState } from 'react';
import './Forgot.css'; 
import Projectdiary from './img/logo.png'; 
import organzie from './img/organize.png' 
import { useNavigate , Link } from 'react-router-dom'
import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import database from './firebaseConfig';


function Forgot() 
{ 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleReset = async () =>{
    await sendPasswordResetEmail(database, email)
    await sendEmailVerification(database,)
    alert("อีเมลล์รีเซ็ตรหัสผ่านได้ส่งไปยังที่อยู่อีเมลล์ของคุณเเล้ว คลิ๊กลิงค์ในอีเมลล์ของคุณเพื่อรีเซ็ตรหัสผ่าน")
    navigate("/");
  }


  return ( 
    <forgot>
      <div className='table'>

        <div className='colorBar'></div>
        <div className='main'>
            <Link to = '/App' className='dev'>ข่าวสารจากผู้พัฒนา</Link>
            <img className='logo' src={Projectdiary}></img>
            <img className='organize' src={organzie}></img>
        </div>
        

        <div className='forgot'>
          <center><p className='forgotText'>คุณลืมรหัสผ่านใช่ไหม?</p></center>
          <center><div className='forgotFrame'>
            <p>กรอก email ของคุณเพื่อขอรีเซ็ตรหัสผ่าน</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' className='email'></input>
            <div><button onClick={handleReset} type='submit' className='submit'>รีเซ็ตรหัสผ่าน</button></div>
          </div></center>
        </div>

      </div>
    </forgot> 
  ); 
} 
export default Forgot;
