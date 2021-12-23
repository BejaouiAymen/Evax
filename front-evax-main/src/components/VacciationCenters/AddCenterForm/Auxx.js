import React, {useState,useEffect} from 'react'
import {Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './AddCenterFrom.css'
import axios from "../../../http-common";

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
  const [ville, setVille] = useState([]);
  const [test, setTest] = useState(0);
  const [gov, setGov] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/all')
        .then(response => setVille(response.data.docs),response => setGov(response.data.doc));
}, []);


  const [name, setName] = useState(0);
  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };
  function handleSubmit(event)  {
    event.preventDefault();
    axios
      .post("/add_ville/", { name })
      .then((result) => {
        console.log(result);

        return result;
      })

      .catch(function (error) {
        console.log(error);
      });
  
  };
  const Ville=ville.map(function(data, idx) {
    return ([
         <Option value={idx}>{data.name}</Option>
    ]);
 });
 const Gov=gov.map(function(data, idx) {
  return ([
       <Option value={idx}>{data.name}</Option>
  ]);
});
    return (
        <div className="addForm">
           <form onSubmit={handleSubmit}>
            <h6>Nom Centre</h6>
            <Input placeholder="Entrer centre" className="input"/>
            <h6>Gouvernorat</h6>
            <Select
                className="input"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
               {gov}
            </Select>
            <h6>Ville</h6>
            <Select
                className="input"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
              {Ville
              }
               
            </Select>
            <h6>Responsable</h6>
            <Input placeholder="Entrer centre" className="input"/>
            <Button  type="submit"  className="button">Ajouter Centre</Button>
            </form>
        </div>
    )
}

export default AddCenterForm
