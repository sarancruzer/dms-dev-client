import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { ClientService } from 'app/_service/client.service';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Client } from 'app/_model/client';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
  providers:[ClientService]
})
export class EditClientComponent implements OnInit {
  
 model = new Client();
  iSuccessError:IsuccessError;
  states : any = [];
  client_types : any = [];
  client_sizes : any = [];
  manage_licenses : any = [];
  id:number;
  
  constructor(private _router:Router,private _service : ClientService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute) {
    
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
  let params = ['m_state','m_client_type','m_client_size','license'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.states = res['result']['info']['m_state'];
          this.client_types = res['result']['info']['m_client_type'];
          this.client_sizes = res['result']['info']['m_client_size'];
          this.manage_licenses = res['result']['info']['license'];
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
                this._router.navigate(['/manageClient']);
              
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    }
    
      }

  
}
