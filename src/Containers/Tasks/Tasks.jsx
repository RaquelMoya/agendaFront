import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TASK_DETAIL } from '../../redux/types';
import axios from 'axios';
import AddTask from "./AddTask/AddTask";
import {
    DeleteOutlined,
} from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, Link } from "react-router-dom";
import { notification } from "antd";



import './Tasks.css';

const Tasks = (props) => {

    AOS.init();
    let navigate = useNavigate();
    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/tasks_user", config);

            setTimeout(() => {

                setTasks(res.data.tasks);
            }, 1500);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseTask = (task) => {

        props.dispatch({ type: TASK_DETAIL, payload: task });

        navigate("/taskdetail");
    }

    const deleteTask = async (id) => {


        try {

            await axios.delete(`https://rocky-retreat-20214.herokuapp.com/api/task/${id}`, config);

            getTasks()
        } catch (error) {
            console.log(error);
        }
    }

    //Hooks

    const [dataTask, setDataTask] = useState({
        title: "", description: ""

    });


    //Handler (manejador)
    const inputData = (e) => {
        setDataTask({
            ...dataTask,
            [e.target.name]: e.target.value
        })
    };

    const createTask = async () => {

        let body = {
            title: dataTask.title,
            description: dataTask.description
        }


        try {

            let resultado = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/task`, body, config);
            console.log(resultado);

            props.dispatch({ type: TASK_DETAIL, payload: resultado.data.task });

            setTimeout(() => {
                getTasks();
            }, 1000)
        } catch (error) {
            console.log(error);
        }

    }

    if (tasks[0]?.id !== undefined) {
        return (
            <div className="Home">
                <AddTask />
                {tasks.map((task, index) => {
                    return (
                        <div className="father" key={index} data-aos="zoom-in-right">
                            <Link onClick={() => chooseTask(task)} to={"/taskdetail"}>
                                <div className="row1">
                                    <div className="title">Title: {task.title}</div>
                                    <div className="description">Description: {task.description}</div>
                                </div>
                            </Link>
                            <div className="row2">
                                <DeleteOutlined
                                    style={{ fontSize: "20px", color: "red", padding: "1em" }}
                                    onClick={() => {
                                        deleteTask(task.id);
                                        notification.success({
                                            message: "Task successfully deleted",
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
            <div className='designTasks'>
                <div className="new">
                    <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e) => { inputData(e) }} />
                    <div className="buttonRegister" onClick={() => createTask()}>
                        Create Task
                    </div>
                </div>
            </div>
        )
    }
};

export default connect((state) => ({
    credentials: state.credentials,
    tasks: state.task.task
}))(Tasks);