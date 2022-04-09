import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './ContactDetail.css';

const ContactDetail = (props) => {

    let navigate = useNavigate();

   

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });
   
        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm title">{props.contacts.name}</div>
                    <div className="dataFilm">{props.contacts.surname}</div>
                    <div className="dataFilm">{props.contacts.phone}</div>
                    <div className="dataFilm">{props.contacts.email}</div>
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
    contacts: state.contact.contact
}))(ContactDetail);