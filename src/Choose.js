import Projectdiary from './img/Projectdiary.png';
import './choose.css';
//import { useState } from 'react';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import database from './firebaseConfig';

  
function Choose() {
  //const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = database.currentUser;

  const goHome = () => {
    navigate('/');
  }

  const goMiddle = () =>{
    navigate("/Middle");
  }

  const goHigh = () =>{
    navigate("/High");
  }

  const goUni = () =>{
    navigate("/Uni");
  }

  const goUpload = () =>{
    navigate("/Upload");
  }

  if(user==null){
    var buttonClick = goHome;
    var buttonText = 'Login'
  }else{
    var buttonClick = goUpload;
    var buttonText = 'Upload'
  }


  return (
    <header className='choose'>
      <div className='colorBar'></div>

      <div class='tableChoose'>
        <img src= {Projectdiary}  className ='App-logo'></img>
        <a  class ="menuChoose">
          ระดับชั้น/ประเภท  
        </a>
        <button onClick={buttonClick} to='Login'  class ="log">
          {buttonText}
        </button>
      </div>

      <div className ='split'>

        <div className='heads'>
          <div>
            <div class="headsi">
              <div className='middlesc'><a class='box'>ระดับมัธยมศึกษา ตอนต้น</a></div>
              <div className='clicksc'><a onClick={goMiddle} class='box'>โครงงาน</a></div>
            </div>
          </div>
          <div>
            <div class="headsi">
              <div className='middlesc'><a class='box'>ระดับมัธยมศึกษา ตอนปลาย</a></div>
              <div className='clicksc'><a onClick={goHigh} class='box'>โครงงาน</a></div></div></div>
          <div
            ><div class="headsi">
              <div className='middlesc'><a class='box'>ระดับอุดมศึกษา</a></div>
              <div className='clicksc'><a onClick={goUni} class='box'>วิจัย</a></div></div></div>
        </div>

        <div className='infobar'><a class="info">ข่าวสารต่างๆ</a></div>

      </div>
      
      
    </header>
  );
}
  

export default Choose;
//input class = "search" type ="text" placeholder='ค้นหาชื่อโครงงาน' onChange={e => setSearch(e.target.value)}