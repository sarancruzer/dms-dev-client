import { ProjectTeam } from './../../../_model/project-team';
import { CommonService } from './../../../_service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { ProjectService } from 'app/_service/project.service';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

  model = new ProjectTeam();
  
  iSuccessError:IsuccessError;
  id:number; 
  developers:any = [];
  projectManagers:any = [];
  estimators:any = [];
  siteManagers:any = [];

    constructor(private _router:Router,private _route : ActivatedRoute,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService) { 
      this.iSuccessError = {mSuccess:"",mError:""};
    }
    ngOnInit() {
     
    this.id = Number(localStorage.getItem("project_id"));
    console.log(this.id);
    this.getMasterData();    
    this.getDetailsById(this.id);

    }



getMasterData(){
  let params = ['m_developer','m_project_manager','m_estimator','m_site_manager'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.developers = res['result']['info']['m_developer'];
          this.projectManagers = res['result']['info']['m_project_manager'];
          this.estimators = res['result']['info']['m_estimator'];
          this.siteManagers = res['result']['info']['m_site_manager'];
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
  this._service.getProjectTeamById(id).subscribe(     
    (res) => {
         this.model = res['result']['info']['lists'];
         console.log('this.model');
         console.log(this.model);         
    },
  (err) => { 
     this.iSuccessError.mError = err;
     this.toastrService.error(err, 'Error!');
     if(err == 'No results found!'){
       
     }
  }) 
 }




submit(form){    
  console.log("form");
  console.log(form.value);

    if(form.valid){
     this._service.updateConfigureProject(form.value,this.id).subscribe(     
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
