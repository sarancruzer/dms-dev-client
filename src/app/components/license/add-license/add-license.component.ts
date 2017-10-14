import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css']
})
export class AddLicenseComponent implements OnInit {

  license:any= [];

  constructor(private router:Router) { }

  ngOnInit() {
  }

  createLicense(){
    this.router.navigate(['/manageLicense']);
  }

}
