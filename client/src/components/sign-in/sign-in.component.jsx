import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

import {
  SignInContainer,
  SignInTitle,
  ButtonsBarContainer,
} from './sign-in.styles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your e-mail and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          label='email'
          value={email}
          handleChange={handleChange}
          required
        />

        <FormInput
          name='password'
          type='password'
          label='password'
          value={password}
          handleChange={handleChange}
          required
        />

        <ButtonsBarContainer>
          <CustomButton type='submit'> Sign In </CustomButton>

          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            {' '}
            Sign in with Google{' '}
          </CustomButton>
        </ButtonsBarContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
