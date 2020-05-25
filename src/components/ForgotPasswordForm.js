import logo200Image from 'assets/img/logo/logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label , Alert} from 'reactstrap';
import {submitEmailPasswordReset} from '../services/authService'
import {Link} from 'react-router-dom'

import {Spinner} from 'reactstrap'

import {Formik} from 'formik';
import * as Yup from 'yup'

class ForgotPasswordForm extends React.Component {

  state = {
    info: {},
    errors: {},
    alertVisible: true
  }


  renderAlert=()=> {
    const {status,message,error} = this.state.info
    return status ? <Alert color="info" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} >
      {message}
      </Alert>  : (error &&
      <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismissAlert} >
        {error}
      </Alert>
    )
  };


  doSubmit = async (email) => {
    try {
      const {data} = await submitEmailPasswordReset(email);
      this.setState({info: data, alertVisible: true})
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.submitError = ex.response.data;
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
      children,
      onLogoClick,
    } = this.props;


    return (
      <Formik
        initialValues={{email:""}}
        onSubmit={async (values,{setSubmitting})=>{await this.doSubmit(values.email)}}
        validationSchema={Yup.object().shape(
          {email: Yup.string().email("Must be a valid email")
              .required("Email field is required")
              .matches(/soliton.co.ug/, "Must be a valid soliton email")}
        )}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            isSubmitting,
            handleBlur,
            handleSubmit}= props

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
              {
                this.renderAlert()
              }
              {/*Loader*/}
              {(isSubmitting && <center><Spinner style={{ width: '3rem', height: '3rem' , color: 'red'}} type="grow" /></center>)}
              <FormGroup>
                <Label for={emailLabel}>{emailLabel}</Label>
                <Input {...emailInputProps}
                       value={values.email}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       style={errors.email&&inputErrorStyle}
                />
                {errors.email && touched.email && (<div style={textError} >
                  {errors.email}</div>)}
                <small>Submit Email to receive password reset link</small>
              </FormGroup>
              <hr />

              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={handleSubmit}
                disabled={isSubmitting}
              >

                SUBMIT EMAIL
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


ForgotPasswordForm.propTypes = {
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

ForgotPasswordForm.defaultProps = {
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
export default ForgotPasswordForm;

