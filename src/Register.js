import './Register.css'; 
import Projectdiary from './img/logo.png'; 
import organzie from './img/organize.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
// import { faBars } from '@fortawesome/free-solid-svg-icons' 
import { Link , useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword , createUserWithEmailAndPassword , sendEmailVerification, signOut } from "firebase/auth";
import { useState } from 'react';
import database from './firebaseConfig';

function Register() 
{ 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    const handleRegister = async () => {

        // const use = false;
        // user.providerData.forEach((profile) => {
        //     if(email==profile.email){
        //         use=true;
        //     }
        // });

        try{

            
            // if(use) throw "อีเมลล์นี้เคยถูกลงทะเบียนแล้ว โปรดเปลี่ยนอีเมลล์ใหม่"
            if(!email) throw "คุณจำเป็นต้องใส่อีเมลล์ที่ถูกต้อง"
            if(password!=rePassword) throw "รหัสผ่านจำเป็นต้องตรงกันทั้งสองช่อง"
            if(password.length<6) throw "รหัสผ่านจำเป็นต้องมีความยาว 6 อักษรขึ้นไป"
            await createUserWithEmailAndPassword(database, email, password);
            await signInWithEmailAndPassword(database, email, password);
            sendEmailVerification(database.currentUser);
            alert("ลงทะเบียนสำเร็จ โปรดยืยยันอีเมลล์ที่ส่งไปในอีเมลล์ของคุณ");
            navigate("/");
        }
        catch(err){
            alert(err);
            navigate("/");
        }

    }


    return ( 
        <header className='register'>
            <div className='divres'>
                <div className='colorBar'></div>
                <div className='main'>
                    <Link to = '/App' className='dev'>ข่าวสารจากผู้พัฒนา</Link>
                    <img className='logo' src={Projectdiary}></img>
                    <img className='organize' src={organzie}></img>
                </div>

                <div className='register'>
                    <center><p className='registerText'>Register</p></center>
                    <center><div className='registerFrame'>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' className='email'></input>
                        <div><input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='password'></input></div>
                        <input type='password' onChange={(e) => setRePassword(e.target.value)} value={rePassword} placeholder='Re-Password' className='rePassword'></input>
                        <div><button onClick={handleRegister} type='submit' className='submit'>Register</button></div>
                    </div></center>
                </div>
            </div> 
        </header> 
    ); 
} 
export default Register;
