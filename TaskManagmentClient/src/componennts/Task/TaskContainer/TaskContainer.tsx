import React, { useEffect, useState } from "react"
import authService from "../../../services/AuthService";
import { observer } from 'mobx-react';
import UserDetails from "../UserDetails/UserDetails";
import { UserData } from "../../../types/UserData";
import { userStore } from "../../../stores/UserStore";
import './TaskContainer.css'
import TaskDetails from "../TaskDetails/TaskDetails";
import taskService from "../../../services/TaskService";
import TaskDetailsMobile from "../TaskDetails/TaskDetailsMobile";
import { taskStore } from "../../../stores/TaskStore";
const TaskContainer = observer(() => {
    useEffect(() => {
        taskStore.showHeader = true;
    },[])
    const [width, setWidth] = useState<number>(window.innerWidth);
    async function fetchMyAPI() {
        let response = await authService.getCurrenUser();
        let user: UserData = {
            emailAdress: response.emailAdress,
            fullName: response.fullName,
            telephone: response.telephone,
            isLoggedIn: true
        }
        userStore.setUser(user);
        await taskService.getTasksList();
    }
    fetchMyAPI()
    return (
        <>
            <div className="task-container">
                <UserDetails />
                {
                    width >= 768 ? <TaskDetails /> : <TaskDetailsMobile />
                }
            </div>
        </>
    )
})


export default TaskContainer;