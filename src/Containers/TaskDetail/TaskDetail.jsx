import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TaskDetail.css';

const TaskDetail = (props) => {

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

    const [dataTask, setDataTask] = useState({
        title: "", description: ""
        
    });


    //Handler (manejador)
    const inputData = (e) => {
        setDataTask({...dataTask, 
            [e.target.name]: e.target.value})
    };

    const updateTask = async (id) => {

        let body = {
            title: dataTask.title,
            description: dataTask.description
        }


        try {
            
            let resultado = await axios.put(`https://rocky-retreat-20214.herokuapp.com/api/task/${id}`, body, config);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/tasks");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }
   
        return(
            <div className='designDetail'>
                <div className="DetailHalf">
                    <div className="dataDetail title">{props.tasks.title}</div>
                    <div className="dataDetail">{props.tasks.description}</div>
                </div>
                <div className="DetailHalf">
                <div className="middleCard">
                    <input type="text" name="title" id="title" title="title" placeholder="Title:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="description" id="description" title="description" placeholder="Description:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>   
                </div>
                    <div className="button" onClick={()=>updateTask(props.tasks.id)}>
                        Update Task
                    </div>
            </div>
            </div>
        )
}  
   



export default connect((state) => ({
    credentials: state.credentials,
    tasks: state.task.task
}))(TaskDetail);