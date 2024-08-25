import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import authService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../../stores/UserStore';
import './LoginContainer.css'

const FormContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 10px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Error = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, 'mail worng'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const LoginForm: React.FC = () => {
 const navigate = useNavigate();
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async(values: typeof initialValues, { setSubmitting }: any) => {
    const res = await authService.loginWithUserNameAndPassword(values.username,values.password);
    if(res){
        navigate('/homePage')
    }
  };
  return (
    <>
    <FormContainer>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" name="username" />
              <ErrorMessage name="username" component={Error} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" />
              <ErrorMessage name="password" component={Error} />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'InProcess...' : 'Login'}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
    <div className='for-register' onClick={() => navigate('/register')}>for register click here</div>
    </>
  );
};

export default LoginForm;