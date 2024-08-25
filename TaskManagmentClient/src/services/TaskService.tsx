import { taskStore } from "../stores/TaskStore";
import { TaskData } from "../types/TaskData";
import TaskAppStorage from "../utils/TaskAppStorage";
import BaseHTTPService from "./BaseHTTPService";

class TaskService extends BaseHTTPService{
    getTasksList(){
        const token = TaskAppStorage.getToken();
        const header = this.getTokenAsHeader(token ?? '');
        return this.httpGet('/api/task',header).then(async(response) => {
            let tasksArr : TaskData[] = []
            await response.data.forEach((element : any) => {
                let task : TaskData = {
                    description : element.description,
                    dueDate : element.dueDate,
                    id : element.id,
                    priority : element.priority,
                    title : element.title
                }
                tasksArr.push(task)
            });
            taskStore.setTask(tasksArr);
            return response?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    deketeTask(id : number){
        const token = TaskAppStorage.getToken();
        const header = this.getTokenAsHeader(token ?? '');
        return this.httpDelete(`/api/task/${id}`,header).then((response) => {
            return response?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    addTask(task : TaskData){
        const token = TaskAppStorage.getToken();
        const header = this.getTokenAsHeader(token ?? '');
        const body = {
            description: task.description,
            dueDate: task.dueDate,
            id: task.id,
            priority: task.priority,
            title: task.title,
        }
        return this.httpPost('/api/task/add',body,header).then((response) => {
            return response?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    updateTask(task : TaskData){
        const token = TaskAppStorage.getToken();
        const header = this.getTokenAsHeader(token ?? '');
        const body = {
            description: task.description,
            dueDate: task.dueDate,
            taskId: task.id,
            priority: task.priority,
            title: task.title,
        }
        debugger;
        return this.httpPost('/api/task/update',body,header).then((response) => {
            return response?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
}
const taskService = new TaskService()
export default taskService;