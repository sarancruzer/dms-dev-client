export interface ConfigureProject {

     id:number;
     project_type:number;
     building_class:{
        building_class_id:number,
        c_project_hdr_id:number,
        id:number    
    }
    
}

// // customer.interface.ts

// export interface ProjectType {
//     name: string; // required field with minimum 5 characters
//     building_class: BuildingClass[]; // user can have one or more addresses
// }

// export interface BuildingClass {
//     street: string;  // required field
//     postcode: string;
// }



    // export interface ConfigureProject {
    //     name: string;
    //     account: {
    //       email: string;
    //       confirm: string;
    //     }
    //   }