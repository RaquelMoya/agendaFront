
import React from 'react';
import Button from '../../Components/Button/Button';

import './Welcome.css';

const Welcome = () => {

    return (
        <div className="designWelcome">
            <div className="card">
                <p>¡Bienvenid@ a Agend!</p>
                <Button destiny={"Login"} url={"/login"}/>
                <Button destiny={"Register"} url={"/register"}/>
            </div>
        </div>
    )

}

export default Welcome;