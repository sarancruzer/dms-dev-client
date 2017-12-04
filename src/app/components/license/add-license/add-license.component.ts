import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { LicenseService } from './../../../_service/license.service';
import { License } from 'app/_model/license';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IsuccessError } from 'app/_interface/isuccess-error.model';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css'],
  providers:[LicenseService]
})
export class AddLicenseComponent implements OnInit {

  license:any= [];

  model = new License();
  iSuccessError:IsuccessError;

  states : any = [];
  territorys : any = [];
  constructor(private _router:Router,private _service : LicenseService,private toastrService : ToastrService,private _commonService : CommonService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
    this.getMasterData();
  }
    
  getMasterData(){
  let params = ['m_state','m_territory'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.states = res['result']['info']['m_state'];
          this.territorys = res['result']['info']['m_territory'];
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

 submit(form){    
      if(form.valid){
      this._service.add(this.model).subscribe(     
        (res) => {
              this.iSuccessError.mSuccess = res['result']['info']['msg'];
              this.toastrService.success(this.iSuccessError.mSuccess, 'Success!');
                this._router.navigate(['/manageLicense']);
              
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    }
    
      }

}
