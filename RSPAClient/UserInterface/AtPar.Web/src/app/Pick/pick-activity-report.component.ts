import { Component } from '@angular/core';
import { EnumApps } from '../Shared/AtParEnums';
declare var module: {
    id: string;
}
@Component({
  
    templateUrl:  'pick-activity-report-component.html'
})

export  class  ActivityReportComponent  {
    pickProductId: number = EnumApps.PickPlan;
} 
