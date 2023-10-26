import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchemeComponent } from 'src/app/components/create-scheme/create-scheme.component';
import { HomeComponent } from './home.component';
import { ViewSchemesComponent } from 'src/app/components/view-schemes/view-schemes.component';
import { MasterDataComponent } from 'src/app/components/master-data/master-data.component';
import { FinanceDetailsComponent } from 'src/app/components/finance-details/finance-details.component';
import { CreateWebsiteComponent } from 'src/app/components/create-website/create-website.component';
import { ApplicationComponent } from 'src/app/components/application/application.component';
import { ApplicationListComponent } from 'src/app/components/application-list/application-list.component';
import { ApplicationFormComponent } from 'src/app/components/application-form/application-form.component';
import { CreateUnitComponent } from 'src/app/components/create-unit/create-unit.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'view-scheme', pathMatch: 'full' },
            { path: 'view-scheme', component: ViewSchemesComponent },
            { path: 'scheme', component: CreateSchemeComponent },
            { path: 'unit/:id', component: CreateUnitComponent },
            { path: 'master-data/:id', component: MasterDataComponent },
            { path: 'website/:id', component: CreateWebsiteComponent },
            { path: 'finance/:id', component: FinanceDetailsComponent },
            { path: 'application', component: ApplicationComponent },
            { path: 'application-list/:scheme', component: ApplicationListComponent },
            { path: 'applicationform/:id', component: ApplicationFormComponent }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
