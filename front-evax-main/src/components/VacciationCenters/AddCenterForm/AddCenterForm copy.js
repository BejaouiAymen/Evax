import React from 'react'
import {Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './AddCenterFrom.css'
import axios from "../../../http-common";
import  { useEffect, useState } from "react";

const { Option } = Select;

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
  
function AddCenterForm() {
  const [name, setName] = useState(0);
  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };
  function handleCompanySubmit(event)  {
    event.preventDefault();
    axios
      .post("/add_gov/", { name })
      .then((result) => {
        console.log(result);

        return result;
      })

      .catch(function (error) {
        console.log(error);
      });
  
  };
    return (
        <div className="addForm">
           <form onSubmit={handleCompanySubmit}  >
            <h6>Nom Ville</h6>
           
         <input type="text" name="name" onChange={handleChange}></input>
         <button
            type="submit"
            className="btn btn-primary btn-lg"
          >Add
          </button>
            </form>
        </div>
    )
}

export default AddCenterForm
