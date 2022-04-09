
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { LOGOUT, TASKS_TITLE, NOTES_TITLE} from '../../redux/types';
import {connect} from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
    Input,
    Button
} from 'antd';

import './Header.css';

const Header = (props) => {

    let navigate = useNavigate();
    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
    const [taskTitle, setTaskTitle] = useState("");
    const [noteTitle, setNoteTitle] = useState("");


    const navegar = (lugar) => {

        setTimeout(()=> {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({type:LOGOUT});

        setTimeout(()=>{
            navigate("/");
        },1000);
    }
    const handler = (ev) => {
        setNoteTitle(ev.target.value);
    }
    const manejador = (ev) => {
        setTaskTitle(ev.target.value);
    }

    const searchNoteByTitle = async () => {


        try {
            let resultados = await axios.get(`https://rocky-retreat-20214.herokuapp.com/api/notes_title/${noteTitle}`, config);

            props.dispatch({type: NOTES_TITLE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/notedetail");
            },500);


        } catch (error) {
            console.log(error);
        }
    }
    const searchTaskByTitle = async () => {


        try {
            let resultados = await axios.get(`https://rocky-retreat-20214.herokuapp.com/api/tasks_title/${taskTitle}`, config);

            props.dispatch({type: TASKS_TITLE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/taskdetail");
            },500);


        } catch (error) {
            console.log(error);
        }
    }
    if(!props.credentials?.token){
        return (
            <div className='designHeader'>
                <div className="headerSpace genreDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una nota por título" onChange={(ev)=>handler(ev)}/>
                        <Button onClick={()=>searchNoteByTitle()} type="primary">Go!</Button>
                    </Input.Group>
                </div>  
                <div className="headerSpace searchDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una tarea por título" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>searchTaskByTitle()} type="primary">Go!</Button>
                    </Input.Group>
                </div>
                <div className="headerSpace"></div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={()=>navegar("/login")}>Login</div>
                    <div className="link" onClick={()=>navegar("/register")}>Register</div>   
                    <div className="link"onClick={()=>navegar("/home")}>Home</div> 
                </div>
            </div>
        )
    }else {
        return (
            <div className='designHeader'>
                  <div className="headerSpace genreDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una nota por título" onChange={(ev)=>handler(ev)}/>
                        <Button onClick={()=>searchNoteByTitle()} type="primary">Go!</Button>
                    </Input.Group>
                </div>  
                <div className="headerSpace searchDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una tarea por título" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>searchTaskByTitle()} type="primary">Go!</Button>
                    </Input.Group>
                </div>
                <div className="headerSpace"></div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={()=>navegar("/profile")}>Profile</div>
                    <div className="link" onClick={()=>logOut()}>Logout</div>    
                </div>
            </div>
        )
    }

    

}

export default connect((state)=>({
    credentials: state.credentials
}))(Header);