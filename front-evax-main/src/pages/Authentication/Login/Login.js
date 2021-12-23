import React, {useState,useEffect} from 'react'
import { Button, Input} from 'antd';
import './Login.css';
import Navbar from '../../../components/Navar/Navbar';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from "../../../http-common";


function Login() {
    const [email, setEmail] = useState([]);

    const [password, setPassword] = useState([]);
    const handleChangeEmail = (e) => {
        e.preventDefault(); // prevent the default action
        setEmail(e.target.value); // set name to e.target.value (event)
      };
       const handleChangePassword = (e) => {
        e.preventDefault(); // prevent the default action
        setPassword(e.target.value); // set name to e.target.value (event)
      };

    function handleSubmit(event)  {
        event.preventDefault();
        console.log(email,password)
        axios
          .post("/login", { email,password})
          .then((result) => {
            //let name=    localStorage.getItem('name');
            localStorage.setItem('token', result.data.token); 
            console.log(result.data.token);
    
            return result;
          })
    
          .catch(function (error) {
            console.log(error);
          });
      
      };


    return (
        <form onSubmit={handleSubmit}>
        <div className="inscri">
            <Navbar/>
        <div className="contentInscri">
        <div className="choicePage">
       
            <div className="choiceButton">
                <h2> Login</h2>
                <div style={{margin:"auto"}}>
                    <h6>Email</h6>
                    <Input size="large" placeholder="email" className="inputInfo" onChange={handleChangeEmail}/>
                        <h6>Mot de passe</h6>
                        <Input.Password
                            className="inputInfo"
                            size="large"
                            onChange={handleChangePassword}
                            placeholder="mot de passe"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                    <button
            type="submit"
            className="btn btn-primary btn-lg"
          >Add
          </button>
                </div>
            </div>
            
            <img src="/vacc.jpg" alt="inscription" className="img"/>
          
        </div>
        </div>
        
    </div>
    </form>
    )
}

export default Login
