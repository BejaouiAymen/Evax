import React,{useState} from 'react'
import './FirstStep.css'
import { Input, DatePicker, InputNumber, Button} from 'antd';
function FirstStep() {

    
  const [name, setName] = useState();
  const [ncin, setCIN] = useState();
  const [date, setDate] = useState();
  const [nmobile, setMobile] = useState();

  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value);
    localStorage.setItem('name', e.target.value);    
};
  
  function handleChangeDate(value) {
    localStorage.setItem('date', value);    
    setDate(value); 
   

  };
  function handleChangeMobile(value) {
    setMobile(value); 
    localStorage.setItem('nmobile', value);    

  };
  const handleChangeCIN = (e) => {
    e.preventDefault(); // prevent the default action
    setCIN(e.target.value); 
    localStorage.setItem('ncin', e.target.value);    

  };
    return (
        <div className="formulaire">

                <h6> Nom et prénom</h6>
                <Input name="name"  onChange={handleChange} className="inputInfo"/>
                <h6> Numéro CIN</h6>
                <Input name="ncin"  onChange={handleChangeCIN} className="inputInfo"/>
                <h6> Date de naissance</h6>
                <DatePicker name="date"  onChange={handleChangeDate} className="inputInfo"/>
                <h6> Numéro telephone</h6>
                <InputNumber name="nmobile"  onChange={handleChangeMobile} className="inputInfo"/>
                
        </div>
    )
}

export default FirstStep
