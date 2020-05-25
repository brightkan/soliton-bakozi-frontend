import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import bgImage from 'assets/img/bg/solitonbg.png';

const AuthLayout = ({ children, ...restProps }) => (
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
        {children}
      </Card>
    </Col>
  </Row>
);

export default AuthLayout;
