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
import { DownloadOutlined } from '@ant-design/icons';
import './prism.css';


const { Paragraph } = Typography;
const { Header, Content, Footer} = Layout;

 
const code = `for i in range(2):
  print("Yeah")
`;
const url = `http://10.104.0.147:8000/v1/execute`;

  class App extends React.Component {
    state = { code, compiler: 'python', response: '' };
  
    handleSubmitCode = async () => {
      try {
        const response = await axios.post(url, this.state);
        this.setState({ response: response.data });
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
      <div className="site-layout-background" style={{ padding: 24, minHeight: '100vh' }}>
        <Row>

          <Col span={12} ><div style={{margin: '20px'}}>
    <Paragraph ellipsis>
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
      Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
      a design language for background applications, is refined by Ant UED Team. Ant Design, a
      design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team.
    </Paragraph>

    <Paragraph ellipsis={{ rows: 3, expandable: true }}>
      Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
      Design, a design language for background applications, is refined by Ant UED Team. Ant Design,
      a design language for background applications, is refined by Ant UED Team. Ant Design, a
      design language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team. Ant Design, a design
      language for background applications, is refined by Ant UED Team.
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
            }}
          />
          <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
          Run Code
        </Button>
          {/* <button onClick={this.handleSubmitCode}>Run Code</button> */}
        </div>
              </Col>
              <Col span={24}></Col>
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
