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

import { Component, OnInit, Injectable} from '@angular/core';
import {DepositApplicationModel} from '../../models/deposit-application-model';
import { AppService } from '../../app.service';
import { NgClass } from '@angular/common';
import {Router} from '@angular/router';
@Component({
  selector: 'app-confirm-info',
  templateUrl: './confirm-info.component.html'
})

@Injectable()
export class ConfirmInfoComponent {
depositApplicationModel:DepositApplicationModel;
joint:boolean;
errorMessage:any;
constructor(private appService: AppService, private _router: Router) {
  //this.depositApplicationModel = appService.getConfirmInfo();
  this.depositApplicationModel = appService.depositApplicationModel;
}
ngOnInit(){
  if(this.depositApplicationModel.applicants.length==2){
    this.joint=true;
  }else{
    this.joint=false;
  }
}
get diagnostic() { return JSON.stringify(this.depositApplicationModel); }

createAccount(){
  this.appService.createAccount().subscribe(
  data  => {
       if(data.applicationStatus && data.applicationStatus=="Approved"){
         this.appService.bankABANumber=data.bankABANumber;
         this.appService.accountNumber =data.accountNumber;
         this._router.navigateByUrl('/summary');
        }
    },
  error => {this.errorMessage = <any>error});
 }
}
