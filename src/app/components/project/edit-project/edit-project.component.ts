import { ProjectService } from './../../../_service/project.service';
import { CommonService } from './../../../_service/common.service';
import { ToastrService } from 'toastr-ng2';
import { ClientService } from './../../../_service/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Project } from './../../../_model/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers:[ProjectService]
})
export class EditProjectComponent implements OnInit {

 model = new Project();
  iSuccessError:IsuccessError;
  states : any = [];
  clients : any = [];
  client_sizes : any = [];
  manage_licenses : any = [];
  id:number;
  
  constructor(private _router:Router,private _service : ProjectService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute) {
    
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
  let params = ['m_state','clients','m_client_size','license'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.states = res['result']['info']['m_state'];
          this.clients = res['result']['info']['clients'];
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
                this._router.navigate(['/manageProject']);
              
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    }
    
      }

  
}
