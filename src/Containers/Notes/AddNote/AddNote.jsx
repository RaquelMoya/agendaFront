import { Form, Input, Button, notification } from "antd";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NOTE_DETAIL } from '../../../redux/types';
import axios from 'axios';
import "./AddNote.css";

const AddNote = (props) => {

  const [notes, setNotes] = useState([]);

  let config = {
    headers: { Authorization: `Bearer ${props.credentials.token}` }
  };
  const onFinish = async (values) => {

    const getNotes = async () => {

      try {

        let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/notes_user", config);

        setTimeout(() => {

          setNotes(res.data.notes);
        }, 1500);

      } catch (error) {
        console.log(error);
      }
    };
    const createNote = async () => {

      let body = {
        title: values.title,
        description: values.description
      }


      try {

        let res = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/note`, body, config);
        console.log(res);

        props.dispatch({ type: NOTE_DETAIL, payload: res.data.note });

      } catch (error) {
        console.log(error);
      }

    }


    const res = await createNote(values);
    if (res) {
      notification.success({
        message: "Note successfully created",
      });
    }
    getNotes();
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
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
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
            Create note
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
  notes: state.note.note
}))(AddNote);