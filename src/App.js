import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Welcome from './Containers/Welcome/Welcome';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Profile from './Containers/Profile/Profile';
import Tasks from './Containers/Tasks/Tasks';
import Notes from './Containers/Notes/Notes';
import Contacts from './Containers/Contacts/Contacts';
import TaskDetail from './Containers/TaskDetail/TaskDetail';
import NoteDetail from './Containers/NoteDetail/NoteDetail';
import ContactDetail from './Containers/ContactDetail/ContactDetail';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      
        <Header/>

        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/taskdetail" element={<TaskDetail/>}/>
          <Route path="/notedetail" element={<NoteDetail/>}/>
          <Route path="/contactdetail" element={<ContactDetail/>}/>
      
        </Routes>

        <Footer/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;