import { GlobalSettings } from 'app/class/global-settings';
import { FormsModule } from '@angular/forms';
import { CommonService } from './../../../_service/common.service';
import { ToastrService } from 'toastr-ng2';
import { UserService } from './../../../_service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { User } from 'app/_model/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  model = new User();
  iSuccessError:IsuccessError;
  roles : any = [];
  id:number;
  
  constructor(private _router:Router,private _service : UserService,private toastrService : ToastrService,private _commonService : CommonService,private _route : ActivatedRoute) {
    
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
  let params = ['m_roles',];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
         this.roles = res['result']['info']['m_roles'];
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
         this.model = res['result']['info'];
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
                this._router.navigate(['/manageUsers']);
              
        },
      (err) => { 
        console.log(err);
          this.iSuccessError.mError = err;
          this.toastrService.error(err, 'Error!');
      }) 
    }
    
      }

  
}
