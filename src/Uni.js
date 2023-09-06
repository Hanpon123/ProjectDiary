import Projectdiary from './img/Projectdiary.png';
import './uni.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { React } from 'react';
import database from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs, updateDoc} from "firebase/firestore";
import db from './firebaseConfigDB';
import storage from './firebaseConfigStorage';
import { ref, getDownloadURL } from "firebase/storage";
import { setDoc , doc } from "firebase/firestore"; 

  
function Uni() {
  const [search, setSearch] = useState("");

  const user = database.currentUser;
  let navigate = useNavigate();
  var [showDescription,setShowDescription] = useState([]);
  var [showImg,setShowImg] = useState([]);
  var [showPdf,setShowPdf] = useState([]);
  var [showVdo,setShowVdo] = useState([]);
  var [linkImg,setLinkImg] = useState('');
  var [linkPdf,setLinkPdf] = useState('');
  var [linkVdo,setLinkVdo] = useState('');
  
  
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

  const goUpload = () => {
    navigate("/Upload")
  }

  // window.onload = async function () {
  //   for(let x=0;x<5;x++){
  //     if(x==0) {var id='phy'}
  //     if(x==1) {var id='chem'}
  //     if(x==2) {var id='bio'}
  //     if(x==3) {var id='math'}
  //     if(x==4) {var id='com'}
  //     await getDocs(collection(db, id+"High"))
  //     .then((querySnapshot) => {
  //       const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
  //       setShowDescription(newData);
  //       console.log(showDescription,newData);
  //       const newImg = newData.map((description,i)=>(
  //         getDownloadURL(ref(storage, id+"High"+'/'+description.title+'/image'))
  //           .then((url) => {
  //             if(description.image==''){
  //             updateDoc(doc(db, id+'High'+'/'+''+description.title), {
  //               image : url,
  //             });}
  //           }),
  //         getDownloadURL(ref(storage, id+"High"+'/'+description.title+'/pdf'))
  //           .then((url) => {
  //             if(description.pdf==''){
  //             updateDoc(doc(db, id+'High'+'/'+''+description.title), {
  //               pdf : url,
  //             });}
  //           }),
  //         getDownloadURL(ref(storage, id+"High"+'/'+description.title+'/video'))
  //           .then((url) => {
  //             if(description.video==''){
  //             updateDoc(doc(db, id+'High'+'/'+''+description.title), {
  //               video : url
  //             });}
  //           })
  //       ))
  //     })}
  // };

  const post =  async (id) => {
    for(let x=0;x<2;x++){
    await getDocs(collection(db, id+"Uni"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setShowDescription(newData);
        console.log(showDescription,newData);
        const newImg = newData.map((description,i)=>(
          getDownloadURL(ref(storage, id+"Uni"+'/'+description.title+'/image'))
            .then((url) => {
              if(description.image==''){
              updateDoc(doc(db, id+'Uni'+'/'+''+description.title), {
                image : url,
              });}
            }),
          getDownloadURL(ref(storage, id+"Uni"+'/'+description.title+'/pdf'))
            .then((url) => {
              if(description.pdf==''){
              updateDoc(doc(db, id+'Uni'+'/'+''+description.title), {
                pdf : url,
              });}
            }),
          getDownloadURL(ref(storage, id+"Uni"+'/'+description.title+'/video'))
            .then((url) => {
              if(description.video==''){
              updateDoc(doc(db, id+'Uni'+'/'+''+description.title), {
                video : url
              });}
            })
        ))
      })}
  }

  useEffect(() => {
    post();
  }, []);


  return (
    <header className='uni'>
      <div className='colorBar'></div>

      <div className='table'>
        <img src= {Projectdiary}  className ='App-logo'></img>
        <a  className ="menui">
          ฟอร์มการเขียน  
        </a>
        <a onClick={() => post('phy')} className ="menuii">
          ฟิสิกส์  
        </a>
        <a onClick={() => post('chem')} className ="menuiii">
          เคมี  
        </a>
        <a onClick={() => post('bio')} className ="menuiv">
          ชีวะ  
        </a>
        <a onClick={() => post('com')} className ="menuv">
          คอม  
        </a>
        <a onClick={() => post('math')} className ="menuvi">
          คณิต  
        </a>
        <a style={showEbar} className ="ebar"><FontAwesomeIcon icon={faBars} />
          <div className='dropdown'>
            <a onClick={handleLogout}>Logout</a>
            <a onClick={goUpload}>Upload</a>
          </div>
        </a>
          
      </div>

      <div className='heads'>
          <a className="headsi">
            วิจัย
          </a>
          <a className ="headsii">
            ระดับมหาวิทยาลัย
          </a>
        <input className = "search" type ="text" placeholder='ค้นหาชื่อโครงงาน' onChange={e => setSearch(e.target.value)} />
      </div>

      <div className='infobar'>
        {/* <a className="info">
          ข่าวสาร
        </a> */}
        <div className="card-list">
          {showDescription?.map((description,i)=>(
            <div className="card-container">
              <div style={{textAlign:'center'}}>
                <p style={{fontSize:'1.4vw',fontWeight:'bold'}} key={i}>{description.title}</p>
              </div>
              <div style={{display:'flex'}}>
                <div>
                  <img width={'200vw'} key={i} src={description.image}/>
                  <p key={i}>{description.description}</p>
                </div>
                <div style={{width:"50px"}}></div>
                <div>
                  {description.pdf ? <iframe width={'230px'} height={'400px'} src={description.pdf}></iframe> : <p></p>}
                </div>
              </div>
              <div>
                <iframe  width={'500px'} height={'300px'} src={description.video}></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );

}
  

export default Uni;
