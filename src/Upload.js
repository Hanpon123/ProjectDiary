import Projectdiary from './img/Projectdiary.png';
import './upload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { React } from 'react';
import database from './firebaseConfig';
import { useNavigate , Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { setDoc , doc } from "firebase/firestore"; 
import db from './firebaseConfigDB';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage'
import storage from './firebaseConfigStorage';
  
function Up() {
  const [title, setTitle] = useState("");
  const user = database.currentUser;
  let navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [selectedPdf, setSelectedPdf] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedVideo, setSelectedVideo] = useState("");
  const [error, setError] = useState(null);
  var [linkImg, setLinkImg] = useState('');
  var [linkPdf, setLinkPdf] = useState('');
  var [linkVdo, setLinkVdo] = useState('');


  // const handleDescription = (event) =>{
  //   const description = event.target.description;
  //   const value = event.target.value;
  //   setDescription(values => ({...values, [description]: value}))
  // }
  // const handleTitle = (event) =>{
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setTitle(values => ({...values, [name]: value}))
  // }

  const handleSubmit = () => {

    // event.preventDefault(); 

    const selectedLevel = document.querySelector('input[name="level"]:checked');
    const selectedSubject = document.querySelector('input[name="subject"]:checked');
    const inputTitle = document.querySelector('#title')
    const inputDescription = document.querySelector('#description')

    if (selectedSubject) {
      var subjectValue = selectedSubject.value;
      console.log("Selected subject: " + subjectValue);
    }
    if (selectedLevel) {
      var levelValue = selectedLevel.value;
      console.log("Selected level: " + levelValue);
    }
    if (inputTitle) {
      var titleValue = inputTitle.value;
      console.log("Selected level: " + titleValue);
    }
    if (inputDescription) {
      var descriptionValue = inputDescription.value;
      console.log("Selected level: " + descriptionValue);
    }

    if(selectedPdf){
      const storageRef = ref(storage,subjectValue+levelValue+'/'+titleValue+'/'+'pdf');
      uploadBytes(storageRef, selectedPdf);
    }
    if(selectedImg){
      const storageRef = ref(storage,subjectValue+levelValue+'/'+titleValue+'/'+'image');
      uploadBytes(storageRef, selectedImg);
    }
    if(selectedVideo){
      const storageRef = ref(storage,subjectValue+levelValue+'/'+titleValue+'/'+'video');
      uploadBytes(storageRef, selectedVideo);      
    }
     
    
    try{
      setDoc(doc(db, subjectValue+levelValue+'/'+''+titleValue), {
        title: ''+titleValue,
        description: ''+descriptionValue,
        image : '',
        pdf : '',
        video : '',
      });
    }catch(error){
      setError(error.message);
    }

    navigate('/');
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(title);
  // }

  const goHome = () => {
    navigate("/");
  }

  if(user==null)
  {
    var showEbar={display: 'none'};
  }else{
    var showEbar={display: 'inline-block'};
  }

  const handleLogout = async () => {
    await signOut(database)
    navigate("/");
  }

  if(user!=null){
  return (
    
    <header className='up'>
      <div className='colorBar'></div>

        <div className='table'>
          <img src= {Projectdiary}  Class ='App-logo'></img>
          <a  class ="menui">
            ฟอร์มการเขียน  
          </a>
          <a  class ="menuii">
            ฟิสิกส์  
          </a>
          <a  class ="menuiii">
            เคมี  
          </a>
          <a  class ="menuiv">
            ชีวะ  
          </a>
          <a  class ="menuv">
            คอม  
          </a>
          <a  class ="menuvi">
            คณิต  
          </a>
          <a  class ="menuvii">
            อื่นๆ  
          </a>
          <a style={showEbar} class ="ebar"><FontAwesomeIcon icon={faBars} />
            <div className='dropdown'>
            <a onClick={goHome}>Home</a>
              <a onClick={handleLogout}>Logout</a>
            </div>
          </a>
            
        </div>

      <div className='heads'>
          <a class ="headsii">
            อัพโหลด
          </a>
      </div>

      <center><div class = 'content'>
        <form>
          <div className='holeRadio'>
            <input value='Middle' className='radio' id='middle' name='level' type="radio"></input>
            <label style={{cursor:'pointer'}} for="middle">โครงงานมัธยมต้น</label>
            <input value='High' className='radio' id='high' name='level' type="radio"></input>
            <label style={{cursor:'pointer'}} for="high">โครงงานมัธยมปลาย</label>
            <input value='Uni' className='radio' id='uni' name='level' type="radio"></input>
            <label style={{cursor:'pointer'}} for="uni">วิจัยมหาวิทยาลัย</label>
          </div>
          <div className='holeRadio'>
            <input value='phy' className='radio' id='phy' name='subject' type="radio"></input>
            <label style={{cursor:'pointer'}} for="phy">ฟิสิกส์</label>
            <input value='chem' className='radio' id='chem' name='subject' type="radio"></input>
            <label style={{cursor:'pointer'}} for="chem">เคมี</label>
            <input value='bio' className='radio' id='bio' name='subject' type="radio"></input>
            <label style={{cursor:'pointer'}} for="bio">ชีวะ</label>
            <input value='com' className='radio' id='com' name='subject' type="radio"></input>
            <label style={{cursor:'pointer'}} for="com">คอม</label>
            <input value='math' className='radio' id='math' name='subject' type="radio"></input>
            <label style={{cursor:'pointer'}} for="math">คณิต</label>
          </div>
          <div><input id ='title' class = "title" type ="text" placeholder='ชื่อโครงงาน' onChange={setTitle}/></div>
          <div><textarea id = 'description' class = "description" type="text" placeholder='คำอธิบายโครงงาน' onChange={setDescription}/></div>

          <div>
            <div style={{display: 'flex',justifyContent:'center',border:'0px solid black'}}>
              <p className='uploadText' >อัพโหลดไฟล์ PDF</p>
              <p className='uploadText' >อัพโหลดไฟล์รูปภาพ</p>
              <p className='uploadText' >อัพโหลดไฟล์ Video</p>
            </div>
            <div style={{border:'0px solid black'}}>
              <input onChange={(event) => setSelectedPdf(event.target.files[0])} style={{fontWeight:'bold', cursor:'pointer', fontSize:'0.7vw',fontFamily:'Mali',marginLeft:'8vw'}} class = "pdf" type="file"></input>
              <input onChange={(event) => setSelectedImg(event.target.files[0])} style={{fontWeight:'bold', cursor:'pointer', fontSize:'0.7vw',fontFamily:'Mali',marginLeft:'-1vw'}} class = "pic" type="file"></input>
              <input onChange={(event) => setSelectedVideo(event.target.files[0])} style={{fontWeight:'bold', cursor:'pointer', fontSize:'0.7vw',fontFamily:'Mali',marginLeft:'-1vw',marginBottom:'3vh'}} class = "vdo" type="file"></input>
            </div>
          </div>

          <input onClick={handleSubmit} className='submit' style={{cursor:'pointer', marginBottom:'3vh'}} type='submit'/>
        </form>
      </div></center>
      
    </header>
  );}else{

    console.log(database.currentUser);
    return(
      <center><div><p style={{fontSize:'5vw',marginBottom:'10vh',color:'#100f4a'}}>404<br/>Page Not Found</p><Link style={{textDecoration:'none',fontWeight:'bold',fontSize:'2vw',color:'white',padding:'2vh 2vw',backgroundColor:'orange',borderRadius:'3vh'}} to = "/">Go back to our homepage</Link></div></center>
    );
  }
}
  

export default Up;
//input class = "search" type ="text" placeholder='ค้นหาชื่องานวิจัย' onChange={e => setSearch(e.target.value)}