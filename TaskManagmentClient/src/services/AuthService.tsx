import TaskAppStorage from "../utils/TaskAppStorage";
import BaseHTTPService from "./BaseHTTPService";

class AuthService extends BaseHTTPService{
    loginWithUserNameAndPassword(email:string,password:string){
        const body = {
            emailAdress: email,
            password: password
        }
        return this.httpPost('/api/user/login',body).then((responce) => {
            if(responce?.data){
                TaskAppStorage.saveToken(responce?.data)
            }
            return responce?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    register(fullName:string,telephone:string,emailAdress:string,password:string){
        const body = {
            emailAdress: emailAdress,
            password: password,
            fullName: fullName,
            telephone: telephone
        }
        return this.httpPost('/api/user/registration',body).then((responce) => {
            return responce?.data;
        }).catch((ex) => {
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    getCurrenUser(){
        const token = TaskAppStorage.getToken();
        const header = this.getTokenAsHeader(token ?? '');
        return this.httpGet('/api/user/getCurrentUser',header).then((response) => {
            return response?.data;
        }).catch((ex) => {
            console.log(ex)
            if(ex?.response?.status == '400'){
                alert(ex?.response?.data)
            }
        })
    }
    isLoggedIn()
    {
        debugger
        const token = TaskAppStorage.getToken();
        if(token){
            return true;
        }
        return false;
    }
}
const authService = new AuthService()
export default authService;