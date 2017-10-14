import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  signupFunc(){
    this.router.navigate(['/dashboard']);
    
  }

  backtoLoginFunc(){
    this.router.navigate(['/login']);
  }

}
