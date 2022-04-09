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
        console.log(task);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:TASK_DETAIL, payload: task});

        //Redirigimos a movieDetail con navigate
        navigate("/taskdetail");
    }
 
    if(tasks[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    
                    tasks.map(task => {
                      
                        return (
        
                            <div className="task" key={task.id} onClick={()=>chooseTask(task)}>
                                <p>Title: {task.title}</p>
                                <p>Description: {task.description}</p>
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
    tasks: state.task.task
}))(Tasks);