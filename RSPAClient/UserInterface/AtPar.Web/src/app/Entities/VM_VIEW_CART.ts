export class VM_VIEW_CART {
    public ID: number;
    public ITEM_ID: string;
    public CHK_VALUE: number;
    public ITEM_TYPE_INDICATOR: string;
    public ITEM_DESCR: string;
    public ITEM_QTY?: number;
    public IMAGE: string;
    public LOCATION_ID: string;
    public SERIAL_NO: number;
    public PATIENT_ID: string;
    public PATIENT_LAST_NAME: string;
    public REQUEST_QTY: number;
    public DUE_DATE: any;
    public RETURN_DATE: any;
    public NEEDED_BY_DATE: any;
    public ESTIMATED_RETURN_DATE: any;
    public PROCEDURE_CODE: string;
    public DUE_TIME: any;
    public RETURN_TIME: any;
    public BMPIMAGE: string;

    public blnShowItemImage: boolean = true;
    public blnShowQtyAvailable: boolean = true;
    public blnShowSelectQty: boolean = true;
    public blnShowDueDateTime: boolean = true;
    public blnShowAvailableTo: boolean = true;
    public blnShowReturnDateTime: boolean = true; 
}