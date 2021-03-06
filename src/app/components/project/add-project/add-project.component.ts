import { CommonService } from './../../../_service/common.service';
import { ToastrService } from 'toastr-ng2';
import { ProjectService } from './../../../_service/project.service';
import { Router } from '@angular/router';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { Project } from './../../../_model/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers:[ProjectService,CommonService]
})
export class AddProjectComponent implements OnInit {

  model = new Project();
  iSuccessError:IsuccessError;

  states : any = [];
  clients:any = [];
  client_sizes : any = [];
  manage_licenses : any = [];
  territorys:any = [];
  project_statuss:any = [];
  constructor(private _router:Router,private _service : ProjectService,private toastrService : ToastrService,private _commonService:CommonService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
    this.getMasterData();
  }
    
  getMasterData(){
  let params = ['m_state','clients','m_client_size','license','m_territory','m_project_status'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.states = res['result']['info']['m_state'];
          this.clients = res['result']['info']['clients'];
          this.client_sizes = res['result']['info']['m_client_size'];
          this.manage_licenses = res['result']['info']['license'];
          this.territorys = res['result']['info']['m_territory'];
          this.project_statuss = res['result']['info']['m_project_status'];
          
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
