import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './NoteDetail.css';

const NoteDetail = (props) => {

    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });

        //Hooks

        const [dataNote, setDataNote] = useState({
            title: "", description: ""
            
    });


    //Handler (manejador)
    const inputData = (e) => {
            setDataNote({...dataNote, 
                [e.target.name]: e.target.value})
    };


    //Funciones locales del componente

    const updateNote = async (id) => {

        let body = {
            title: dataNote.title,
            description: dataNote.description
        }


        try {
            
            let resultado = await axios.put(`https://rocky-retreat-20214.herokuapp.com/api/note/${id}`, body, config);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/notes");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }
   
        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm title">{props.notes.title}</div>
                    <div className="dataFilm">{props.notes.description}</div>
                    <div className="dataFilm"></div>
                </div>
                <div className="filmDetailHalf image">
                <div className="middleCardRegister">
                    <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>   
                </div>
                    <div className="buttonRegister" onClick={()=>updateNote(props.notes.id)}>
                        Update Note
                    </div>
                </div>
            </div>
        )
}  
   



export default connect((state) => ({
    credentials: state.credentials,
    notes: state.note.note
}))(NoteDetail);