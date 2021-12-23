import React from 'react'
import {Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './AddCenterFrom.css'
import axios from "../../../http-common";

const { Option } = Select;

function onChangeName(e) {
  this.setState({
    name: e.target.value,
  });
}


async function handleSubmit (e)  {
  e.preventDefault();
  const name = this.state.name;
  const datefin = this.state.datefin;
  const delai = this.state.delai;

  axios.post("/admin/add_ville/", { name, datefin, delai });
  alert("Modified");
};


function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }
function AddVilleForm() {
     
    return (
        <div className="addForm">
           <form action="/admin/add_ville" method="post" >
            <h6>Nom Ville</h6>
           
            <Input placeholder="Entrer Ville" name="name" type="text" className="input"/>
            <Button  type="submit"  className="button">Ajouter Ville</Button>
            </form>
        </div>
    )
}

export default AddVilleForm
