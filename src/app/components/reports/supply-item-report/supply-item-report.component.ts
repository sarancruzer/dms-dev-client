
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { ToastrService } from 'toastr-ng2';
import { ReportService } from './../../../_service/report.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {saveAs as importedSaveAs} from "file-saver";
import { CommonService } from 'app/_service/common.service';

@Component({
  selector: 'app-supply-item-report',
  templateUrl: './supply-item-report.component.html',
  styleUrls: ['./supply-item-report.component.scss'],
  providers:[ReportService,CommonService]
})
export class SupplyItemReportComponent implements OnInit {

  projects:any = [];
  projectId:number;
  iSuccessError:IsuccessError;  
  
  constructor(private _router:Router,private _service : ReportService,private toastrService : ToastrService,private _commonService:CommonService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
    this.getMasterData();   
  }

  getMasterData(){
    let params = ['project',];
    this._commonService.getMasterDetails(params).subscribe(     
      (res) => {
            this.projects = res['result']['info']['project'];
            console.log(res);
      },
    (err) => { 
        this.iSuccessError.mError = err;
        this.toastrService.error(err, 'Error!');
        if(err == 'token_expired'){
              this._router.navigate(['/logout']);
         }
    }) 
    }

  
  getSupplyItemReport(){    
    console.log(this.projectId);
      this._service.getSupplyItemReport(this.projectId).subscribe(     
        (blob) => {
          console.log("REPORTS RES");
            console.log(blob);
              importedSaveAs(blob, "ProjectDetailReport.pdf");
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
   } 

}9