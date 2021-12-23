import React from 'react'
import './Centers.css'
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom'
import { Table, Button} from 'antd';
import {EyeOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
const dataSource = [
    {
      key: '1',
      center: 'Maison jeune',
      capacity: 10,
      location:'Tunis'
    },
    {
      key: '2',
      center: 'Maison jeune',
      capacity: 10,
      location:'Tunis'
    },
    {
      key: '3',
      center: 'Maison jeune',
      capacity: 10,
      location:'Tunis'
    },
    {
      key: '4',
      center: 'Maison jeune',
      capacity: 10,
      location:'Tunis'
    },
  ];
  
  const columns = [
    {
      title: 'Centre',
      dataIndex: 'center',
      key: 'center',
    },
    {
      title: 'Localisation',
      dataIndex: 'location',
      key: 'location',
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

    return (
        <div className="table">
          <Link to="/addCenter">
            <Button type="dashed" ghost danger style={{marginTop:'5px', marginBottom:'5px'}}>Ajouter centre</Button>
          </Link>
          
          <Table dataSource={dataSource} columns={columns} style={{width:'100%', borderRadius:'25px'}}> </Table>;
        </div>
    )
}

export default Centers
