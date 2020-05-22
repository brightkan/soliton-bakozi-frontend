import logo200Image from 'assets/img/logo/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label , Alert} from 'reactstrap';
import {login} from '../services/authService'

import SimpleReactValidator from 'simple-react-validator';

class AuthForm extends React.Component {

  state = {
    account: {
      email: "",
      password: ""
    },
    errors: {},
    alertVisible: true
  }



  componentWillMount() {
    this.validator = new SimpleReactValidator({
      messages: {
        email: 'That is not a valid soliton email.'
      }})
  }


  handleSubmit = async event => {
    event.preventDefault();
    await this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    const { name, value } = input;
    account[name] = value;
    this.setState({ account });
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.account;
      const {data} = await login(email, password);
      const { access } = data;
      localStorage.setItem("token", access);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.loginError = ex.response.data;
        this.setState({errors, alertVisible: true})
      }
    }
  };

  onDismissAlert = () => this.setState({alertVisible: false})


  render() {
    const {
      showLogo,
      emailLabel,
      emailInputProps,
      passwordLabel,
      passwordInputProps,
      children,
      onLogoClick,
    } = this.props;

    const { loginError } = this.state.errors;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          {showLogo && (
            <div className="text-center pb-4">
              <img
                src={logo200Image}
                className="rounded"
                style={{ width: 200, height: 200, cursor: 'pointer' }}
                alt="logo"
                onClick={onLogoClick}
              />
              <h3>Soliton Bakozi</h3>
            </div>
          )}
          {loginError && (
            <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} >
              Invalid Credentials
            </Alert>
          )}
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input {...emailInputProps} value={this.state.email} onChange={this.handleChange} onBlur={() => this.validator.showMessageFor('email')}/>

          </FormGroup>
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input {...passwordInputProps} value={this.state.password} onChange={this.handleChange} />

          </FormGroup>
          <hr />
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0"
            block
            onClick={this.handleSubmit}
          >
            LOGIN
          </Button>

          <div className="text-center pt-1">
            <h6>or</h6>
            <h6>
              <a href="#login" >
                Forgot Password
              </a>

            </h6>
          </div>
          {children}
        </Form>
      </>)
      ;
  }
}


AuthForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  emailLabel: 'Email',
  emailInputProps: {
    type: 'email',
    placeholder: 'your@soliton.co.ug',
    name:'email'
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
    name: 'password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
