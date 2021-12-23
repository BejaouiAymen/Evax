import React, {useState,useEffect} from 'react'
import AdminSideBar from '../../../components/AdminSideBar/AdminSideBar'
import {Input, Button, Select } from 'antd';
import axios from "../../../http-common";
const { Option } = Select;



function RendezVous() {
    const [id_center, setGouvernement] = useState([]);
    const [gov, setGov] = useState([]);
   
    useEffect(() => {
      axios.get('http://localhost:4000/center')
          .then(response =>setGov(response.data));
  }, []);
  
  function onChange(value) {
    setGouvernement(value)
    console.log(`selected ${value}`);
  }
    const Gov=gov.map(function(data, idx) {
        return ([
             <Option value={data._id}>{data.name}</Option>
        ]);
      });

      function handleSubmit(event)  {
        const rendervous=new Date().toLocaleString() + "";
        event.preventDefault();
        let token=localStorage.getItem('token');
        axios
          .post("/rdv", { id_center,token })
          .then((result) => {
            console.log(result);
    
            return result;
          })
    
          .catch(function (error) {
            console.log(error);
          });
      
      };
    return (
        
        <div >
            <AdminSideBar/>
            <div className="vaccinationCenters">
            <h1>Rendez vous</h1>
            <h2>ddddddddddddddddddddddddddddddddddddddd</h2>
            <Select
                className="input"
                value={gov._id}
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
               {Gov}
            </Select>
            <Button className="suivant" type='button' onClick={handleSubmit}>
                      Enregistrer
                    </Button>
            </div>
        </div>
    )
}

export default RendezVous
