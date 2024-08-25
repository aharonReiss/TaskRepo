class TaskAppStorage {
    saveUser(user:string){
        localStorage.setItem('user',user);
    }
    getUser(){
        return localStorage.getItem('user');
    }
    saveToken(token:string){
        localStorage.setItem('token',token);
    }
    getToken(){
        const token = localStorage.getItem('token');
        return token;
    }
    deleteToken(){
        localStorage.removeItem('token');
    }
    deleteUser(){
        localStorage.removeItem('user');
    }
}

export default new TaskAppStorage();