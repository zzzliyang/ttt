import React from 'react';
import { Table, Badge, Tag, Button, Modal } from 'antd';
import ContactGraph from './ContactGraph';

const data = [];
for (let i = 0; i < 3; ++i) {
data.push({
    key: i,
    name: 'Zhang Yang',
    phone: 98765432,
    email: 'test@nus.edu',
    status: 'Suspected',
});
}
for (let i = 4; i < 7; ++i) {
data.push({
    key: i,
    name: 'Zhang Yang',
    phone: 98765432,
    email: 'test@nus.edu',
    status: 'Healthy',
});
}

class UserTable extends React.Component {

    state = {
        visible: false,
        loading: false
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };

    

  
    render() {
          const expandedRowRender = () => {
            const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Temperature', dataIndex: 'temperature', key: 'temperature' },
            {
                title: 'Fever',
                key: 'fever',
                render: (v) => {
                    if (v.temperature < 37) {
                        return (<span>
                            <Badge status="success" />
                            Normal
                        </span>)
                    } else if (v.temperature < 38) {
                        return (<span>
                            <Badge status="warning" />
                            Low Fever
                        </span>)
                    } else {
                        return (<span>
                            <Badge status="error" />
                            High Fever
                        </span>)
                    }
                },
            },
            { title: 'Coughing', dataIndex: 'cough', key: 'cough' },
            ];
            const data = [];
            for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                temperature: 36.5 + i,
                cough: 'YES'
            });
            }
            return <Table columns={columns} dataSource={data} pagination={false} />;
        };
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Phone Number', dataIndex: 'phone', key: 'phone' },
            { title: 'Email Address', dataIndex: 'email', key: 'email' },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: status => {
                    let color = 'grey';
                    if (status === 'Confirmed') {
                      color = 'volcano';
                    } else if (status === 'Suspected') {
                      color = 'orange';
                    } else if (status === 'Healthy') {
                      color = 'green';
                    }
                    return (
                        <span>
                            <Tag color={color} key={status}>
                                {status}
                            </Tag>
                        </span>
                    );
                }
            },
            { 
                title: 'Action', 
                key: 'operation', 
                render: () => (<div>
                    <Button type="primary" onClick={this.showModal}>
                      Trace Contract
                    </Button>
                    <Modal
                      visible={this.state.visible}
                      title="Title"
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Return
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                          Submit
                        </Button>,
                      ]}
                    >
                      <ContactGraph/>
                    </Modal>
                  </div>)
            },
          ];
          return (
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandable={{expandedRowRender}}
              dataSource={data}
            />
          );
    }
}

export default UserTable;