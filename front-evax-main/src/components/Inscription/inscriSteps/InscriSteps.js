import React from 'react'
import './InscriSteps.css'
import { Steps, message, Button} from 'antd';
import FirstStep from '../firstStep/FirstStep';
import SecondStep from '../firstStep/SecondStep';
import LastStep from '../firstStep/LastStep';
import 'antd/dist/antd.css';
import axios from "../../../http-common";
const { Step } = Steps;

const steps = [
    {
      title: 'First',
      content: <FirstStep/>,
    },
    {
      title: 'Second',
      content: <SecondStep/>,
    },
    {
      title: 'Last',
      content: <LastStep/>,
    },
  ];
function InscriSteps() {
  function handleSubmit(event)  {
    event.preventDefault();
    let name=    localStorage.getItem('name');
    let password=    localStorage.getItem('password');
    let ncin=    localStorage.getItem('ncin');
    let email=    localStorage.getItem('email');
    let nmobile=    localStorage.getItem('nmobile');
    let date=    localStorage.getItem('date');
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa")
    const rendervous=new Date().toLocaleString() + "";
   
    axios
      .post("/inscription", { name,email,date,ncin,nmobile,password })
      .then((result) => {
        console.log(result);

        return result;
      })

      .catch(function (error) {
        console.log(error);
      });
  
  };
    const [current, setCurrent] = React.useState(0);
    const next = () => {
        setCurrent(current + 1);
      };
    const prev = () => {
        setCurrent(current - 1);
      };
    return (
        <div className="firstStep">
            <div className="form1">
             
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                  {current < steps.length - 1 && (
                    <Button className="suivant" onClick={() => next()}>
                      Suivant
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button className="suivant" type='button' onClick={handleSubmit}>
                      Enregistrer
                    </Button>
                  )}
                  {current > 0 && (
                    <Button style={{ margin: '0 8px' }} className="suivant" onClick={() => prev()}>
                      Précedant
                    </Button>
                  )}
                </div>
                
                <Steps progressDot size="small" current={current} className="steps">
                    {steps.map(item => (
                    <Step key={item.title} />
                    ))}
                </Steps>

            </div>
            
            <img src="/presc.png" alt="inscription" className="img"/>
            
        </div>
    )
}

export default InscriSteps
