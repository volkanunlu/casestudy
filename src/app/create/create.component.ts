import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  gameForm!:FormGroup;
  imageURL: string;
  constructor(private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private apiService:ApiService
    ) { 

      
    }


  ngOnInit(): void {
    this.gameForm=this.formBuilder.group({
      gameName: ['',Validators.required],
      bundle:['',Validators.pattern('/^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/')],
      //regex sample = ^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$   
      //rollic regex = /^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/
      owner:['',Validators.email],
      chooseFile:['',Validators.required]
    })

  
  }

  gameAddForm(){
    if(this.gameForm.valid){

      this.apiService.postGame(this.gameForm.value)
      .subscribe({
        next:(res)=>{

        },
        error:()=>{
        }
      })
      this.toastr.success('success', 'game created successfully!');

    }
  }

  showPreview(event:any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.gameForm.patchValue({
      chooseFile: file
    });
    this.gameForm.get('chooseFile').updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.gameForm.controls['chooseFile'].setValue(reader.result as string)
    }
    reader.readAsDataURL(file)
  }
  
 

}
