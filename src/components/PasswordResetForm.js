import logo200Image from 'assets/img/logo/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, Alert, Spinner } from 'reactstrap';
import { resetPassword } from '../services/authService';
import {Link} from 'react-router-dom'

import {Formik} from 'formik';
import * as Yup from 'yup'



class PasswordResetForm extends React.Component {

  state = {
    errors: {},
    alertVisible: true,
    info:{},
    buttonDisabled:false
  };

  renderAlert=()=> {
    const {status,message,error} = this.state.info;
    return status ? <Alert color="success" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} >
      {message}
    </Alert>  : (error &&
      <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} >
        {error}
      </Alert>
    )
  };

  doSubmit = async (token,password) => {
    try {
      const {data} = await resetPassword(token,password);
      this.setState({info: data, alertVisible: true, buttonDisabled: true})
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.resetError = ex.response.data;
        this.setState({errors, alertVisible: true})
      }
    }
  };

  onDismissAlert = () => this.setState({alertVisible: false})


  render() {
    const {
      showLogo,
      confirmPasswordLabel,
      newPasswordLabel,
      confirmPasswordInputProps,
      newPasswordInputProps,
      children,
      onLogoClick,
      resetToken
    } = this.props;


    return (
      <Formik
        initialValues={{password:"",confirmPassword:""}}
        onSubmit={
          async (values,
                 {setSubmitting})=>{
            await this.doSubmit(resetToken,values.confirmPassword)
          }}

        validationSchema = {Yup.object().shape({
          password: Yup.string()
            .min(8, "Password too short")
            .required("Password is required")
            .matches(/(?=-*[0-9])/,"Password must contain a number"),
          confirmPassword: Yup.string()
            .min(8, "Password too short")
            .required("Confirm Password is required"),
        })}

        validate={(values,errors) => {
          const {password,confirmPassword} = values

          if (password !== confirmPassword){
            return {...errors, confirmPassword:"Passwords do not match"}
          }
        }}
      >
        {props=>{
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            handleBlur,
            handleSubmit
          } = props
          return (
            <Form onSubmit={handleSubmit}>
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
              {/*Alert Message*/}
              {this.renderAlert()}
              {/*Loader*/}
              {(isSubmitting && <center><Spinner style={{ width: '3rem', height: '3rem' , color: 'red'}} type="grow" /></center>)}
              <FormGroup>
                <Label for={newPasswordLabel}>{newPasswordLabel}</Label>
                <Input {...newPasswordInputProps}
                       value={values.password}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       style={errors.password&&inputErrorStyle}
                />
                {errors.password && touched.password && (<div style={textError} >
                  {errors.password}</div>)}
              </FormGroup>
              <FormGroup>
                <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                <Input {...confirmPasswordInputProps}
                       value={values.confirmPassword}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       style={errors.confirmPassword && touched.confirmPassword && inputErrorStyle}
                />
                {errors.confirmPassword && touched.confirmPassword &&
                (<div style={textError} >
                  {errors.confirmPassword} </div>)}
              </FormGroup>
              <hr />
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={handleSubmit}
                disabled={isSubmitting || this.state.buttonDisabled}
              >
                RESET PASSWORD
              </Button>

              <div className="text-center pt-1">
                <h6>or</h6>
                <h6>
                  <Link to='/login' >
                    Login
                  </Link>

                </h6>
              </div>
              {children}
            </Form>)
        }}
      </Formik>)
  }
}


PasswordResetForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
}

PasswordResetForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
    name:'confirmPassword'
  },
  newPasswordLabel: 'New Password',
  newPasswordInputProps: {
    type: 'password',
    placeholder: 'your new password',
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


export default PasswordResetForm;
