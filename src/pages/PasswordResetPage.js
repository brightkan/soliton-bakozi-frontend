import React from 'react';
import PasswordResetForm from '../components/PasswordResetForm'
import AuthLayout from '../components/Layout/AuthLayout';


class PasswordResetPage extends React.Component {


  handleLogoClick = () => {
    this.props.history.push('/');
  };


  render() {
    let {slug} = this.props.match.params;
    return (
      <AuthLayout>
        <PasswordResetForm
          authState={this.props.authState}
          onChangeAuthState={this.handleAuthState}
          onLogoClick={this.handleLogoClick}
          resetToken={slug}
        />
      </AuthLayout>
    );
  }
}

export default PasswordResetPage;
