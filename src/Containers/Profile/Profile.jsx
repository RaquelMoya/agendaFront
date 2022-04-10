import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {MODIFY_CREDENTIALS} from '../../redux/types';
import axios from 'axios';
import { Modal, Button, Input, notification } from "antd";
import AOS from 'aos';
import 'aos/dist/aos.css';



import './Profile.css';

const Profile = (props) => {
    AOS.init();
    
    let navigate = useNavigate();

    //Hooks
    const [dataUser, setDataUser] = useState({
        id:props.credentials.user.id, name: props.credentials.user.name, surname: props.credentials.user.surname,nickname: props.credentials.user.nickname, age: props.credentials.user.age, email: props.credentials.user.email, 
        
    });

    const [visible, setVisible] = useState(false);

    const fillData = (e) => {
      setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };


      //Handler (manejador)
      const inputData = (e) => {
        setDataUser({...dataUser, 
            [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        if(props.credentials?.token === ""){
            navigate("/");
        }
    });
    const getUserInfo = async () => {
        try {
          const credentials = JSON.parse(
            localStorage.getItem("redux_localstorage_simple_credentials")
          );
          let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };
          let res = await axios.get(`https://rocky-retreat-20214.herokuapp.com/api/user/me`, config);
          await props.dispatch({ type: MODIFY_CREDENTIALS, payload: res.data });
      
          return res;
        } catch (error) {
          console.log(error);
        }
      };
    
    const updateUser = async () => {

        let body = {
            name: dataUser.name,
            surname: dataUser.surname,
            nickname: dataUser.nickname,
            email: dataUser.email,
            
        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            
            let res = await axios.put(`https://rocky-retreat-20214.herokuapp.com/api/user/${props.credentials.user.id}`,body, config);

            
            
            
            if(res){
                
                props.dispatch({type:MODIFY_CREDENTIALS, payload: dataUser});
            }
        } catch (error) {
            console.log(error)
        }

    };
    const onSubmit = async () => {
        try {
          const res = await updateUser(props.user?.id, dataUser);
          
            getUserInfo();
              setVisible(false);
              notification.success({ message: "Perfil actualizado con éxito" });
          
        } catch (error) {
          console.log(error);
        }
      };

        return (
    <div className="designProfile">
        <div className="container">
            <div className="card" data-aos="zoom-in-down">
              <p>
                <b>Name: </b>
                {dataUser.name}
              </p>
              <p>
                <b>Surname: </b>
                {dataUser.surname}
              </p>
              <p>
                <b>Email: </b>
                {dataUser.email}
              </p>
              <p>
                <b>Nickname: </b>
                {dataUser.nickname}
              </p>
             
              <Button type="dashed" onClick={() => setVisible(true)}>
                Edit Profile
              </Button>
              <Modal
                title="Edit Profile"
                visible={visible}
                onOk={() => onSubmit()}
                onCancel={() => setVisible(false)}
              >
                <p>
                  <b>Name:</b>
                </p>
                <Input
                  name="name"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  value={dataUser.name || ""}
                  onChange={(e) => {
                    fillData(e);
                  }}
                />
                <p>
                  <b>Surname:</b>
                </p>
                <Input
                  name="surname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  value={dataUser.surname || ""}
                  onChange={(e) => {
                    fillData(e);
                  }}
                />
                <p>
                  <b>Email:</b>
                </p>
                <Input
                  name="email"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  value={dataUser.email || ""}
                  onChange={(e) => {
                    fillData(e);
                  }}
                />
                <p>
                  <b>Nickname:</b>
                </p>
                <Input
                  name="nickname"
                  type="text"
                  variant="filled"
                  autoComplete="off"
                  value={dataUser.nickname || ""}
                  onChange={(e) => {
                    fillData(e);
                  }}
                />
              </Modal>
            </div>
            

                <div className="designProfile">
                <Button destiny={"Tasks"} url={"/tasks"}/>
                <Button destiny={"Notes"} url={"/notes"}/>
                <Button destiny={"Contacts"} url={"/contacts"}/>
                </div>

            </div>
            </div>
        )


}               



export default connect((state)=>({
    credentials: state.credentials
}))(Profile);