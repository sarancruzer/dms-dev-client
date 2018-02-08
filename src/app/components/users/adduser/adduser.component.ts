import { GlobalSettings } from 'app/class/global-settings';
import { FormsModule } from '@angular/forms';
import { CommonService } from './../../../_service/common.service';
import { ToastrService } from 'toastr-ng2';
import { UserService } from './../../../_service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IsuccessError } from 'app/_interface/isuccess-error.model';
import { User } from 'app/_model/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
  providers:[UserService,CommonService]
})
export class AdduserComponent implements OnInit {

  model = new User();
  iSuccessError:IsuccessError;

  roles : any = [];
  licenses : any = [];
  constructor(private _router:Router,private _service : UserService,private toastrService : ToastrService,private _commonService : CommonService) {
    
    this.iSuccessError = {mSuccess:"",mError:""};
   }

  ngOnInit() {
    this.getMasterData();
  }
    
  getMasterData(){
  let params = ['m_roles','license'];
  this._commonService.getMasterDetails(params).subscribe(     
    (res) => {
          this.roles = res['result']['info']['m_roles'];
          this.licenses = res['result']['info']['license'];
          
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
