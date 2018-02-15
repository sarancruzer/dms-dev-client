import { ProjectTeam } from './../../../_model/project-team';
import { CommonService } from './../../../_service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { ToastrService } from 'toastr-ng2/toastr-service';
import { ProjectService } from 'app/_service/project.service';
import { FormGroup ,FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss'],
  providers:[ProjectService,CommonService]
})
export class ProjectTeamComponent implements OnInit {

  model = new ProjectTeam();
  iSuccessError:IsuccessError;
  id:any; 
  developers:any = [];
  projectManagers:any = [];
  estimators:any = [];
  siteManagers:any = [];
  project_name:string;
  form:FormGroup;
  
  projects:any = [];
  projectId:any;

    constructor(private _router:Router,private _route : ActivatedRoute,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService) { 
      this.iSuccessError = {mSuccess:"",mError:""};
    }
    ngOnInit() {
    
      this.form = new FormGroup({

        developer: new FormControl(0, Validators.required),
        project_manager: new FormControl(0, Validators.required),
        estimator: new FormControl(0, Validators.required),
        site_manager: new FormControl(0, Validators.required),
        architech: new FormControl('', Validators.required),
        engineer: new FormControl('', Validators.required),        
        building_surveyor: new FormControl('', Validators.required),        
        quantity_surveyor: new FormControl('', Validators.required),        
        superintendent: new FormControl('', Validators.required)       
      });

    this.id = localStorage.getItem("project_id");
    console.log(this.id);
    this.getMasterData();    
    this.getProjectList();  
    this.getDetailsById(this.id);
    
    }



getMasterData(){
  let params = ['m_contacts'];
  this._commonService.getContactDetails(params).subscribe(     
    (res) => {
        let ress = res['result']['info'];
        for (var i = 0, len = ress.length; i < len; i++) {
          console.log(ress[i]['job_title']);
          if(ress[i]['job_title'] == 1){
            this.developers.push(ress[i]);
          }
          if(ress[i]['job_title'] == 2){
            this.projectManagers.push(ress[i]);
          }
          if(ress[i]['job_title'] == 3){
            this.estimators.push(ress[i]);
          }
          if(ress[i]['job_title'] == 4){
            this.siteManagers.push(ress[i]);
          }

        }          
          console.log(this.developers);
          console.log(this.projectManagers);
          console.log(this.estimators);
          console.log(this.siteManagers);

   },
  (err) => { 
      this.iSuccessError.mError = err;
      this.toastrService.error(err, 'Error!');
      if(err == 'token_expired'){
            this._router.navigate(['/logout']);
       }
  }) 
  }


 
  getProjectList(){ 
    let params = [];
    this._commonService.getProjectList(params).subscribe(     
      (res) => {
          this.projects = res['result']['info'];
          //localStorage.setItem("project_id",this.projects[0].id);

          this.id = localStorage.getItem("project_id");
      },
    (err) => { 
        if(err == 'token_expired'){
              this._router.navigate(['/logout']);
         }
    }) 
  }

  changeProject() {
    console.log(this.id);
    localStorage.setItem("project_id",this.id);
    this.getDetailsById(this.id);
  }

 
 getDetailsById(id) {
  this._service.getProjectTeamById(id).subscribe(     
    (res) => {
      let ress = res['result']['info']['lists'];
      this.project_name = res['result']['info']['project_name'];
         //this.form = res['result']['info']['lists'];
         this.setValue(ress);
         //Object.keys(ress); // ['name', 'age']
         console.log('this.model');
         console.log(ress);         
    },
  (err) => { 
    console.log(err);
     this.iSuccessError.mError = err['result']['error'];
     this.project_name = err['result']['project_name'];
     //this.toastrService.error(err['result']['error'], 'Error!');
     if(err == 'No results found!'){
       
     }
  }) 
 }

 setValue(res) {
  
    this.form = new FormGroup({
      developer: new FormControl(res['developer'], Validators.required),
      project_manager: new FormControl(res['project_manager'], Validators.required),
      estimator: new FormControl(res['estimator'], Validators.required),
      site_manager: new FormControl(res['site_manager'], Validators.required),
      architech: new FormControl(res['architech'], Validators.required),
      engineer: new FormControl(res['engineer'], Validators.required),        
      building_surveyor: new FormControl(res['building_surveyor'], Validators.required),        
      quantity_surveyor: new FormControl(res['quantity_surveyor'], Validators.required),        
      superintendent: new FormControl(res['superintendent'], Validators.required)
    });
    
    //{first: 'Carson', last: 'Drew'});
   }


submit(form){    
  console.log("form");
  console.log(form.value);

  
     this._service.updateProjectTeam(form.value,this.id).subscribe(     
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
