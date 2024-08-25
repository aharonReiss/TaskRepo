import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import authService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';

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
    fullName: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    telephone: Yup.string()
        .required('Telephone is required')
        .matches(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'telephone worng')
});

const RegisterContainer: React.FC = () => {
    const navigate = useNavigate();
  const initialValues = {
    fullName: '',
    email: '',
    telephone: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    // Handle form submission here (e.g., API call)
    const res = await authService.register(values.fullName,values.telephone,values.email,values.password);
    if(res){
        navigate('/login')
    }
  };

  return (
    <FormContainer>
      <h2>User Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <FormGroup>
              <Label htmlFor="fullName">FullName</Label>
              <Input type="text" id="fullName" name="fullName" />
              <ErrorMessage name="fullName" component={Error} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" />
              <ErrorMessage name="email" component={Error} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="telephone">Telephone</Label>
              <Input type="string" id="telephone" name="telephone" />
              <ErrorMessage name="telephone" component={Error} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" />
              <ErrorMessage name="password" component={Error} />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </SubmitButton>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
};

export default RegisterContainer;