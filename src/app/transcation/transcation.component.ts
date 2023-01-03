import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  //to hold acno of current user 
  acno:any
  //to hold transcation array of current user
  transcations:any

  constructor(private ds:DataService) { 
    //get the value of current acno form localstorage
    this.acno=JSON.parse(localStorage.getItem('currentAcno') || '')
    //get transcation array from data service -asynchronous
   this.ds.getTranscation(this.acno)
    .subscribe(
      //2xx
      (result:any)=>{
          this.transcations=result.transcation
      }
    )
    
   }

  ngOnInit(): void {
  }

}
