import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim='your perfect banking partner'
  account='enter your acount here'
  acno=''
  pswd=''

  //login model
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })
  
//constructor
  constructor(private fb:FormBuilder,private router:Router,private ds:DataService) { }

  //ngOnInit 
  ngOnInit(): void {
  }


  //login
  login() {
   var acno=this.loginForm.value.acno
   var pswd=this.loginForm.value.pswd
    if(this.loginForm.valid){
      //login data service - asychronous
      this.ds.login(acno,pswd)
      .subscribe(
  (result:any)=>{
  //store all login userdetails in local storage
  localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
  localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
  localStorage.setItem('token',JSON.stringify(result.token))
  



    alert(result.message)
    this.router.navigateByUrl('dashboard')
  },
  result=>{
    alert(result.error.message)
  }
      )
}
else{
alert('invalid input')
}
  }
}