import React from 'react';
import PasswordResetForm from '../components/PasswordResetForm'
import AuthLayout from '../components/Layout/AuthLayout';


class PasswordResetPage extends React.Component {


  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <AuthLayout>
        <PasswordResetForm
          authState={this.props.authState}
          onChangeAuthState={this.handleAuthState}
          onLogoClick={this.handleLogoClick}
        />
      </AuthLayout>
    );
  }
}

export default PasswordResetPage;
