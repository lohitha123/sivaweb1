export class VM_POU_MNGT_ORDER_DETAILS {
    public ORDER_NO: number
    public VENDOR_ID: string;
    public ORDER_DATE: string;
    public ORG_ID: string;
    public PAR_LOC_ID: string;
    public DEPARTMENT_ID: string;
    public LOCATION_TYPE: string;
    public REQUISITION_NO: string;
    public DETAILS: any = [];
    public txtqty: string;
    public txtRCDqty: string;
    public txtstatus: string;
    public styleExpand: string = "right";
    public COST_CENTER_CODE: string;
    public INV_BUNIT: string;
    public CREATE_USER: string;
}