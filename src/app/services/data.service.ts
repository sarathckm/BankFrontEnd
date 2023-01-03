import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
//global http header ob ject
const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

 
  constructor(private http:HttpClient)
   { }



  //get data from local storage

  
  //register
  register(acno:any,username:any,password:any){
    //req body
    const data={
      acno,
      username,
      password
    }
    //register API
    return this.http.post('http://localhost:3000/register',data)
  }
   //login
   login(acno:any,pswd:any) {
    //req body
    const data={
      acno,
      pswd
    }
    //register API
    return this.http.post('http://localhost:3000/login',data)
  }
   //to get request header with token
   getToken(){
    //fetch the token from local storage
    const token=JSON.parse(localStorage.getItem('token') || '')
    //generate request header-HttpHeader
    let headers=new HttpHeaders()
    //append token inside header
    if(token){
      headers=headers.append('x-access-token',token)
      //impliment overloading
    options.headers=headers
  }
    return options
   
}

   //deposit

   deposit(acno:any,pswd:any,amt:any){
    //req body
    const data={
      acno,
      pswd,
      amt
    }
    // register API
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())

   }
   //withdraw

   withdraw(acno:any,pswd:any,amt:any){
      //req body
      const data={
        acno,
        pswd,
        amt
      }
      // register API
      return this.http.post(
        'http://localhost:3000/withdraw',data,this.getToken())
  
     }
   

 //transcation

 getTranscation(acno:any){
 
  //req body
  const data={
    acno
  }
  // transaction API
  return this.http.post(
    'http://localhost:3000/transaction',data,this.getToken())

 }
 //deleteAcc api
deleteAcc(acno:any){
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}

}

