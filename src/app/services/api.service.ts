import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  isChange=new BehaviorSubject<string>("")
  constructor(private http: HttpClient) { }

  postGame(data:any){
    return this.http.post<any>("http://localhost:3000/games/",data)
    
  }

  getGame(){
    return this.http.get<any>("http://localhost:3000/games/")
  }

  deleteGame(id:number){
    return this.http.delete<any>("http://localhost:3000/games/"+id);
  }


}
