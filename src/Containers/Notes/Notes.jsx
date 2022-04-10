import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { NOTE_DETAIL} from '../../redux/types';
import axios from 'axios';
import AddNote from "./AddNote/AddNote";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";


import './Notes.css';

const Notes = (props) => {
    AOS.init();
    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const [dataNote, setDataNote] = useState({
        title: "", description: ""
        
    });


    //Handler (manejador)
    const inputData = (e) => {
        setDataNote({...dataNote, 
            [e.target.name]: e.target.value})
    };

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        
        getNotes();
    },[]);

    const getNotes = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/notes_user", config);

            setTimeout(()=>{

                setNotes(res.data.notes);

                props.dispatch({type: NOTE_DETAIL, payload: res.data.notes});
            },1500);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseNote = (note) => {
        console.log(note);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:NOTE_DETAIL, payload: note});

        //Redirigimos a movieDetail con navigate
        navigate("/notedetail");
    }

    const deleteNote = async (id) => {

                
        try {

            await axios.delete(`https://rocky-retreat-20214.herokuapp.com/api/note/${id}`,config);
    
            getNotes()
            }catch (error){
                console.log(error);
            }
    }

    const createNote = async () => {

        let body = {
            title: dataNote.title,
            description: dataNote.description
        }


        try {
            
            let resultado = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/note`, body, config);
            console.log(resultado);
            
            props.dispatch({type:NOTE_DETAIL, payload: resultado.data.note});

            setTimeout(()=>{
                getNotes();
            },1000)
        } catch (error) {
            console.log(error);
        }

    }
 
    if(notes[0]?.id !== undefined){
        return (
            <div className="Home">
              <AddNote />
              {notes.map((note, index) => {
                return (
                  <div className="father" key={index} data-aos="zoom-in-right">
                    <Link onClick={()=>chooseNote(note)}to={"/notedetail" }>
                      <div className="row1">
                        <div className="title">Title: {note.title}</div>
                        <div className="description">Description: {note.description}</div>
                      </div>
                    </Link>
                    <div className="row2">
                          <DeleteOutlined
                            style={{ fontSize: "20px", color: "red", padding: "1em" }}
                            onClick={() => {
                              deleteNote(note.id);
                              notification.success({
                                message: "Note successfully deleted",
                              });
                            }}
                          />
                      </div>
                    </div>
                );
              })}
            </div>
            
          );
    }else{
        return (
            <div className='designNotes'>
                 <div className="new">
                <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>   
                    <div className="buttonRegister" onClick={()=>createNote()}>
                        Create Note
                    </div>
                </div>
            </div>
        )
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    notes: state.note.note
}))(Notes);