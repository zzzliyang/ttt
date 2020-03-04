import React from 'react';
import { Steps, Button, message } from 'antd';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import '../css/FormSteps.css';

const { Step } = Steps;

const steps = [
  {
    title: 'Step 1',
    content: 'First-content',
  },
  {
    title: 'Step 2',
    content: 'Second-content',
  },
  {
    title: 'Step 3',
    content: 'Last-content',
  },
];

class FormSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const step = current==0 ? (<FormStep1/>) : current==1 ? (<FormStep2/>) : FormStep2;
    return (
      <div className="form-steps">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{step}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default FormSteps;