import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {checkError} from '../../utilities';
import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    
    //Hooks

    const [dataUser, setDataUser] = useState({
            name: "", surname: "", nickname: "",age: "", email: "", 
            password: "", password2: "" 
            
    });

    const [msgError, setMsgError] = useState("");


    //Handler (manejador)
    const inputData = (e) => {
            setDataUser({...dataUser, 
                [e.target.name]: e.target.value})
    };


    //Funciones locales del componente

    const registerme = async () => {

        setMsgError("");
        let error = "";

        let arrayFields = Object.entries(dataUser);

        if(dataUser.password !== dataUser.password2){

            return (setMsgError("Los dos password deben de coincidir"));

        }else{
            setMsgError("");
        }

        for(let element of arrayFields){
            error = checkError(element[0],element[1]);

            if(error !== "ok"){
                setMsgError(error);
                return;
            };
        };

        let body = {
            name: dataUser.name,
            surname: dataUser.surname,
            nickname: dataUser.nickname,
            age: dataUser.age,
            email: dataUser.email,
            password: dataUser.password           
            
        }


        try {
            
            let resultado = await axios.post("https://rocky-retreat-20214.herokuapp.com/api/register", body);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/login");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }
//Para ver en tiempo real lo escrito en inputs
//{<pre>{JSON.stringify(dataUser, null,2)}</pre>}
    return(
        <div className='designRegister'>
             
            <div className="cardRegister">
                <div className="upCardRegister">Formulario de Registro</div>
               
                <div className="middleCardRegister">
                    <input type="text" name="name" id="name" title="name" placeholder="Nombre:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Apellido:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="nickname" id="nickname" title="nickname" placeholder="Nickname: " autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="age" id="age" title="age" placeholder="Edad:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Correo Electrónico:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="password" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="password" name="password2" id="password2" title="password2" placeholder="Repite contraseña" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    
                </div>
                <div className="bottomCardRegister">
                    {msgError}
                    <div className="buttonRegister" onClick={()=>registerme()}>
                        Register me!
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;