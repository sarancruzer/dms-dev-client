import { ClientReportComponent } from './components/reports/client-report/client-report.component';
import { SupplyItemsComponent } from './components/project/supply-items/supply-items.component';
import { ProjectTeamComponent } from './components/project/project-team/project-team.component';
import { ProjectTypeComponent } from './components/masters/project-type/project-type.component';
import { ConfigureProjectComponent } from './components/project/configure-project/configure-project.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { ManageProjectComponent } from './components/project/manage-project/manage-project.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayout,
  SimpleLayout
} from './containers';
import { LoginComponent } from "app/components/login/login.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditprofileComponent } from './components/profile/editprofile/editprofile.component';
import { ViewprofileComponent } from './components/profile/viewprofile/viewprofile.component';
import { RolesComponent } from './components/roles/roles.component';
import { ManageuserComponent } from './components/users/manageuser/manageuser.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { UserregisterComponent } from "app/components/userregister/userregister.component";
import { ForgotpasswordComponent } from "app/components/forgotpassword/forgotpassword.component";
import { TerritoryComponent } from "app/components/masters/territory/territory.component";
import { StateComponent } from "app/components/masters/state/state.component";
import { TitleComponent } from "app/components/masters/title/title.component";
import { ClienttypeComponent } from "app/components/masters/clienttype/clienttype.component";
import { ClientsizeComponent } from "app/components/masters/clientsize/clientsize.component";
import { ManageLicenseComponent } from "app/components/license/manage-license/manage-license.component";
import { AddLicenseComponent } from "app/components/license/add-license/add-license.component";
import { EditLicenseComponent } from "app/components/license/edit-license/edit-license.component";
import { ManageClientComponent } from "app/components/clients/manage-client/manage-client.component";
import { AddClientComponent } from "app/components/clients/add-client/add-client.component";
import { EditClientComponent } from "app/components/clients/edit-client/edit-client.component";
import { RolePrivillegesComponent } from "app/components/role-privilleges/role-privilleges.component";
import { BuildingClassComponent } from 'app/components/masters/building-class/building-class.component';
import { ProjectScopeComponent } from 'app/components/project/project-scope/project-scope.component';
import { MprojectScopeComponent } from 'app/components/masters/mproject-scope/mproject-scope.component';
import { ItemsComponent } from 'app/components/masters/items/items.component';
import { ProjectDocsComponent } from 'app/components/project/project-docs/project-docs.component';
import { AdditionInfoComponent } from 'app/components/project/addition-info/addition-info.component';
import { ProjectNoteComponent } from 'app/components/project/project-note/project-note.component';
import { ProjectScopeConfigureComponent } from 'app/components/masters/project-scope-configure/project-scope-configure.component';


export const routes: Routes = [
  {path: '',redirectTo: 'login',pathMatch: 'full'},
  {path: '',component: FullLayout,data: {title: 'Home'},
  children: [
    // {path: 'dashboard',loadChildren: './views/dashboard/dashboard.module#DashboardModule'},
    {path: 'components',loadChildren: './views/components/components.module#ComponentsModule'},
    {path: 'icons',loadChildren: './views/icons/icons.module#IconsModule'},
    {path: 'widgets',loadChildren: './views/widgets/widgets.module#WidgetsModule'},
    {path: 'charts',loadChildren: './views/chartjs/chartjs.module#ChartJSModule'}
    ]
  },
  {path: 'pages',component: SimpleLayout,data: {title: 'Pages'},
    children: [
      {path: '',loadChildren: './views/pages/pages.module#PagesModule'}
    ]
  },
  
  {path: '',component: FullLayout,data: {title: 'Home'},
      children: [
        {path: 'dashboard',component: DashboardComponent,data: {title: 'Dashbord Page'}},

        {path: 'manageUsers',component: ManageuserComponent,data: {title: 'Manage Users'}},
        {path: 'addUser',component: AdduserComponent,data: {title: 'Add User'}},
        {path: 'editUser/:id',component: EdituserComponent,data: {title: 'Edit User'}},

        {path: 'manageRoles',component: RolesComponent,data: {title: 'Roles'}},
        {path: 'rolePrivilleges',component: RolePrivillegesComponent,data: {title: 'Role Privilleges'}},
        
        {path: 'masters/territory',component: TerritoryComponent,data: {title: 'Manage Territory'}},
        {path: 'masters/state',component: StateComponent,data: {title: 'Manage State'}},
        {path: 'masters/title',component: TitleComponent,data: {title: 'Manage Title'}},
        {path: 'masters/clientType',component: ClienttypeComponent,data: {title: 'Manage Client Type'}},
        {path: 'masters/clientSize',component: ClientsizeComponent,data: {title: 'Manage Client Size'}},
        {path: 'masters/projectType',component: ProjectTypeComponent,data: {title: 'Manage Project Type'}},
        {path: 'masters/buildingClass',component: BuildingClassComponent,data: {title: 'Manage Building Class'}},
        {path: 'masters/projectScope',component: MprojectScopeComponent,data: {title: 'Manage Project Scope'}},
        {path: 'masters/projectScopeConfigure',component: ProjectScopeConfigureComponent,data: {title: 'Manage Project Scope'}},
        {path: 'masters/items',component: ItemsComponent,data: {title: 'Manage Items'}},
        
        
        {path: 'manageClient',component: ManageClientComponent,data: {title: 'Manage Clients'}},
        {path: 'addClient',component: AddClientComponent,data: {title: 'Add Client'}},
        {path: 'editClient/:id',component: EditClientComponent,data: {title: 'Edit Client'}},

        {path: 'manageLicense',component: ManageLicenseComponent,data: {title: 'Manage License'}},
        {path: 'addLicense',component: AddLicenseComponent,data: {title: 'Add License'}},
        {path: 'editLicense/:id',component: EditLicenseComponent,data: {title: 'Edit License'}},

        {path: 'manageProject',component: ManageProjectComponent,data: {title: 'Manage Project'}},
        {path: 'addProject',component: AddProjectComponent,data: {title: 'Add project'}},
        {path: 'editProject/:id',component: EditProjectComponent,data: {title: 'Edit Project'}},
        {path: 'configureProject/:id',component: ConfigureProjectComponent,data: {title: 'Configure Project'}},
        {path: 'projectTeam',component: ProjectTeamComponent,data: {title: 'Project Team'}},
        {path: 'projectScope',component: ProjectScopeComponent,data: {title: 'Project Scope'}},
        
        {path: 'projectDocs',component: ProjectDocsComponent,data: {title: 'Manage Project Docs'}},
        {path: 'additionalInfo',component: AdditionInfoComponent,data: {title: 'Manage Additional Info '}},
        {path: 'projectNote',component: ProjectNoteComponent,data: {title: 'Manage Project Note '}},
        {path: 'supplyItems',component: SupplyItemsComponent,data: {title: 'Supply Items'}},

        {path: 'projectDetailReport',component: SupplyItemsComponent,data: {title: 'Project Detail Report'}},
        {path: 'clientReport',component: ClientReportComponent,data: {title: 'Client Report'}},
        {path: 'projectScopeReport',component: SupplyItemsComponent,data: {title: 'Project Scope Report'}},
        
        
        
    ]
  },
  {path: 'login',component: LoginComponent,data: {title: 'Login Page'}},
  {path: 'logout',component: LogoutComponent,data: {title: 'Logout Page'}},
  {path: 'userRegister',component: UserregisterComponent,data: {title: 'Register Page'}},
  {path: 'forgotPassword',component: ForgotpasswordComponent,data: {title: 'Register Page'}},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
