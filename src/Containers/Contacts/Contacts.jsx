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
    contacts: state.contact.contact
}))(Contact);