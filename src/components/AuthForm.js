import logo200Image from 'assets/img/logo/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label , Alert} from 'reactstrap';
import {login} from '../services/authService'
import {Link} from 'react-router-dom'

import {Formik} from 'formik';
import  * as Yup from 'yup'


class AuthForm extends React.Component {

  state = {
    errors: {},
    alertVisible: true
  }

  doSubmit = async (values) => {
    try {
      const { email, password } = values;
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
      <Formik
        initialValues={{email:"",password:""}}
        onSubmit={async (values,{setSubmitting}) =>{await this.doSubmit(values)}}
        validationSchema={ Yup.object().shape({
          email: Yup.string().email("Must be a valid email")
            .required("Email is required")
            .matches(/soliton.co.ug/, "Must be a valid soliton email"),
          password: Yup.string().required("Password is required")
            .min(8, "Password is too short - Should be 8 characters minimum")
        })}
      >
        {props =>{
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            handleBlur,
            handleSubmit
          } = props

          return (<Form onSubmit={handleSubmit}>
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
              <Alert color="danger" isOpen={this.state.alertVisible} ontoggle={this.onDismissAlert} >
                Invalid Credentials
              </Alert>
            )}
            <FormGroup>
              <Label for={emailLabel}>{emailLabel}</Label>
              <Input
                {...emailInputProps}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                style={errors.email&&inputErrorStyle}
              />
              {errors.email && touched.email && (<div style={textError} >
                {errors.email}
              </div>)}

            </FormGroup>
            <FormGroup>
              <Label for={passwordLabel}>{passwordLabel}</Label>
              <Input {...passwordInputProps}
                     value={values.password}
                     onBlur={handleBlur}
                     onChange={handleChange}
                     style={errors.password&&inputErrorStyle} />
              {errors.password && touched.password && (<div style={textError}>
                {errors.password}
              </div>)}

            </FormGroup>
            <hr />
            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              LOGIN
            </Button>

            <div className="text-center pt-1">
              <h6>or</h6>
              <h6>
                <Link to='/forgot_password' >
                  Forgot Password
                </Link>

              </h6>
            </div>
            {children}
          </Form>)
        }}

      </Formik>)
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

const inputErrorStyle = {
  borderColor: "red"
}
const textError = {
  color:"red"
}


export default AuthForm;
