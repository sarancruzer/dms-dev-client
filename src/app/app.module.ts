import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from "ngx-bootstrap";


import { AppComponent } from './app.component';

// Import containers
import {
  FullLayout,
  SimpleLayout
} from './containers';

const APP_CONTAINERS = [
  FullLayout,
  SimpleLayout
]

// Import components
import {
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer
} from './components';

const APP_COMPONENTS = [
  AppAside,
  AppBreadcrumbs,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  SIDEBAR_TOGGLE_DIRECTIVES
]

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditprofileComponent } from './components/profile/editprofile/editprofile.component';
import { ViewprofileComponent } from './components/profile/viewprofile/viewprofile.component';
import { RolesComponent } from './components/roles/roles.component';
import { ManageuserComponent } from './components/users/manageuser/manageuser.component';
import { AdduserComponent } from './components/users/adduser/adduser.component';
import { EdituserComponent } from './components/users/edituser/edituser.component';
import { UserregisterComponent } from './components/userregister/userregister.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { TerritoryComponent } from './components/masters/territory/territory.component';
import { StateComponent } from './components/masters/state/state.component';
import { TitleComponent } from './components/masters/title/title.component';
import { ClienttypeComponent } from './components/masters/clienttype/clienttype.component';
import { ClientsizeComponent } from './components/masters/clientsize/clientsize.component';
import { ManageLicenseComponent } from './components/license/manage-license/manage-license.component';
import { AddLicenseComponent } from './components/license/add-license/add-license.component';
import { EditLicenseComponent } from './components/license/edit-license/edit-license.component';
import { ManageClientComponent } from './components/clients/manage-client/manage-client.component';
import { AddClientComponent } from './components/clients/add-client/add-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { RolePrivillegesComponent } from './components/role-privilleges/role-privilleges.component';
import { CategoryComponent } from './components/masters/category/category.component';
import { SubCategoryComponent } from './components/masters/sub-category/sub-category.component';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
    LoginComponent,
    DashboardComponent,
    EditprofileComponent,
    ViewprofileComponent,
    RolesComponent,
    ManageuserComponent,
    AdduserComponent,
    EdituserComponent,
    UserregisterComponent,
    ForgotpasswordComponent,
    TerritoryComponent,
    StateComponent,
    TitleComponent,
    ClienttypeComponent,
    ClientsizeComponent,
    ManageLicenseComponent,
    AddLicenseComponent,
    EditLicenseComponent,
    ManageClientComponent,
    AddClientComponent,
    EditClientComponent,
    RolePrivillegesComponent,
    CategoryComponent,
    SubCategoryComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }