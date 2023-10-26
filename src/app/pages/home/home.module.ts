import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ViewSchemesComponent } from 'src/app/components/view-schemes/view-schemes.component';
import { CreateSchemeComponent } from 'src/app/components/create-scheme/create-scheme.component';
import { MasterDataComponent } from 'src/app/components/master-data/master-data.component';
import { DialogMsgComponent } from 'src/app/components/dialog-msg/dialog-msg.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { CreateWebsiteComponent } from 'src/app/components/create-website/create-website.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FinanceDetailsComponent } from 'src/app/components/finance-details/finance-details.component';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationListComponent } from 'src/app/components/application-list/application-list.component';
import { ApplicationComponent } from 'src/app/components/application/application.component';
import { ApplicationFormComponent } from 'src/app/components/application-form/application-form.component';
import { CreateUnitComponent } from 'src/app/components/create-unit/create-unit.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    // text: "Loading...",
    // textColor: "#470A3C",
    textPosition: "center-center",
    bgsColor: "#ffffff",
    fgsColor: "#ffffff",
    fgsType: SPINNER.circle,
    fgsSize: 100,
};

@NgModule({
    declarations: [
        ViewSchemesComponent,
        CreateSchemeComponent,
        HomeComponent,
        MasterDataComponent,
        DialogMsgComponent,
        FinanceDetailsComponent,
        CreateWebsiteComponent,
        ApplicationListComponent,
        ApplicationComponent,
        ApplicationFormComponent,
        CreateUnitComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxUiLoaderModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        NgxUiLoaderHttpModule.forRoot(ngxUiLoaderConfig),
        MatIconModule,
    ]
})
export class HomeModule { }
