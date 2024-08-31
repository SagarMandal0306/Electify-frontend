import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { inject,  Injectable } from "@angular/core";
import { User } from "../Models/User";
import { Authorization } from "./Authorization.Service";
import { Observable } from "rxjs";
import { UserInfo } from "../Models/Users";



@Injectable({
    providedIn:'root'
})
export class ApiService {
    baseUrl:string='http://localhost:5069/api/Vote/';
    httpClient:HttpClient= inject(HttpClient);
    authorization:Authorization=inject(Authorization);
    token:string=''
    headers:any=undefined;


  private initializeHeaders() {
    if(this.authorization.checkCookies('token')){
                this.token=this.authorization.getCookies('token');
                 this.headers=new HttpHeaders().set("Authorization",`Bearer ${this.token} `);
                 return this.headers;
            }
          
   }

    signup(user:User){
        return this.httpClient.post(this.baseUrl+'signup',user);
    }

    login(username:any,password:any){
        return this.httpClient.get(this.baseUrl+`login?username=${username}&password=${password}`);
    }

    getRooms():Observable<any>{
       const headers=this.initializeHeaders();
        return this.httpClient.get<any>(this.baseUrl+'show/rooms',{headers})
    }

   

    getUser(){
        const headers=this.initializeHeaders();
        return this.httpClient.get(this.baseUrl+'getuser',{headers});
    }
}