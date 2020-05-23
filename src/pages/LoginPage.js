import AuthForm from 'components/AuthForm';

import React from 'react';

import AuthLayout from '../components/Layout/AuthLayout';


class LoginPage extends React.Component {


  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <AuthLayout>
        <AuthForm
          authState={this.props.authState}
          onChangeAuthState={this.handleAuthState}
          onLogoClick={this.handleLogoClick}
        />
      </AuthLayout>
    );
  }
}

export default LoginPage;
