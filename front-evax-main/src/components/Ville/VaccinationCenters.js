import React from 'react'
import './VaccinationCenters.css'
import { Button, Input , Tooltip, Tabs} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Centers from './centers/Centers';
import AdminHeader from '../AdminHeader/AdminHeader';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
function VaccinationCenters() {
    return (
        <div className="vaccinationCenters">
            <AdminHeader/>
            <div className="search">
                <Input size="large" placeholder="Rechercher centre"/>
                <Tooltip title="search">
      <Button shape="circle" icon={<SearchOutlined />} />
    </Tooltip>
            </div>
            <div className="centers">
            <Tabs defaultActiveKey="1" onChange={callback} className="tabs-center" centered="true" size="large" tabBarStyle={{backgroundColor:'transparent', color:"#2E4765"}}>
                <TabPane tab="Centre de vaccination" key="1" className="centre"> 
                        <Centers/>
                </TabPane>
                <TabPane tab="Pharmacie" key="2" className="centre">
                    
                        <Centers/>
                    
                </TabPane>
            </Tabs>
                
            </div>
        </div>
    )
}

export default VaccinationCenters
