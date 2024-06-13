import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './Context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
   const[alert,setAlert]=useState(null);
     const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>

    <Navbar/>
    <Alert alert={alert}/>
    <div className='container'>


    <Routes>
       <Route exect path="/" element={<Home showAlert={showAlert} />} ></Route>
    </Routes>
    {/* <Routes>
       <Route path= "/Users" element={}></Route>
    </Routes> */}
    <Routes>
       <Route exact path="/about" element={<About/>} ></Route>
    </Routes>
    <Routes>
       <Route exact path="/login" element={<Login showAlert={showAlert} />} ></Route>
    </Routes>
    <Routes>
       <Route exact path="/signup" element={<Signup showAlert={showAlert} />} ></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
