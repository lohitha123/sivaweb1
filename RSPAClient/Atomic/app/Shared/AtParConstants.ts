
import { SpinnerService } from '../components/spinner/event.spinner.service';
import { Message } from './../components/common/api';

export class AtParConstants {
    public static PRODUCT_NAME: string = 'AtPar';
    public static ClientErrorMessage: string = 'Internal Client Error';

    public catchClientError(statusMsgs: Message[], spnrService: SpinnerService, errorMsg) {
        spnrService.stop();      
        statusMsgs.push({ severity: 'error', summary: 'error', detail: AtParConstants.ClientErrorMessage + ":" + errorMsg.toString() });

    }
}