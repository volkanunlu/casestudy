import { ToastrService } from 'ngx-toastr';
import { CreateComponent } from './../create/create.component';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  
  public gameList:[];
  imageURL:string;
  showPage:boolean=false;
  filteredString:string='';
  
  constructor(
    private api:ApiService,
    private toastr:ToastrService) 
    { }

  ngOnInit(): void {
      this.getAllGame();
  }
 

getAllGame(){
  this.api.getGame()
  .subscribe({
    next:(res)=>{
      this.gameList=res;
      console.log(this.gameList);
      if(this.gameList.length>0){
     
        this.showPage=true;
      }
      else{
        this.showPage=false;
      }
    },
    error:(err)=>{
    }     
  })
}

deleteGame(id:number){
  this.api.deleteGame(id)
  .subscribe({
    next:(res)=>{
      this.toastr.error('game deleted successfully!', 'Information');
      this.getAllGame();
     
    },
    
  })

}

}
