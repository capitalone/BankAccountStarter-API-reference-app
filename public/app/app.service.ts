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

import { Injectable }       from '@angular/core';
import { DepositApplicationModel } from './models/deposit-application-model';
import { AddressModel } from './models/address-model';
import {FundingDetailsModel} from './models/funding-details-model';
import {ExternalAccountDetailsModel} from './models/external-account-details-model';
import {TermsAndConditionsModel} from './models/terms-and-conditions-model';
import { ApplicantModel } from './models/applicant-model';
import { Observable }     from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions} from '@angular/http';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';


@Injectable()
export class AppService {
  depositApplicationModel:DepositApplicationModel;
  bankABANumber: String;
  accountNumber: String;
  jointAccount:boolean;
  private depositApplicationUrl = '/deposits/account-applications';  // URL to web API
  constructor(private http: Http){
    this.depositApplicationModel= new DepositApplicationModel();
    this.jointAccount = false;
  }

createAccount(): Observable<any> {
    let body = JSON.stringify(this.depositApplicationModel);
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept':'application/json;v=2'
      });
    let options = new RequestOptions({ headers: headers, method: "post" });

  return this.http.post(this.depositApplicationUrl, body,options)
                  .map(this.extractData)
                  .catch(this.handleError);
  }

private extractData(res: Response) {
  let body = res.json();
  return body || { };
}
private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(errMsg); // log to console instead
  return Observable.throw(errMsg);
}
}
