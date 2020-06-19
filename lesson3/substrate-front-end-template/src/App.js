import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Sticky } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
import { DeveloperConsole } from './substrate-lib/components';

import AccountSelector from './AccountSelector';
import Balances from './Balances';
import BlockNumber from './BlockNumber';
import Events from './Events';
import Interactor from './Interactor';
import Metadata from './Metadata';
import NodeInfo from './NodeInfo';
import TemplateModule from './TemplateModule';
import PoeModule from './PoeModule';
import Transfer from './Transfer';
import Upgrade from './Upgrade';


//newADD
import './index.css'
import 'antd/dist/antd.css'
import { Row, Col } from 'antd';
import { Layout } from 'antd'
import Table from 'rc-table';

//upLoad 
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons'

//form
import { Form, Input, Checkbox } from 'antd';


//Layout
const { Header, Footer, Sider, Content } = Layout;

//table
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
    render: text => <a onClick={this.down} data-tip data-for="fileInfo"
      onMouseOver={this.detail} onMouseOut={this.outdetail}></a>
  },
  {
    title: 'Price',
    dataIndex: 'Price',
    key: 'Price',
  },
  {
    title: 'Uploader',
    dataIndex: 'Uploader',
    key: 'Uploader',
  },
  {
    title: 'TimeStamp',
    dataIndex: 'TimeStamp',
    key: 'TimeStamp',
  }
];

//upLoad
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//Form
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// const onFinish = values => {
//   console.log('Success:', values);
// };

// const onFinishFailed = errorInfo => {
//   console.log('Failed:', errorInfo);
// };




function Main() {
  const [accountAddress, setAccountAddress] = useState(null);
  const { apiState, keyring, keyringState } = useSubstrate();
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);

  const loader = text => (
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>
  );

  if (apiState === 'ERROR') return loader('Error connecting to the blockchain');
  else if (apiState !== 'READY') return loader('Connecting to the blockchain');

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    );
  }

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      {/* <Sticky context={contextRef}>
        <AccountSelector setAccountAddress={setAccountAddress} />
      </Sticky>
      <Container>
        <Grid stackable columns='equal'>
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer accountPair={accountPair} />
            <Upgrade accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row>
            <Interactor accountPair={accountPair} />
            <Events />
          </Grid.Row>
          <Grid.Row>
            <TemplateModule accountPair={accountPair} />
          </Grid.Row>
          <Grid.Row>
            <PoeModule accountPair={accountPair} />
          </Grid.Row>          
        </Grid>
        <DeveloperConsole />
      </Container> */}

      <Row>
        <Col span={12} id="mainLeft">
          <div id="fileList">
            <h1 id="filelist_title">fileList</h1>
            <Table dataSource />
          </div>
        </Col>
        <Col span={12} id="mainRight">
          <div id="upLoad">
            <h1 id="upload_title">upLoad</h1>
            
            <Form
              {...layout}
              name="message"
              // initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <div id="form">
              <Form.Item
                label="title"
                name="title"
                className="input"
                // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="price"
                name="price"
                className="input"
                // rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="detail"
                name="detail"
                className="input"
                // rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input />
              </Form.Item>
              
              <Upload {...props}>
                <Button >
                  <UploadOutlined />Click to Upload
                  </Button>
              </Upload>
              
              {/* <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
             </div>
             </Form>
           
            {/* <Upload {...props}>
              <Button >
                <UploadOutlined />Click to Upload
                </Button>
            </Upload> */}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
