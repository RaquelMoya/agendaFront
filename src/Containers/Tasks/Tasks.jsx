import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { TASK_DETAIL} from '../../redux/types';
import axios from 'axios';


import './Tasks.css';

const Tasks = (props) => {

    let navigate = useNavigate();
    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        getTasks();
    },[]);

    const getTasks = async () => {

        try {

            let res = await axios.get("https://rocky-retreat-20214.herokuapp.com/api/tasks_user", config);

            setTimeout(()=>{
                
                setTasks(res.data.tasks);
                console.log(tasks);
            },1500);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseTask = (task) => {
        
        props.dispatch({type:TASK_DETAIL, payload: task});

        navigate("/taskdetail");
    }

    const deleteTask = async (id) => {

                
        try {

            await axios.delete(`https://rocky-retreat-20214.herokuapp.com/api/task/${id}`,config);
    
            getTasks()
            }catch (error){
                console.log(error);
            }
    }

         //Hooks

         const [dataTask, setDataTask] = useState({
            title: "", description: ""
            
        });
    
    
        //Handler (manejador)
        const inputData = (e) => {
            setDataTask({...dataTask, 
                [e.target.name]: e.target.value})
        };
    
        const createTask = async () => {
    
            let body = {
                title: dataTask.title,
                description: dataTask.description
            }
    
    
            try {
                
                let resultado = await axios.post(`https://rocky-retreat-20214.herokuapp.com/api/task`, body, config);
                console.log(resultado);
                
                props.dispatch({type:TASK_DETAIL, payload: resultado.data.task});

                setTimeout(()=>{
                    getTasks();
                },1000)
            } catch (error) {
                console.log(error);
            }
    
        }
 
    if(tasks[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    
                    tasks.map(task => {
                      
                        return (
        
                            <div className="task" key={task.id}>
                                <p onClick={()=>chooseTask(task)}>Title: {task.title}</p>
                                <p>Description: {task.description}</p>
                                <div className="delete" onClick={()=>deleteTask(task.id)}>Delete</div>
                            </div>
                        )
                    })
                }
                <div className="new">
                <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>   
                    <div className="buttonRegister" onClick={()=>createTask()}>
                        Create Task
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className='designTasks'>
                <div className="new">
                <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>   
                    <div className="buttonRegister" onClick={()=>createTask()}>
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