import { Form, Input, Button, notification } from "antd";
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TASK_DETAIL } from '../../../redux/types';
import axios from 'axios';
import "./AddTask.css";

const AddTask = (props) => {

  const [tasks, setTasks] = useState([]);


  let config = {
    headers: { Authorization: `Bearer ${props.credentials.token}` }
  };
  const onFinish = async (values) => {
    const res = await createTask(values);
    if (res) {
      notification.success({
        message: "Task successfully created",
      });
    }
    getTasks();
  };

  const getTasks = async () => {

    try {

      let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/tasks_user", config);

      setTasks(res.data.tasks);


    } catch (error) {
      console.log(error);
    }
  };
  const createTask = async (values) => {

    let body = {
      title: values.title,
      description: values.description
    }


    try {

      let res = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/task`, body, config);
      console.log(res);

      props.dispatch({ type: TASK_DETAIL, payload: res.data.task });

    } catch (error) {
      console.log(error);
    }

  }
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
            Create task
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
};

export default connect((state) => ({
  credentials: state.credentials,
  tasks: state.task.task
}))(AddTask);