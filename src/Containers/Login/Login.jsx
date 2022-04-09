
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';


import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    console.log(props)
    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({email: "", password: ""});
    const [msgError, setMsgError] = useState("");
    const [msgError2, setMsgError2] = useState("");



    //Funciones handlers
    const rellenarDatos = (e) => {
        
        setDatosUsuario({...datosUsuario, [e.target.name]: e.target.value})
    };

    //Funciones locales

    const login = async () => {

        try {

            let body = {
                 email: datosUsuario.email,
                 password: datosUsuario.password
            }

            let resultado = await axios.post("https://rocky-retreat-20214.herokuapp.com/api/login",body);

            console.log(resultado)
            
            if(resultado.data === "Usuario o contraseña inválido"){
                setMsgError2("Usuario o contraseña inválido")
            }else{


                props.dispatch({type:LOGIN, payload: resultado.data});
                  
                setTimeout(()=>{
                  
                    navigate("/profile");
                },1500);
            }


        } catch (error) {

            console.log(error)

        }

        
    };

    //Render 
         //    {<pre>{JSON.stringify(datosUsuario, null,2)}</pre>}
        return(
            
            <div className='designLogin'>
             
                <div className="designForm">
                    <input type="email" name="email" id="email" title="email" placeholder="Correo Electrónico" autoComplete="off" onChange={(e)=>{rellenarDatos(e)}}/>
                    <input type="password" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{rellenarDatos(e);}}/>
                    {msgError}
                    {msgError2}
                </div>
                <div className="loginButton space" onClick={()=>login()}>LOGIN</div>
            </div>
        );

};


export default connect((state)=>({
    credentials: state.credentials
}))(Login);