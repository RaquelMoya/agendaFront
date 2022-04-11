
import React from 'react';
import Button1 from '../../Components/Button1/Button1';

import './Welcome.css';

const Welcome = () => {

    return (
        <div className="designWelcome">
            <div className="card">
                <p>¡Bienvenid@ a Agend!</p>
                <Button1 destiny={"Login"} url={"/login"}/>
                <Button1 destiny={"Register"} url={"/register"}/>
            </div>
        </div>
    )

}

export default Welcome;