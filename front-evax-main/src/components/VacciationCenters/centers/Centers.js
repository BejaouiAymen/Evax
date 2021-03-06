import React,{useState,useEffect} from 'react'
import './Centers.css'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import { Table, Button} from 'antd';
import {EyeOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import axios from "../../../http-common";

  const columns = [
    {
      title: 'Centre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Localisation',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Nombre max 1/2',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Action',
      key: 'action',
      render:()=>{
        return(
          <>
          <EyeOutlined style={{ fontSize: '16px', color: '#ABABFD' }}/>
          <EditOutlined style={{ fontSize: '16px', color: '#ABABFD' }}/>
          <DeleteOutlined style={{ fontSize: '16px', color: '#FD9F9F' }}/>

          </>
        )
      }

    },
  ];
function Centers() {
  
  const [ville, setVille] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/center')
        .then(response =>setVille(response.data));
  }, []);

    return (
        <div className="table">
          <Link to="/addCenter">
            <Button type="dashed" ghost danger style={{marginTop:'5px', marginBottom:'5px'}}>Ajouter centre</Button>
          </Link>
          
          <Table dataSource={ville} columns={columns} style={{width:'100%', borderRadius:'25px'}}> </Table>;
        </div>
    )
}

export default Centers
