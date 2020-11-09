import AuthForm from 'components/AuthForm';

import React from 'react';

import AuthLayout from '../components/Layout/AuthLayout';
import { isLoggedIn } from '../services/authService';


class LoginPage extends React.Component {

  state ={
    isLoggedIn
  }


  handleLogoClick = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    if(isLoggedIn){
      window.location = "/"
    }
  }

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
