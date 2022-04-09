import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { NOTE_DETAIL} from '../../redux/types';
import axios from 'axios';


import './Notes.css';

const Notes = (props) => {

    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const [notes, setNotes] = useState([]);

    useEffect(()=>{
        
        getNotes();
        console.log(notes);
    },[]);

    const getNotes = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/notes_user", config);

            setTimeout(()=>{

                setNotes(res.data.notes);
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
 
    if(notes[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    
                    notes.map(note => {
                      
                        return (
        
                            <div className="note" key={note.id} onClick={()=>chooseNote(note)}>
                                <p>Title: {note.title}</p>
                                <p>Description: {note.description}</p>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designMovies'>
                <div className="marginLoader">
                </div>
            </div>
        )
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    notes: state.note.note
}))(Notes);