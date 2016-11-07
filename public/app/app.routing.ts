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

import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProspectFormComponent } from './views/personal-info/prospect-form.component';
import {ConfirmInfoComponent} from './views/confirm-info/confirm-info.component';
import {SummaryComponent} from './views/summary/summary.component';

const appRoutes: Routes = [
  {
  path: '',
  redirectTo: 'personal-info',
  pathMatch: 'full'
  },
{
  path: 'personal-info',
  component: ProspectFormComponent
},
{
  path: 'confirm-info',
  component: ConfirmInfoComponent
},
{
  path: 'summary',
  component: SummaryComponent
}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
