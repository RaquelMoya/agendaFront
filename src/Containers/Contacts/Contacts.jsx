import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CONTACT_DETAIL} from '../../redux/types';
import axios from 'axios';


import './Contacts.css';

const Contact = (props) => {

    let navigate = useNavigate();

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const [contacts, setContacts] = useState([]);

    const [dataContact, setDataContact] = useState({
        name: "", surname: "", phone: "", email: ""
        
    });


    //Handler (manejador)
    const inputData = (e) => {
        setDataContact({...dataContact, 
            [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        getContacts();
    },[]);

    const getContacts = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/contacts_user", config);

            setTimeout(()=>{

                setContacts(res.data.contacts);
            },1500);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseContact = (contact) => {
        console.log(contact);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:CONTACT_DETAIL, payload: contact});

        //Redirigimos a movieDetail con navigate
        navigate("/contactdetail");
    }

    const deleteContact = async (id) => {

                
        try {

            await axios.delete(`https://rocky-retreat-20214.herokuapp.com/api/contact/${id}`,config);
    
            getContacts()
            }catch (error){
                console.log(error);
            }
    }

    const createContact = async () => {

        let body = {
            name: dataContact.name,
            surname: dataContact.surname,
            phone: dataContact.phone,
            email: dataContact.email
        }


        try {
            
            let resultado = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/contact`, body, config);
            console.log(resultado);
            
            props.dispatch({type:CONTACT_DETAIL, payload: resultado.data.contact});

            setTimeout(()=>{
                getContacts();
            },1000)
        } catch (error) {
            console.log(error);
        }

    }
 
    if(contacts[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    
                    contacts.map(contact => {
                      
                        return (
        
                            <div className="contact" key={contact.id}>
                                <p  onClick={()=>chooseContact(contact)}>Name: {contact.name}</p>
                                <p>Surname: {contact.surname}</p>
                                <p>Phone: {contact.phone}</p>
                                <p>Email: {contact.email}</p>
                                <div className="delete" onClick={()=>deleteContact(contact.id)}>Delete</div>
                            </div>
                        )
                    })
                }
                <div className="new">
                    <input type="text" name="name" id="name" title="name" placeholder="Name:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Surname:" autoComplete="off" onChange={(e)=>{inputData(e)}}/> 
                    <input type="text" name="phone" id="phone" title="phone" placeholder="Phone:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Email:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>  
                    <div className="buttonRegister" onClick={()=>createContact()}>
                        Create Contact
                    </div>
                </div>

            </div>
        )
    }else{
        return (
            <div className='designContacts'>
                <div className="marginLoader"> Cargando </div>
            </div>
        )
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    contacts: state.contact.contact
}))(Contact);