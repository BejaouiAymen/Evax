import React , { useState }from 'react'
import { Button, Descriptions, Table, Drawer, SpaceInput, Select, Input, Space} from 'antd';
import 'antd/dist/antd.css';
import './CenterDescription.css'
import {EyeOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';

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
const dataSource = [
    {
      key: '1',
      center: 'Maison jeune',
      vaccin: 'Pfizer',
      total:10
    },
    {
        key: '2',
        center: 'Maison jeune',
        vaccin: 'Pfizer',
        total:10
      },
      {
        key: '3',
        center: 'Maison jeune',
        vaccin: 'Pfizer',
        total:10
      },
  ];
  
  const columns = [
    {
      title: 'Vaccin',
      dataIndex: 'vaccin',
      key: 'vaccin',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    
  ];
function CenterDescription() {
  const [visible, setVisible] = useState(false);
    return (
        <div>
            <Button type="dashed" ghost danger style={{position:'absolute', top:'60px', right:'10px', paddingRight:'20px'}} onClick={() => setVisible(true)}><EditOutlined style={{ fontSize: '16px'}} danger/>Editer</Button>
            <Drawer
              title="Editer centre"
              width={520}
              onClose={() => setVisible(false)}
              visible={visible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={() => setVisible(false)} className="cancel">Cancel</Button>
                  <Button onClick={() => setVisible(false)} type="primary" className="submit">
                    Submit
                  </Button>
                </Space>
              }
            >
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
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
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
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
              </Select>
              <h6>Responsable</h6>
              <Input placeholder="Entrer centre" className="input"/>
              
            </Drawer>
            <h5 style={{color:"#ABABFD", marginTop:"25px", fontSize:'20px'}}>Détails</h5>
            <Descriptions layout="vertical" labelStyle={{color:"#2E4765", fontWeight:'bold'}} >
                <Descriptions.Item label="Nom centre" >Maison jeune</Descriptions.Item>
                <Descriptions.Item label="Gouvernorat">Tunis</Descriptions.Item>
                <Descriptions.Item label="Ville">Tunis</Descriptions.Item>
                <Descriptions.Item label="Responsable">Mohamed Salah</Descriptions.Item>
                <Descriptions.Item label="Nombre max 1/2">10</Descriptions.Item>
            </Descriptions>
            <div className="moreinfo">
                <div>
                    <h5 style={{color:"#FFBC6E", marginTop:"25px", fontSize:'20px'}}>Stock en vaccin</h5>
                    <Table dataSource={dataSource} columns={columns} style={{width:'100%', borderRadius:'25px'}}> </Table>;
                </div>
                <div>
                    <h5 style={{color:"#84E0BE", marginTop:"25px", fontSize:'20px'}}>Nombre des rendez-vous aujourd'hui</h5>
                    <div>
                        <h6 style={{fontSize:'20px'}}>22/03/2021</h6>
                        <h6 style={{fontSize:'18px'}}>30</h6>
                    </div>
                </div>
            </div>
            
            

        </div>
    )
}

export default CenterDescription
