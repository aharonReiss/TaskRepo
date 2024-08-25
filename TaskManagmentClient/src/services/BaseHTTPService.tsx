import { userStore } from "../stores/UserStore";
import TaskAppStorage from "../utils/TaskAppStorage";
import { AxiosHttp, IHttp } from "./HttpClient";

class BaseHTTPService{
    private http: IHttp;
    constructor()
    {
        this.http = new AxiosHttp();
    }  
    
    async httpGet(relativeUrl: string, headers? :any){
        try{
            return this.http.get(relativeUrl,headers)
            .then(async (res) => {
                return res;
            }).catch((ex) => {
                if(ex?.response?.status == 401){
                    TaskAppStorage.deleteToken();
                }
                throw ex;
            })
        }catch(ex: any){
            throw ex;
        }
    }

    async httpDelete(relativeUrl: string, headers? :any){
        try{
            return this.http.del(relativeUrl,undefined,headers)
            .then(async (res) => {
                return res;
            }).catch((ex) => {
                if(ex?.response?.status == 401){
                    TaskAppStorage.deleteToken();
                }
                throw ex;
            })
        }catch(ex:any){
            throw ex;
        }
    }

    async httpPost(relativeUrl: string,body?: object,headers? :any){
        try{
            return await this.http.post(relativeUrl,body,headers)
            .then(async (res) => {
                return res;
            }).catch((ex) => {
                if(ex?.response?.status == 401){
                    TaskAppStorage.deleteToken();
                }
                throw ex;
            })
        }catch(ex:any){
            throw ex;
        }
    }

    protected getTokenAsHeader(token: String) {
		return {
			Authorization: `Bearer ${token}`
		};
	}
}

export default BaseHTTPService;