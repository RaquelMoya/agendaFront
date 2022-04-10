import { Form, Input, Button, notification } from "antd";
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {CONTACT_DETAIL} from '../../../redux/types';
import axios from 'axios';
import "./AddContact.css";

const AddContact = (props) => {

    const [contacts, setContacts] = useState([]);

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
  const onFinish = async (values) => {
  
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
    const createContact = async () => {
    
        let body = {
            name: values.name,
            surname: values.surname,
            phone: values.phone,
            email: values.email
        }


        try {
            
            let res = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/contact`, body, config);
            console.log(res);
            
            props.dispatch({type:CONTACT_DETAIL, payload: res.data.contact});

        } catch (error) {
            console.log(error);
        }

    }


    const res = await createContact(values);
    if (res) {
      notification.success({
        message: "Contact successfully created",
      });
    }
    getContacts();
  };
  return (
    <div className="add-post-container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Surname"
          name="surname"
          rules={[
            {
              required: true,
              message: "Please input your surname!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="dashed" htmlType="submit">
            Create contact
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect((state) => ({
    credentials: state.credentials,
    contacts: state.contact.contact
}))(AddContact);