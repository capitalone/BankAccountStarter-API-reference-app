/**
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { ProspectFormComponent } from './views/personal-info/prospect-form.component';
import { SlideToggleComponent } from '../components/slide-toggle/slide-toggle.component';
import { routing } from './app.routing';
import { AppService } from './app.service';
import {ConfirmInfoComponent} from './views/confirm-info/confirm-info.component';
import {SummaryComponent} from './views/summary/summary.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ProspectFormComponent,
    SlideToggleComponent,
    ConfirmInfoComponent,
    SummaryComponent
  ],
  bootstrap: [AppComponent],
  providers:[AppService,  {provide: LocationStrategy, useClass: HashLocationStrategy}]
})

export class AppModule {}
