import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CONTACT_DETAIL } from '../../redux/types';
import axios from 'axios';
import AddContact from "./AddContact/AddContact";
import {
    DeleteOutlined,
} from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";


import './Contacts.css';

const Contact = (props) => {

    AOS.init();
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
        setDataContact({
            ...dataContact,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/contacts_user", config);

            setTimeout(() => {

                setContacts(res.data.contacts);
            }, 1500);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseContact = (contact) => {
        console.log(contact);
        //Guardamos la pelicula escogida en redux
        props.dispatch({ type: CONTACT_DETAIL, payload: contact });

        //Redirigimos a movieDetail con navigate
        navigate("/contactdetail");
    }

    const deleteContact = async (id) => {


        try {

            await axios.delete(`https://rocky-retreat-20214.herokuapp.com/api/contact/${id}`, config);

            getContacts()
        } catch (error) {
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

            props.dispatch({ type: CONTACT_DETAIL, payload: resultado.data.contact });

            setTimeout(() => {
                getContacts();
            }, 1000)
        } catch (error) {
            console.log(error);
        }

    }

    if (contacts[0]?.id !== undefined) {
        return (
            <div className="Home">
                <AddContact />
                {contacts.map((contact, index) => {
                    return (
                        <div className="father" key={index} data-aos="zoom-in-right">
                            <Link onClick={() => chooseContact(contact)} to={"/contactdetail"}>
                                <div className="row1">
                                    <div className="name">Name: {contact.name}</div>
                                    <div className="surname">Surname: {contact.surname}</div>
                                    <div className="phone">Phone: {contact.phone}</div>
                                    <div className="email">Email: {contact.email}</div>
                                </div>
                            </Link>
                            <div className="row2">
                                <DeleteOutlined
                                    style={{ fontSize: "20px", color: "red", padding: "1em" }}
                                    onClick={() => {
                                        deleteContact(contact.id);
                                        notification.success({
                                            message: "Contact successfully deleted",
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

        );
    } else {
        return (
            <div className='designContacts'>
                <div className="new">
                    <input type="text" name="name" id="name" title="name" placeholder="Name:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Surname:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <input type="text" name="phone" id="phone" title="phone" placeholder="Phone:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <input type="email" name="email" id="email" title="email" placeholder="Email:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <div className="buttonRegister" onClick={() => createContact()}>
                        Create Contact
                    </div>
                </div>
            </div>
        )
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    contacts: state.contact.contact
}))(Contact);