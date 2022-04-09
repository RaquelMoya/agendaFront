import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ContactDetail.css';

const ContactDetail = (props) => {

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

     const [dataContact, setDataContact] = useState({
        name: "", surname: "", phone: "", email:""
        
    });

      //Handler (manejador)
      const inputData = (e) => {
        setDataContact({...dataContact, 
            [e.target.name]: e.target.value})
    };
   
    const updateContact = async (id) => {

        let body = {
            name: dataContact.name,
            surname: dataContact.surname,
            phone: dataContact.phone,
            email: dataContact.email
        }


        try {
            
            let resultado = await axios.put(`https://rocky-retreat-20214.herokuapp.com/api/contact/${id}`, body, config);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/contacts");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }
        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm title">{props.contacts.name}</div>
                    <div className="dataFilm">{props.contacts.surname}</div>
                    <div className="dataFilm">{props.contacts.phone}</div>
                    <div className="dataFilm">{props.contacts.email}</div>
                </div>
                <div className="filmDetailHalf image">
                <input type="text" name="name" id="name" title="name" placeholder="Nombre:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Apellido:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="tel" name="phone" id="phone" title="phone" placeholder="Phone: " autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Email:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    
                </div>
                    <div className="buttonRegister" onClick={()=>updateContact(props.contacts.id)}>
                        Update Contact
                    </div>
                </div>
           
        )
}  
   



export default connect((state) => ({
    credentials: state.credentials,
    contacts: state.contact.contact
}))(ContactDetail);