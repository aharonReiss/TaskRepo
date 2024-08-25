import React, { useEffect } from "react"
import { observer } from "mobx-react-lite";
import './TaskDetailsMobile.css'
import { taskStore } from "../../../stores/TaskStore";
import { TaskData } from "../../../types/TaskData";
import taskService from "../../../services/TaskService";
import { useNavigate } from "react-router-dom";
const TaskDetailsMobile = observer(() => {
    const navigate = useNavigate();
    const taskData = taskStore.taskData;
    const deleteTask = async (id:number) => {
        const response = await taskService.deketeTask(id);
        debugger;
        if(response){
            await taskService.getTasksList();
        }
    }
    const updateTask = (item: TaskData) => {
        taskStore.taskToUpdate = item;
        taskStore.isUpdateMode = true;
        navigate('/manage-task')
    }
    return (
         <div className="task-list-mobile-container">
            <div className="task-info-header">
                <h2>Tasks Info</h2>
            </div>
            {taskData && taskData.map((item: TaskData, i) => {
                return (<div className="task-container-mobile">
                         <div className="task-detail-container">
                            <div className="task-detail">
                                <div className="task-info">Title:</div>
                                <div className="margin-right">{item.title}</div>
                                
                            </div>
                            <div className="task-detail">
                                <div className="task-info">Description:</div>
                                <div className="margin-right">{item.description}</div>
                                
                            </div>
                            <div className="task-detail">
                                <div className="task-info">Due Date:</div>
                                <div className="margin-right">{item.dueDate.toString()}</div>
                            </div>
                            <div className="task-detail">
                                <div className="task-info">Priority:</div>
                                <div className="margin-right">{item.priority}</div>
                            </div>
                            <div className="buttons-container-mobile">
                                <div className="task-button button-add" onClick={() => {updateTask(item)}}>Update</div>
                                <div className="task-button button-remove" onClick={() => {deleteTask(item.id)}}>Remove</div>
                            </div>
                            </div>
                </div>)
            })}
         </div>
    )
})

export default TaskDetailsMobile;