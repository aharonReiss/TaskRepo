import React, { useEffect } from "react"
import { observer } from "mobx-react-lite";
import './TaskDetails.css'
import { taskStore } from "../../../stores/TaskStore";
import { TaskData } from "../../../types/TaskData";
import taskService from "../../../services/TaskService";
import { useNavigate } from "react-router-dom";
const TaskDetails = observer(() => {
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
         <div className="task-details-container">
            <div className="task-info-header">
                <h2>Tasks Info</h2>
            </div>
            {taskData &&
                <div className="task-list">
                        <>
                        <div className="task-element tast-header">
                            <div>Title</div>
                            <div>Description</div>
                            <div>Due Date </div>
                            <div>Priority</div>
                        </div>
                        {taskData.map((item: TaskData, i) => {
                            return <div className="task-element">
                                <div>{item.title}</div>
                                <div>{item.description}</div>
                                <div>{item.dueDate.toString()}</div>
                                <div>{item.priority}</div>
                                <div><div className="task-button button-add" onClick={() => {updateTask(item)}}>Update</div></div>
                                <div className="task-button button-remove" onClick={() => {deleteTask(item.id)}}>Remove</div>
                            </div>
                        })}</>
                </div>}
        </div>
    )
})

export default TaskDetails;