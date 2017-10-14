import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.css']
})
export class EditLicenseComponent implements OnInit {
  license : any = [];
  constructor(private router : Router) { }

  ngOnInit() {
  }

  updateLicense(){
    this.router.navigate(['/manageLicense']);
  }
}
