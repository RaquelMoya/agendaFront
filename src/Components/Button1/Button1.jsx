import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./Button1.css";

const Button1 = (props) => {

    let navigate = useNavigate();


    //Funciones locales del componente (métodos del componente)
    const takeMe = () => {
        navigate(props.url);
    }

    return(
        <div className="designButton" onClick={()=>takeMe()}>{props.destiny}</div>
    );

};

export default Button1;