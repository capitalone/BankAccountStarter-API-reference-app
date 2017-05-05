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

import { Component, OnInit, Injectable, TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID  } from '@angular/core';
import { NgClass } from '@angular/common';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {NgForm} from '@angular/forms';
import { DepositApplicationModel } from '../../models/deposit-application-model';
import { AppService } from '../../app.service';
import {AddressModel} from '../../models/address-model';
import { ApplicantModel } from '../../models/applicant-model';
import {countries,incomeRange, employmentTypes} from '../../data/data-constants';
import { Observable }         from 'rxjs/Observable';


//console.log(countries);

@Component({
  selector: 'prospect-form',
  templateUrl: './prospect-form.component.html'
})
@Injectable()
export class ProspectFormComponent implements OnInit {
  jointAccount: boolean;
  submitted: boolean = false;
  depositApplicationModel:DepositApplicationModel;
  active:boolean = true;
  fundOwnershipArray:string[];
  fundingTypeArray:string[];
  citizenshipCountryArray:string[];
  annualIncomeArray:string[];
  employmentStatusArray:string[];
  productId:string[];
  router:Router;
  route: ActivatedRoute;

  constructor(private appService: AppService, router: Router, route: ActivatedRoute) {
      this.router = router;
      this.depositApplicationModel = appService.depositApplicationModel;
      this.jointAccount = appService.jointAccount;
      this.citizenshipCountryArray = countries;
      this.annualIncomeArray = incomeRange;
      this.employmentStatusArray = employmentTypes;
      this.route = route;
      this.productId;

      if(this.jointAccount){
        this.fundOwnershipArray = ["primary","secondary","both"];
      }else{
        this.fundOwnershipArray = ["primary"];
        this.depositApplicationModel.fundingDetails.externalAccountDetails.accountOwnership = "primary";
      }
  }



  submitPersonalInfo(personalInfoForm:NgForm) {
    this.submitted = true;
    if(personalInfoForm.form.valid){
      this.appService.jointAccount = this.jointAccount;
      this.router.navigateByUrl('/confirm-info');
    }
  }

  get diagnostic() { return JSON.stringify(this.depositApplicationModel); }

  ngOnInit() {
    this.active = false;
    setTimeout(() => this.active = true, 0);

    this.productId = this.route.snapshot.queryParams['productId'];
    this.depositApplicationModel.productId = this.productId.toString();
  }

  onSliderToggle(jointAccount: boolean){
    this.jointAccount=jointAccount;
    if(jointAccount){
      this.addApplicant();
    }else{
      this.removeApplicant();
    }
  }

  addApplicant(){
   if(this.depositApplicationModel.applicants.length == 1){
     let applicant2: ApplicantModel = new ApplicantModel();
     applicant2.applicantRole = "Secondary";
     this.depositApplicationModel.applicants.push(applicant2);
     this.fundOwnershipArray = ["primary","secondary","both"];
   }
  }
  removeApplicant(){
    if(this.depositApplicationModel.applicants.length == 2){
      this.depositApplicationModel.applicants.splice(1,1);
      this.fundOwnershipArray = ["primary"];
      this.depositApplicationModel.fundingDetails.externalAccountDetails.accountOwnership = "primary";
    }
  }
}
