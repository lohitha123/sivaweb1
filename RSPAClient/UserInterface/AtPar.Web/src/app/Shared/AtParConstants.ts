
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';


export class AtParConstants {
    public static count: boolean = false;
    public static PRODUCT_NAME: string = 'AtPar';
    public static isclicked = true;
    public static ClientErrorMessage: string = 'Internal Client Error';
    public static GrowlTitle_Warn: string = 'Warn';
    public static GrowlTitle_Error: string = 'Error';
    public static GrowlTitle_Info: string = 'Info';
    public static GrowlTitle_Success: string = 'Success';
    //<Label excluding ID> <Value> <Created/Updated/Added/Deleted> <Successfully>
    public static Created_Msg: string = "1% 2% Created Successfully";//Ex:Org Group(1%) HUMC(2%) Created Successfully 
    public static Updated_Msg: string = "1% 2% Updated Successfully";//Ex: Org Group(1%) HUMC(2%) Updated Successfully
    public static Updated_Status_Msg: string = "1% 2% Status Updated Successfully";//Ex: Org Group(1%) HUMC(2%) Status Updated Successfully  
    public static Deleted_Msg: string = "1% 2% Deleted Successfully";//Ex: Org Group(1%) HUMC(2%) Deleted Successfully 
    public static AlreadyExist_Msg: string = "1% 2% Already Exists";//Ex:Org Group(1%) HUMC(2%) Created Successfully 
    public static Added_Msg: string = "1% 2% Added Successfully";//Ex:Org Group(1%) HUMC(2%) Added Successfully

    constructor(@Inject(DOCUMENT) private document) {
    }



    public catchClientError(statusMsgs: Message[], spnrService: SpinnerService, errorMsg, funName = "", compName = "") {
        spnrService.stop();      
        statusMsgs.push({ severity: 'error', summary: AtParConstants.GrowlTitle_Error, detail: AtParConstants.ClientErrorMessage + ":" + errorMsg.toString() });

    }

    public scrollToTop() {
        var elmnt = this.document.getElementById('main-section');
        elmnt.scrollTop = 0;

    }
}