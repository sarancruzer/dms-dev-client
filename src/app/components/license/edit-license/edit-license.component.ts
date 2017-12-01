import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { LicenseService } from './../../../_service/license.service';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { License } from './../../../_model/license';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-license',
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.css'],
  providers:[LicenseService]
})
export class EditLicenseComponent implements OnInit {
  model = new License();
  iSuccessError:IsuccessError;
  states: any = [];
  territorys : any = [];
  id:number;
  
  constructor(private _router:Router,private _service : LicenseService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }
   
    ngOnInit() {
      // get URL parameters
      this._route.params.subscribe(params => {
        this.id = params['id']; // --> Name must match wanted parameter
        console.log(this.id);
      });
      this.getMasterData();    
      this.getDetailsById(this.id);
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
  }) 
 }

getDetailsById(id) {
  this._service.edit(id).subscribe(     
    (res) => {
         this.model = res['result']['info']['lists'];
         console.log(res);
    },
  (err) => { 
     this.iSuccessError.mError = err;
     this.toastrService.error(err, 'Error!');
  }) 
}


 submit(form){    
      if(form.valid){
      this._service.update(this.model,1).subscribe(     
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
