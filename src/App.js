import './App.css'; 
import Projectdiary from './img/logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faBars } from '@fortawesome/free-solid-svg-icons' 
import { Link } from 'react-router-dom'
function App() 
{ 
  return ( 
    <app> 
      <div className='app'>
        <div className='colorBar'></div> 
        <div className='table'> 
          <img src= {Projectdiary} Class ='App-logo'></img> 
          <Link to='/' class ="menui"> ฟอร์มการเขียน </Link> 
          <a href='#' class ="menuii"> ฟิสิกส์ </a> 
          <a href='#' class ="menuii"> เคมี </a> 
          <a href='#' class ="menuii"> ชีวะ </a> 
          <a href='#' class ="menuii"> คอม </a>
          <a href='#' class ="menuii"> คณิต </a> 
          <a href='#' class ="menuii"> อื่นๆ </a> 
          <a href='#' class ="menui"><FontAwesomeIcon icon={faBars} /></a> 
        </div> 
      </div>
    </app> 
  ); 
} 
export default App;
