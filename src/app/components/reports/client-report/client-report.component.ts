import { ReportService } from './../../../_service/report.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { IsuccessError } from 'app/_interface/isuccess-error.model';

import {saveAs as importedSaveAs} from "file-saver";


@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss'],
  providers:[ReportService]
})
export class ClientReportComponent implements OnInit {

  iSuccessError:IsuccessError;  
  
  constructor(private _router:Router,private _service : ReportService,private toastrService : ToastrService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
  this.getClientReport();   
  }
  
 getClientReport(){    
      this._service.getClientReport().subscribe(     
        (blob) => {
          console.log("REPORTS RES");
            console.log(blob);
              importedSaveAs(blob, "filename.pdf");
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
   } 

}
