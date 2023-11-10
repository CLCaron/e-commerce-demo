import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  
  // FIXME: We need to redirect to the homepage after signing in. Currently, this is bugged and not working as intended.
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const { email, password } = userCredentials;

  const handleEmailSignInStart = (email, password) =>
    dispatch(emailSignInStart({ email, password }));
  const handleGoogleSignInStart = () => dispatch(googleSignInStart());

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    handleEmailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  // TODO: We should have an error for the user if their password is incorrect or if their email is not found.
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
            onClick={handleGoogleSignInStart}
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

export default SignIn;
