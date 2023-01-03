import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dasgboard',
  templateUrl: './dasgboard.component.html',
  styleUrls: ['./dasgboard.component.css']
})
export class DasgboardComponent implements OnInit {

  

  // acno=''
  // pswd=''
  // amount=''

  // acno1=''
  // pswd1=''
  // amount1=''

    //login username
    user=''
    //deposit model
   depositForm=this.fb.group({
   
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

    //withdraw model
    withdrawForm=this.fb.group({
   
      acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
      pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
      amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],
  
    })
    //share to child
    
  
  acno: any;

  sDetails:any
  constructor(private fb:FormBuilder,private router:Router,private ds:DataService){
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser') || '')

    }
    this.sDetails=new Date()
  }
  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      
      
      alert('please login')
      this.router.navigateByUrl('')
    }

  }
 deposit(){
  var acno=this.depositForm.value.acno
  var pswd=this.depositForm.value.pswd
  var amount=this.depositForm.value.amount
  if(this.depositForm.valid){
    //calling deposit in data service -asynchronous
    this.ds.deposit(acno,pswd,amount)
    .subscribe(
      //response code:2xx
      (result:any)=>{
        alert(result.message)
      },
      //response code:4xx
      result=>{
        alert(result.error.message)
      }
    )
  
    }
 else{
  alert('invalid input')
  }
 }
 withdraw(){
  var acno=this.withdrawForm.value.acno1
  var pswd=this.withdrawForm.value.pswd1
  var amount=this.withdrawForm.value.amount1
  if(this.withdrawForm.valid){
    //asynchronous
    this.ds.withdraw(acno,pswd,amount)
    .subscribe(
      //response code:2xx
      (result:any)=>{
        alert(result.message)
      },
      //response code:4xx
      result=>{
        alert(result.error.message)
      }
    )
  
    }
 else{
  alert('invalid input')
  }
 }

 //logout
 logout(){
  //remove login acno and username
  localStorage.removeItem('currentAcno')
  localStorage.removeItem('currentUser')
  //navigate to login page
  this.router.navigateByUrl('')
 }

//deleteParent
deleteParent(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno') ||'')
  
}
onCancel(){
  this.acno=''
}
onDelete(event:any){
  this.ds.deleteAcc(event)
  .subscribe(
    //2xx
    (result:any)=>{
      alert(result.message)
      this.logout()
      this.router.navigateByUrl('')
    },
    //4xx
    result=>{
      alert(result.error.message)

    }
  )
}
}