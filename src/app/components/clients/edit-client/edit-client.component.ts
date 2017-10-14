import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  client:any = [];

  constructor(private router:Router) { }

  ngOnInit() {
  }

  updateLicense(){
    this.router.navigate(['/manageLicense']);
  }

}
