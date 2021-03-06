import React, {useState,useEffect} from 'react'
import {Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './AddCenterFrom.css'
import axios from "../../../http-common";

const { Option } = Select;


  
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

  const [ville, setVill] = useState([]);

  const [manager, setManager] = useState([]);
  const [gouvernement, setGouvernement] = useState([]);
  const [capacity, setCapacity] = useState([]);
  const handleChangeManager = (e) => {
    e.preventDefault(); // prevent the default action
    setManager(e.target.value); // set name to e.target.value (event)
  };
  function onChange(value) {
    setGouvernement(value)
    console.log(`selected ${value}`);
  }
  function onChangeVille(value) {
    setVill(value)
    console.log(`selected ${value}`);
  }
  const handleChangeGovernement = (e) => {
    
    setGouvernement(e.target.value); // set name to e.target.value (event)
  };
  const handleChangeCapacity = (e) => {
    e.preventDefault(); // prevent the default action
    setCapacity(e.target.value); // set name to e.target.value (event)
  };

  const [vill, setVille] = useState([]);
  const [test, setTest] = useState(0);
  const [gov, setGov] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/all')
        .then(response =>setVille(response.data.docs));
}, []);

  useEffect(() => {
    axios.get('http://localhost:4000/all')
        .then(response =>setGov(response.data.docs2));
}, []);


  const [name, setName] = useState(0);
  const handleChange = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };
  function handleSubmit(event)  {
    const rendervous=new Date().toLocaleString() + "";
    event.preventDefault();
    axios
      .post("/new-vaccination-centre", { name,gouvernement,ville,manager,capacity,rendervous })
      .then((result) => {
        console.log(result);

        return result;
      })

      .catch(function (error) {
        console.log(error);
      });
  
  };
  const Ville=vill.map(function(data, idx) {
    return ([
         <Option value={data._id}>{data.name}</Option>
    ]);
 });
 const Gov=gov.map(function(data, idx) {
  return ([
       <Option value={data._id}>{data.name}</Option>
  ]);
});
    return (
        <div className="addForm">
           <form onSubmit={handleSubmit}>
            <h6>Nom Centre</h6>
            <input name="name" placeholder="Entrer centre" className="input" onChange={handleChange}/>
            <h6>Gouvernorat</h6>
            <Select
                className="input"
                value={gov._id}
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
               {Gov}
            </Select>
            <h6>Ville</h6>
            <Select
                className="input"
                value={ville._id}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeVille}
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
            <Input name="manager" placeholder="Manager" className="input" onChange={handleChangeManager}/>
            <h6>Capacite</h6>
            <Input name="capacity" placeholder="Capacity" className="input" onChange={handleChangeCapacity}/>
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
