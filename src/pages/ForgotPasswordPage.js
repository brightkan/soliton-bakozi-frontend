import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import AuthLayout from '../components/Layout/AuthLayout';


class ForgotPasswordPage extends React.Component {


  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <AuthLayout>
        <ForgotPasswordForm
          authState={this.props.authState}
          onChangeAuthState={this.handleAuthState}
          onLogoClick={this.handleLogoClick}
        />
      </AuthLayout>
    );
  }
}

export default ForgotPasswordPage;
