import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DirectorateType } from '../types/Directorate';
import {RoleType} from '../types/Roles';
import { UserType } from '../types/UserType';
import { ReqApp } from '../types/reqApp';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiServerUrl:String = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  //This method is api call that fetch all roles 
    public getRoles():Observable<RoleType[]>{
        return this.http.get<RoleType[]>(`${this.apiServerUrl}/User/getRoles`);
    }
    //This method is api call that fetch all roles 
    public getDirectorate():Observable<DirectorateType[]>{
          return this.http.get<DirectorateType[]>(`${this.apiServerUrl}/User/getDirectorates`);
    }
    //Service that will do add the new user
    public addUser(user:UserType):Observable<UserType>{
      user.createdBy = ""+sessionStorage.getItem("username");
      return this.http.post<UserType>(`${this.apiServerUrl}/User/add`,user);
    }
    //Service that will do listing all the user
    public getUsers():Observable<UserType[]>{
      return this.http.get<UserType[]>(`${this.apiServerUrl}/User/all`);
   }
   public updateUser(user:UserType):Observable<UserType>{
    return this.http.put<UserType>(`${this.apiServerUrl}/User/update`,user);
   }

   public deactivateUser(user:UserType):Observable<UserType>{
    return this.http.put<UserType>(`${this.apiServerUrl}/User/deactivate`, user);
   }
   //This method will check if the username already exist 
   public isUsernameExist(username:string):Observable<boolean>{
    return this.http.get<boolean>(`${this.apiServerUrl}/User/userExist/${username}`);
   }
   //This method uses to get the number of users in the system 
   public getNoOfUsers():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/User/noOfUsers`);
   }
   //active users in number
   public  getNoActiveOfUsers():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/User/noActiveOfUsers`);
   }
      //active users in number
   public  getNoLockedOfUsers():Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/User/noLockedOfUsers`);
   }
   //This method used to clear user from the system
   public clearUser(username:string):Observable<any>{
    return this.http.get<boolean>(`${this.apiServerUrl}/User/clearUser/${username}`);
   }

       //Service that will do listing all the requester
       public getRequesters():Observable<UserType[]>{
        return this.http.get<UserType[]>(`${this.apiServerUrl}/User/requesters`);
     }
         //Service that will do listing all the authorizers
    public getAuthorizers():Observable<UserType[]>{
      return this.http.get<UserType[]>(`${this.apiServerUrl}/User/authorizers`);
   }

   addMapping(value: ReqApp):Observable<ReqApp> {
    return this.http.post<ReqApp>(`${this.apiServerUrl}/User/mapReqApp`, value);
  }
}
