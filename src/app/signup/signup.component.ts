import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../Service/api.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  api:ApiService=inject(ApiService)
  router:Router=inject(Router);
  loaderDis:boolean=false;
  contentDis:boolean=true
  validUserName:boolean=false;
  model:any={
    username:'',
    email:'',
    password:'',
    rpassword:''
  }
 

  onFormSubmit(){
    let user:User=new User();
    user.username=this.model.username;
    user.useremail=this.model.email;
    user.password=this.model.password;
   
    this.api.signup(user).subscribe({
      next:(res)=>{
        this.loaderDis=true;
        this.contentDis=false
      },
      error:(err)=>{
        console.log(err)
        this.validUserName=true
      },
      complete:()=>{
        setTimeout(() => {
          this.loaderDis=false;
          this.contentDis=true;
          alert("You Are Successfully Signup");
          this.reset();
          this.router.navigate(["/login"]);
        }, 1000);
        
      }
    })
  }

  reset(){
    this.model.username='';
    this.model.email='';
    this.model.password='';
    this.model.rpassword='';
  }
}
