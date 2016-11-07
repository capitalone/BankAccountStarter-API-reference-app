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

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppService } from '../../app/app.service';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: 'slide-toggle.component.html'
})
export class SlideToggleComponent implements OnInit {
  leftRight: number;
  slideClicked: number;
  isActiveIconLeft: boolean;
  leftText:string = "Individual Account";
  leftTextShort:string = "Single";
  rightText:string = "Joint Account";
  rightTextShort:string = "Joint";
  jointAccount: boolean;
  @Output() onSliderToggle = new EventEmitter<boolean>();

  constructor(private appService: AppService) {
    this.jointAccount = appService.jointAccount;
  }

  ngOnInit() {
    this.toggleClick(this.jointAccount?1:0);
  }

  toggleClick(slideClicked: number) {
  // Left is 0, right is 1
  this.leftRight = slideClicked === 0 ? 0 : 1;
  if(slideClicked==1){
  this.jointAccount=true;
  this.isActiveIconLeft = false;
  }else{
  this.jointAccount=false;
  this.isActiveIconLeft = true;
  }
  this.onSliderToggle.emit(this.jointAccount);
}

}
