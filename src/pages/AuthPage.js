import AuthForm from 'components/AuthForm';
import bgImage from 'assets/img/bg/solitonbg.png';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';


class AuthPage extends React.Component {


  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
