import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './NoteDetail.css';

const NoteDetail = (props) => {

    let navigate = useNavigate();

   

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });
   
        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm title">{props.notes.title}</div>
                    <div className="dataFilm">{props.notes.description}</div>
                    <div className="dataFilm">
                       
                    </div>
                </div>
                <div className="filmDetailHalf image">
                       
            </div>
            </div>
        )
}  
   



export default connect((state) => ({
    credentials: state.credentials,
    notes: state.note.note
}))(NoteDetail);