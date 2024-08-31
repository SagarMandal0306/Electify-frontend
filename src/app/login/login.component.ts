import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../Service/api.service';
import { Authorization } from '../Service/Authorization.Service';


@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loaderDis: boolean = false;
  contentDis: boolean = true;
  api: ApiService = inject(ApiService)
  router: Router = inject(Router);
  authorization:Authorization=inject(Authorization);
  exist:boolean=this.authorization.checkCookies('token');
  constructor(){
    if(this.exist){
      this.router.navigate([""]);
    }
  }
  email:boolean=false;
  password:boolean=false;
  model: any = {
    username: '',
    password: ''
  }


  onFormSubmit() {
    this.loaderDis = true;
    this.contentDis = false;
    this.api.login(this.model.username, this.model.password).subscribe({
      next: (res:any) => {
        if(res.status=="success"){

          this.authorization.setCookies(res.token,"token");
        }
      },
      error: (err) => {
        this.loaderDis = false;
        this.contentDis = true;
        if(err.error.email){
          this.email=true;
        }else if(err.error.password){
          this.password=true;
        }
      },
      complete: () => {
        
        this.loaderDis = false;
        this.contentDis = true;
          // alert("You Are Successfully Login");
          
          this.reset();
          this.router.navigate([""]);
        

      }
    })

  }

  reset(){
    this.email=false;
    this.password=false;
    this.model = {
      username: '',
      password: ''
    }
  }
}
