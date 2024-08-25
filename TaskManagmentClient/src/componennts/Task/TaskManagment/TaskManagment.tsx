import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import taskService from '../../../services/TaskService';
import { TaskData } from '../../../types/TaskData';
import { taskStore } from '../../../stores/TaskStore';


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
    description: Yup.string()
        .required('Title is required'),
    title: Yup.string()
        .required('Title is required'),
    dueDate: Yup.date()
        .min(new Date(), 'Date must be in the future')
        .required('Date is required'),
    priority: Yup.number()
        .required('priority is required'),
});

const TaskManagment: React.FC = observer(() => {
    useEffect(() => {
        taskStore.showHeader = true;
    },[])
    const navigate = useNavigate();
    const initialValues = {
        priority: taskStore.isUpdateMode ? taskStore.taskToUpdate?.priority : 0,
        dueDate: taskStore.isUpdateMode ? taskStore.taskToUpdate?.dueDate.toString() : Date.now.toString(),
        description: taskStore.isUpdateMode ? taskStore.taskToUpdate?.description : '',
        title: taskStore.isUpdateMode ? taskStore.taskToUpdate?.title : '',
    };

    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {  
        let task: TaskData = {
            description: values.description,
            dueDate: values.dueDate,
            id: taskStore.taskToUpdate.id,
            priority: values.priority,
            title: values.title
        }
        if(taskStore.isUpdateMode){
            const res = await taskService.updateTask(task);
            if (res) {
                taskStore.isUpdateMode = false;
                navigate('/homePage')
            }
        }
        else{
            const res = await taskService.addTask(task);
            if (res) {
                navigate('/homePage')
            }
        }
    };

    return (
        <FormContainer>
            <h2>{taskStore.isUpdateMode ? 'Update Task' : 'Add Task'}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <StyledForm>
                        <FormGroup>
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" id="title" name="title" />
                            <ErrorMessage name="title" component={Error} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" id="description" name="description" />
                            <ErrorMessage name="description" component={Error} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input type="datetime-local" id="dueDate" name="dueDate" />
                            <ErrorMessage name="dueDate" component={Error} />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="priority">Priority</Label>
                            <Input type="number" id="priority" name="priority" />
                            <ErrorMessage name="priority" component={Error} />
                        </FormGroup>

                        <SubmitButton type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'InProcess...' : taskStore.isUpdateMode ? 'Update' : 'Add'}
                        </SubmitButton>
                    </StyledForm>
                )}
            </Formik>
        </FormContainer>
    );
});

export default TaskManagment;