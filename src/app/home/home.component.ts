import { CommonModule } from '@angular/common';
import { Component,ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as Minidenticon from 'minidenticons';
import { Authorization } from '../Service/Authorization.Service';
import { Router } from '@angular/router';
import { ApiService } from '../Service/api.service';
import { forkJoin } from 'rxjs';
import { response } from 'express';
import { error } from 'console';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  roomid:number=0
  loaderDis: boolean = false;
  contentDis: boolean = true;
  cookieService:Authorization=inject(Authorization);
  route:Router=inject(Router)
  exist:boolean=this.cookieService.checkCookies('token');
  api:ApiService=inject(ApiService);
  rooms:any[]=[];
  totalUser:number=0;
  user:any=undefined;
  model={
          username:'',
          roomid:''
  }
  constructor(){
    if(!this.exist){
      this.route.navigate(["/login"]);
    }
    
  }

  ngOnInit(): void {
   
    this.loaderDis = true;
    this.contentDis = false;

    forkJoin({
      getrooms: this.api.getRooms(),
      getuser:this.api.getUser()
    }).subscribe(
        {
          next:(res:any)=>{
          this.rooms=res.getrooms;
          this.user=res.getuser;
          this.model.username=this.user.username
          },
          error:(error)=>{
            console.log(error);
            this.loaderDis = false;
            this.contentDis = true;
          },
          complete:()=>{
          this.loaderDis = false;
          this.contentDis = true;
          }
        });
  
      

  }
  

  joinRoom:boolean=false;
 

  svggenarator(name:any){
    const svguri=Minidenticon.minidenticon(name,95,50)
    const identiconUrl = this.convertSvgToDataUrl(svguri);
    return identiconUrl;
  }
  convertSvgToDataUrl(svg: string): string {
    const base64Svg = btoa(svg); // Convert SVG string to base64
    return `data:image/svg+xml;base64,${base64Svg}`;
  }


  formForJoinRoom(roomid:any){
    this.joinRoom=true;
    this.roomid=roomid;
  }

  closeForm(){
    this.joinRoom=false;
  }

  submitForm(event:NgForm){
    if(event.value.roomid==this.roomid){
      console.log("You Are Joined");
    }else{
      console.log("Roomid Is MissMatch");
    }
  }




}
