import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import axios from 'axios';
import { Button, Radio } from 'antd';
import { SendOutlined, ReloadOutlined } from '@ant-design/icons';
import './prism.css';
const { Title } = Typography;


const { Paragraph } = Typography;
const { Header, Content, Footer} = Layout;

const testCases = [
  {input: '1\n2', output: '4'},
  {input: '2\n2\n5', output: '4\n25'},
  {input: '2\n1\n2', output: '1\n4'},
  {input: '3\n6\n7', output: '36\n49'},
];
 
const code = `for i in range(2):
  print("Yeah")
`;

const url = `http://192.168.43.18:8000/v1/submissions`;

// const url = `http://192.168.0.161:8080/v1/users/MhKnAfXT/3IVIR/execute`;

// const url = `http://192.168.43.18:8080/v1/users/MhKnAfXT/3IVIR/execute`;

  class App extends React.Component {
    state = { code, compiler: 'PYTHON3', response: '' };
  
    handleSubmitCode = async () => {
      try {
        const response = await axios.post(url, { code: this.state.code, compiler: this.state.compiler, stats: [{}]}, { headers: { Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTYWlmIiwiaWF0IjoxNTgzMTE2MDkwLCJleHAiOjE1ODM3MjA4OTB9.YP_CRff_ZxY9-So1VEcouwt9kLrkhc46qzvxPxf4oVYaBFiEwzTbKrgOzvMcm9xhPKpL5mDO0MxtvFMUqHeMCA`,
      'Api-Key': 'EnfkjSCHEX'}});
        this.setState({ response: response.data.stats[0].output });
        console.log(response);
      } catch(error) {
        console.log(error);
      }
    }

render(){
    return (
  <Layout>
    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
    <Content style={{ margin: '24px 16px 0' }}>
      <div className="site-layout-background" style={{  minHeight: '100vh' }}>
        <Row>

          <Col span={12} ><div style={{margin: '20px'}}>
    <Title>Find the squares</Title>
    <Paragraph style={{justifyContent: 'center'}}> 
      Print the squares of the numbers.
      The first line gives the number of queries n.
      Next n lines are whole numbers.
      Find the squares of all the numbers.
    </Paragraph>
  </div></Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
              <div>
          <Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.py)}
            padding={10}
            style={{
              border: '1px solid black',
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              backgroundColor: '#272822',
              height: '50vh',
              marginTop: 0
            }}
          />
        <Button type="primary" onClick={this.handleSubmitCode} icon={<SendOutlined />} size={'large'} style = {{marginTop: '20px'}}>
          Run Code
        </Button>
        <Button type="primary" icon={<ReloadOutlined />} size={'large'} style = {{marginTop: '20px', marginLeft: '20px'}}>
          Reset
        </Button>
          {/* <button onClick={this.handleSubmitCode}>Run Code</button> */}
        </div>
              </Col>
              <Col span={24}>
                <div style={{backgroundColor: 'rgba(255,255,255,0.8)', height: 200, width: '100%', marginTop: 20, padding: 16 }}>
                <pre>
                  {this.state.response && this.state.response}
                </pre>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}> </Footer>
  </Layout>
    );
          }
  }
  
export default App;
