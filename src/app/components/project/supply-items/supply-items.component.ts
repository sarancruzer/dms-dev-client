import { ProjectService } from 'app/_service/project.service';

import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { IsuccessError } from './../../../_interface/isuccess-error.model';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/_service/common.service';
import { FormGroup ,FormBuilder, FormArray} from '@angular/forms';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

export interface IGreyout {

  // all_joinery_greyout: string;
  // aluminium_louvres_greyout: string;
  // aluminium_windows_doors_greyout: string;
  // appliances_greyout: string;
  // balustrade_greyout: string;
  // bedroom_greyout: string;
  // benchtops_greyout: string;
  // bookcase_mediashelf_greyout: string;
  // curtain_wall_greyout: string;
  // desks_greyout: string;
  // ensuit_bathroom_greyout: string;
  // flooring_greyout: string;
  // garage_doors_greyout: string;
  // kitchen_greyout: string;
  // laundry_greyout: string;
  // other_greyout: string;
  // powder_room_toilet_greyout: string;
  // sanitaryware_greyout: string;
  // sinks_tubs_basins_greyout: string;
  // splashbacks_greyout: string;
  study_greyout?: string;
  tapware_greyout?: string;
  wardrobes_greyout?: string;

}


@Component({
  selector: 'app-supply-items',
  templateUrl: './supply-items.component.html',
  styleUrls: ['./supply-items.component.scss'],
  providers:[ProjectService,CommonService]
})
export class SupplyItemsComponent implements OnInit {

  items:any = [];
  territories:any = [];
  projectStatuss:any = [];
  project_name:string;
  id:number;
  iSuccessError:IsuccessError;

  form:FormGroup;

  model:any;
  sidemenuItems:any;

  

  

  all_joinery_greyout: string;
  aluminium_louvres_greyout: string;
  aluminium_windows_doors_greyout: string;
  appliances_greyout: string;
  balustrade_greyout: string;
  bedroom_greyout: string;
  benchtops_greyout: string;
  bookcase_mediashelf_greyout: string;
  curtain_wall_greyout: string;
  desks_greyout: string;
  ensuit_bathroom_greyout: string;
  flooring_greyout: string;
  garage_doors_greyout: string;
  kitchen_greyout: string;
  laundry_greyout: string;
  other_greyout: string;
  powder_room_toilet_greyout: string;
  sanitaryware_greyout: string;
  sinks_tubs_basins_greyout: string;
  splashbacks_greyout: string;
  study_greyout?: string;
  tapware_greyout?: string;
  wardrobes_greyout?: string;



  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
};

  constructor(private _router:Router,private _commonService:CommonService,private toastrService:ToastrService,private _service:ProjectService,private fb:FormBuilder) {
    this.iSuccessError = {mSuccess:"",mError:""};
    this.id = JSON.parse(localStorage.getItem("project_id"));
    
   }

  ngOnInit() {

    this.initFormControl();
    this.getMasterData();
    this.getDetailsById(this.id);
  }


getMasterData(){
  let params = ['m_items_supply','m_territory','m_project_status'];
  this._commonService.getMasterDetails(params).subscribe(
    (res) => {
        this.items = res['result']['info']['m_items_supply'];
        this.territories = res['result']['info']['m_territory'];
        this.projectStatuss = res['result']['info']['m_project_status'];
        console.log(this.items);

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
    this._service.getSupplyItemsById(id).subscribe(
      (res) => {
        let ress = res['result']['info']['lists'];
        this.project_name = res['result']['info']['project_name'];
           //Object.keys(ress); // ['name', 'age']
           console.log(res);
           this.sidemenuItems = Object.getOwnPropertyNames(ress[0]);
           this.loadFormControl(ress[0]);
      },
    (err) => {
      console.log(err);
       this.iSuccessError.mError = err['result']['error'];

       //this.toastrService.error(err['result']['error'], 'Error!');
       if(err == 'No results found!'){

       }
    })
   }


   submit(form){
    console.log("form");
    console.log(form.value);

      if(form.valid){
       this._service.updateSupplyItems(form.value,this.id).subscribe(
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


   initFormControl() {

        this.form = this.fb.group({

          territory:'',

          all_joinery_estimated_date:'',
          aluminium_louvres_estimated_date:'',
          aluminium_windows_doors_estimated_date:'',
          appliances_estimated_date:'',
          balustrade_estimated_date:'',
          bedroom_estimated_date:'',
          benchtops_estimated_date:'',
          bookcase_mediashelf_estimated_date:'',
          curtain_wall_estimated_date:'',
          desks_estimated_date:'',
          ensuit_bathroom_estimated_date:'',
          flooring_estimated_date:'',
          garage_doors_estimated_date:'',
          kitchen_estimated_date:'',
          laundry_estimated_date:'',
          other_estimated_date:'',
          powder_room_toilet_estimated_date:'',
          sanitaryware_estimated_date:'',
          sinks_tubs_basins_estimated_date:'',
          splashbacks_estimated_date:'',
          study_estimated_date:'',
          tapware_estimated_date:'',
          wardrobes_estimated_date:'',


          all_joinery_quoted_date:'',
          aluminium_louvres_quoted_date:'',
          aluminium_windows_doors_quoted_date:'',
          appliances_quoted_date:'',
          balustrade_quoted_date:'',
          bedroom_quoted_date:'',
          benchtops_quoted_date:'',
          bookcase_mediashelf_quoted_date:'',
          curtain_wall_quoted_date:'',
          desks_quoted_date:'',
          ensuit_bathroom_quoted_date:'',
          flooring_quoted_date:'',
          garage_doors_quoted_date:'',
          kitchen_quoted_date:'',
          laundry_quoted_date:'',
          other_quoted_date:'',
          powder_room_toilet_quoted_date:'',
          sanitaryware_quoted_date:'',
          sinks_tubs_basins_quoted_date:'',
          splashbacks_quoted_date:'',
          study_quoted_date:'',
          tapware_quoted_date:'',
          wardrobes_quoted_date:'',


          all_joinery_interest:'',
          aluminium_louvres_interest:'',
          aluminium_windows_doors_interest:'',
          appliances_interest:'',
          balustrade_interest:'',
          bedroom_interest:'',
          benchtops_interest:'',
          bookcase_mediashelf_interest:'',
          curtain_wall_interest:'',
          desks_interest:'',
          ensuit_bathroom_interest:'',
          flooring_interest:'',
          garage_doors_interest:'',
          kitchen_interest:'',
          laundry_interest:'',
          other_interest:'',
          powder_room_toilet_interest:'',
          sanitaryware_interest:'',
          sinks_tubs_basins_interest:'',
          splashbacks_interest:'',
          study_interest:'',
          tapware_interest:'',
          wardrobes_interest:'',

          all_joinery_status:'1',
          aluminium_louvres_status:'1',
          aluminium_windows_doors_status:'1',
          appliances_status:'1',
          balustrade_status:'1',
          bedroom_status:'1',
          benchtops_status:'1',
          bookcase_mediashelf_status:'1',
          curtain_wall_status:'1',
          desks_status:'1',
          ensuit_bathroom_status:'1',
          flooring_status:'1',
          garage_doors_status:'1',
          kitchen_status:'1',
          laundry_status:'1',
          other_status:'1',
          powder_room_toilet_status:'1',
          sanitaryware_status:'1',
          sinks_tubs_basins_status:'1',
          splashbacks_status:'1',
          study_status:'1',
          tapware_status : '1',
          wardrobes_status : '1',


          all_joinery_greyout:'',
          aluminium_louvres_greyout:'',
          aluminium_windows_doors_greyout:'',
          appliances_greyout:'',
          balustrade_greyout:'',
          bedroom_greyout:'',
          benchtops_greyout:'',
          bookcase_mediashelf_greyout:'',
          curtain_wall_greyout:'',
          desks_greyout:'',
          ensuit_bathroom_greyout:'',
          flooring_greyout:'',
          garage_doors_greyout:'',
          kitchen_greyout:'',
          laundry_greyout:'',
          other_greyout:'',
          powder_room_toilet_greyout:'',
          sanitaryware_greyout:'',
          sinks_tubs_basins_greyout:'',
          splashbacks_greyout:'',
          study_greyout:'',
          tapware_greyout:'',
          wardrobes_greyout:'',


        });
      }



  loadFormControl(res) {

    this.form = this.fb.group({

          territory:res['territory'],


          all_joinery_quoted_date:'',
          aluminium_louvres_quoted_date:res['aluminium_louvres'].quoted_date,
          aluminium_windows_doors_quoted_date:res['aluminium_windows_doors'].quoted_date,
          appliances_quoted_date:res['appliances'].quoted_date,
          balustrade_quoted_date:res['balustrade'].quoted_date,
          bedroom_quoted_date:res['bedroom'].quoted_date,
          benchtops_quoted_date:res['benchtops'].quoted_date,
          bookcase_mediashelf_quoted_date:res['bookcase_mediashelf'].quoted_date,
          curtain_wall_quoted_date:res['curtain_wall'].quoted_date,
          desks_quoted_date:res['desks'].quoted_date,
          ensuit_bathroom_quoted_date:res['ensuit_bathroom'].quoted_date,
          flooring_quoted_date:res['flooring'].quoted_date,
          garage_doors_quoted_date:res['garage_doors'].quoted_date,
          kitchen_quoted_date:res['kitchen'].quoted_date,
          laundry_quoted_date:res['laundry'].quoted_date,
          other_quoted_date:res['other'].quoted_date,
          powder_room_toilet_quoted_date:res['powder_room_toilet'].quoted_date,
          sanitaryware_quoted_date:res['sanitaryware'].quoted_date,
          sinks_tubs_basins_quoted_date:res['sinks_tubs_basins'].quoted_date,
          splashbacks_quoted_date:res['splashbacks'].quoted_date,
          study_quoted_date:res['study'].quoted_date,
          tapware_quoted_date:res['tapware'].quoted_date,
          wardrobes_quoted_date:res['wardrobes'].quoted_date,

          all_joinery_estimated_date:'',
          aluminium_louvres_estimated_date:res['aluminium_louvres'].estimated_date,
          aluminium_windows_doors_estimated_date:res['aluminium_windows_doors'].estimated_date,
          appliances_estimated_date:res['appliances'].estimated_date,
          balustrade_estimated_date:res['balustrade'].estimated_date,
          bedroom_estimated_date:res['bedroom'].estimated_date,
          benchtops_estimated_date:res['benchtops'].estimated_date,
          bookcase_mediashelf_estimated_date:res['bookcase_mediashelf'].estimated_date,
          curtain_wall_estimated_date:res['curtain_wall'].estimated_date,
          desks_estimated_date:res['desks'].estimated_date,
          ensuit_bathroom_estimated_date:res['ensuit_bathroom'].estimated_date,
          flooring_estimated_date:res['flooring'].estimated_date,
          garage_doors_estimated_date:res['garage_doors'].estimated_date,
          kitchen_estimated_date:res['kitchen'].estimated_date,
          laundry_estimated_date:res['laundry'].estimated_date,
          other_estimated_date:res['other'].estimated_date,
          powder_room_toilet_estimated_date:res['powder_room_toilet'].estimated_date,
          sanitaryware_estimated_date:res['sanitaryware'].estimated_date,
          sinks_tubs_basins_estimated_date:res['sinks_tubs_basins'].estimated_date,
          splashbacks_estimated_date:res['splashbacks'].estimated_date,
          study_estimated_date:res['study'].estimated_date,
          tapware_estimated_date:res['tapware'].estimated_date,
          wardrobes_estimated_date:res['wardrobes'].estimated_date,

          all_joinery_interest:'1',
          aluminium_louvres_interest:res['aluminium_louvres'].interest,
          aluminium_windows_doors_interest:res['aluminium_windows_doors'].interest,
          appliances_interest:res['appliances'].interest,
          balustrade_interest:res['balustrade'].interest,
          bedroom_interest:res['bedroom'].interest,
          benchtops_interest:res['benchtops'].interest,
          bookcase_mediashelf_interest:res['bookcase_mediashelf'].interest,
          curtain_wall_interest:res['curtain_wall'].interest,
          desks_interest:res['desks'].interest,
          ensuit_bathroom_interest:res['ensuit_bathroom'].interest,
          flooring_interest:res['flooring'].interest,
          garage_doors_interest:res['garage_doors'].interest,
          kitchen_interest:res['kitchen'].interest,
          laundry_interest:res['laundry'].interest,
          other_interest:res['other'].interest,
          powder_room_toilet_interest:res['powder_room_toilet'].interest,
          sanitaryware_interest:res['sanitaryware'].interest,
          sinks_tubs_basins_interest:res['sinks_tubs_basins'].interest,
          splashbacks_interest:res['splashbacks'].interest,
          study_interest:res['study'].interest,
          tapware_interest:res['tapware'].interest,
          wardrobes_interest:res['wardrobes'].interest,

          all_joinery_status:'1',
          aluminium_louvres_status:res['aluminium_louvres'].status,
          aluminium_windows_doors_status:res['aluminium_windows_doors'].status,
          appliances_status:res['appliances'].status,
          balustrade_status:res['balustrade'].status,
          bedroom_status:res['bedroom'].status,
          benchtops_status:res['benchtops'].status,
          bookcase_mediashelf_status:res['bookcase_mediashelf'].status,
          curtain_wall_status:res['curtain_wall'].status,
          desks_status:res['desks'].status,
          ensuit_bathroom_status:res['ensuit_bathroom'].status,
          flooring_status:res['flooring'].status,
          garage_doors_status:res['garage_doors'].status,
          kitchen_status:res['kitchen'].status,
          laundry_status:res['laundry'].status,
          other_status:res['other'].status,
          powder_room_toilet_status:res['powder_room_toilet'].status,
          sanitaryware_status:res['sanitaryware'].status,
          sinks_tubs_basins_status:res['sinks_tubs_basins'].status,
          splashbacks_status:res['splashbacks'].status,
          study_status:res['study'].status,
          tapware_status:res['tapware'].status,
          wardrobes_status:res['wardrobes'].status,


          all_joinery_greyout:'',
          aluminium_louvres_greyout:res['aluminium_louvres'].greyout,
          aluminium_windows_doors_greyout:res['aluminium_windows_doors'].greyout,
          appliances_greyout:res['appliances'].greyout,
          balustrade_greyout:res['balustrade'].greyout,
          bedroom_greyout:res['bedroom'].greyout,
          benchtops_greyout:res['benchtops'].greyout,
          bookcase_mediashelf_greyout:res['bookcase_mediashelf'].greyout,
          curtain_wall_greyout:res['curtain_wall'].greyout,
          desks_greyout:res['desks'].greyout,
          ensuit_bathroom_greyout:res['ensuit_bathroom'].greyout,
          flooring_greyout:res['flooring'].greyout,
          garage_doors_greyout:res['garage_doors'].greyout,
          kitchen_greyout:res['kitchen'].greyout,
          laundry_greyout:res['laundry'].greyout,
          other_greyout:res['other'].greyout,
          powder_room_toilet_greyout:res['powder_room_toilet'].greyout,
          sanitaryware_greyout:res['sanitaryware'].greyout,
          sinks_tubs_basins_greyout:res['sinks_tubs_basins'].greyout,
          splashbacks_greyout:res['splashbacks'].greyout,
          study_greyout:res['study'].greyout,
          tapware_greyout:res['tapware'].greyout,
          wardrobes_greyout:res['wardrobes'].greyout,
        

    });



    this.form.patchValue({aluminium_louvres_quoted_date: {formatted:res['aluminium_louvres'].quoted_date }});
    this.form.patchValue({aluminium_windows_doors_quoted_date: {formatted:res['aluminium_windows_doors'].quoted_date }});
    this.form.patchValue({appliances_quoted_date: {formatted:res['appliances'].quoted_date }});
    this.form.patchValue({balustrade_quoted_date: {formatted:res['balustrade'].quoted_date }});
    this.form.patchValue({bedroom_quoted_date: {formatted:res['bedroom'].quoted_date }});
    this.form.patchValue({benchtops_quoted_date: {formatted:res['benchtops'].quoted_date }});
    this.form.patchValue({bookcase_mediashelf_quoted_date: {formatted:res['bookcase_mediashelf'].quoted_date }});
    this.form.patchValue({curtain_wall_quoted_date: {formatted:res['curtain_wall'].quoted_date }});
    this.form.patchValue({desks_quoted_date: {formatted:res['desks'].quoted_date }});
    this.form.patchValue({ensuit_bathroom_quoted_date: {formatted:res['ensuit_bathroom'].quoted_date }});
    this.form.patchValue({flooring_quoted_date: {formatted:res['flooring'].quoted_date }});
    this.form.patchValue({garage_doors_quoted_date: {formatted:res['garage_doors'].quoted_date }});
    this.form.patchValue({kitchen_quoted_date: {formatted:res['kitchen'].quoted_date }});
    this.form.patchValue({laundry_quoted_date: {formatted:res['laundry'].quoted_date }});
    this.form.patchValue({other_quoted_date: {formatted:res['other'].quoted_date }});
    this.form.patchValue({powder_room_toilet_quoted_date: {formatted:res['powder_room_toilet'].quoted_date }});
    this.form.patchValue({sanitaryware_toilet_quoted_date: {formatted:res['sanitaryware'].quoted_date }});
    this.form.patchValue({sinks_tubs_basins_quoted_date: {formatted:res['sinks_tubs_basins'].quoted_date }});
    this.form.patchValue({splashbacks_quoted_date: {formatted:res['splashbacks'].quoted_date }});
    this.form.patchValue({study_quoted_date: {formatted:res['study'].quoted_date }});
    this.form.patchValue({tapware_quoted_date: {formatted:res['tapware'].quoted_date }});
    this.form.patchValue({wardrobes_quoted_date: {formatted:res['wardrobes'].quoted_date }});

      this.form.patchValue({aluminium_louvres_estimated_date: {formatted:res['aluminium_louvres'].estimated_date }});
    this.form.patchValue({aluminium_windows_doors_estimated_date: {formatted:res['aluminium_windows_doors'].estimated_date }});
    this.form.patchValue({appliances_estimated_date: {formatted:res['appliances'].estimated_date }});
    this.form.patchValue({balustrade_estimated_date: {formatted:res['balustrade'].estimated_date }});
    this.form.patchValue({bedroom_estimated_date: {formatted:res['bedroom'].estimated_date }});
    this.form.patchValue({benchtops_estimated_date: {formatted:res['benchtops'].estimated_date }});
    this.form.patchValue({bookcase_mediashelf_estimated_date: {formatted:res['bookcase_mediashelf'].estimated_date }});
    this.form.patchValue({curtain_wall_estimated_date: {formatted:res['curtain_wall'].estimated_date }});
    this.form.patchValue({desks_estimated_date: {formatted:res['desks'].estimated_date }});
    this.form.patchValue({ensuit_bathroom_estimated_date: {formatted:res['ensuit_bathroom'].estimated_date }});
    this.form.patchValue({flooring_estimated_date: {formatted:res['flooring'].estimated_date }});
    this.form.patchValue({garage_doors_estimated_date: {formatted:res['garage_doors'].estimated_date }});
    this.form.patchValue({kitchen_estimated_date: {formatted:res['kitchen'].estimated_date }});
    this.form.patchValue({laundry_estimated_date: {formatted:res['laundry'].estimated_date }});
    this.form.patchValue({other_estimated_date: {formatted:res['other'].estimated_date }});
    this.form.patchValue({powder_room_toilet_estimated_date: {formatted:res['powder_room_toilet'].estimated_date }});
    this.form.patchValue({sanitaryware_toilet_estimated_date: {formatted:res['sanitaryware'].estimated_date }});
    this.form.patchValue({sinks_tubs_basins_estimated_date: {formatted:res['sinks_tubs_basins'].estimated_date }});
    this.form.patchValue({splashbacks_estimated_date: {formatted:res['splashbacks'].estimated_date }});
    this.form.patchValue({study_estimated_date: {formatted:res['study'].estimated_date }});
    this.form.patchValue({tapware_estimated_date: {formatted:res['tapware'].estimated_date }});
    this.form.patchValue({wardrobes_estimated_date: {formatted:res['wardrobes'].estimated_date }});

    //this.form.patchValue({garages_quoted_date: {formatted:res['garages'].quoted_date }});

     

    this.all_joinery_greyout = '';
    this.aluminium_louvres_greyout = res['aluminium_louvres'].greyout;
    this.aluminium_windows_doors_greyout = res['aluminium_windows_doors'].greyout;
    this.appliances_greyout = res['appliances'].greyout;
    this.balustrade_greyout = res['balustrade'].greyout;
    this.bedroom_greyout = res['bedroom'].greyout;
    this.benchtops_greyout = res['benchtops'].greyout;
    this.bookcase_mediashelf_greyout = res['bookcase_mediashelf'].greyout;
    this.curtain_wall_greyout = res['curtain_wall'].greyout;
    this.desks_greyout = res['desks'].greyout;
    this.ensuit_bathroom_greyout = res['ensuit_bathroom'].greyout;
    this.flooring_greyout = res['flooring'].greyout;
    this.garage_doors_greyout = res['garage_doors'].greyout;
    this.kitchen_greyout = res['kitchen'].greyout;
    this.laundry_greyout = res['laundry'].greyout;
    this.other_greyout = res['other'].greyout;
    this.powder_room_toilet_greyout = res['powder_room_toilet'].greyout;
    this.sanitaryware_greyout = res['sanitaryware'].greyout;
    this.sinks_tubs_basins_greyout = res['sinks_tubs_basins'].greyout;
    this.splashbacks_greyout = res['splashbacks'].greyout;
    this.study_greyout = res['study'].greyout;
    this.tapware_greyout = res['tapware'].greyout;
    this.wardrobes_greyout = res['wardrobes'].greyout;

  }


  initVarSub(res) {
    let v = this.fb.group({
      interest:res['interest'],
      estimated_date:res['estimated_date'],
      quoted_date:res['quoted_date'],
      status:res['status'],
    });
    return v;
  }



}
