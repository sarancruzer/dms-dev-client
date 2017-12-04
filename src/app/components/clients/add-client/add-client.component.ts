import { ClientService } from './../../../_service/client.service';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { ToastrService } from 'toastr-ng2';
import { CommonService } from './../../../_service/common.service';
import { Client } from 'app/_model/client';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  providers:[ClientService,CommonService]
})
export class AddClientComponent implements OnInit {

  model = new Client();
  iSuccessError:IsuccessError;

  states : any = [];
  client_types : any = [];
  client_sizes : any = [];
  manage_licenses : any = [];
  constructor(private _router:Router,private _service : ClientService,private toastrService : ToastrService,private _commonService : CommonService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
    this.getMasterData();
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

 submit(form){    
      if(form.valid){
      this._service.add(this.model).subscribe(     
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
