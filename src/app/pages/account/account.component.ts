import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  hide: boolean = true;
  isError: boolean = false;


  ngOnInit(): void {
  }

  infoSubmit(form: any){

  }

  accountSubmit(form: any){
    
  }

}
