import React,{useState} from 'react'
import './FirstStep.css'
import { Input, DatePicker, InputNumber, Button, Select} from 'antd';

function SecondStep() {
    const { Option } = Select;


    
  const [email, setMail] = useState();
  const [password, setPassword] = useState();
  

  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setMail(e.target.value);
    localStorage.setItem('email', e.target.value);    
};
  
const handleChangePassword= (e) => {
    e.preventDefault(); // prevent the default action
    setMail(e.target.value);
    localStorage.setItem('password', e.target.value);  

  };
 
    return (
        <div className="formulaire">

                <h6> Mail</h6>
                <Input name="email"  onChange={handleChange} className="inputInfo"/>
                <h6> Password</h6>
                <Input name="password"  onChange={handleChangePassword} className="inputInfo"/>
                <div className="select-centre">
                    <div>
                        <h6 style={{marginRight:"10px"}}> Centre de vaccination</h6>
                    </div>
                    <div>
                        <h6> Pharmacie</h6>
                    </div>   
                </div>
                <Input className="inputInfo"/>
                
                
                
                
        </div>
    )
}

export default SecondStep
