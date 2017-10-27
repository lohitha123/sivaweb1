﻿export class VM_MT_POU_CONSIGNEDBILLONLY_ITEMS {
    public ITEM_ID: string;
    public ORG_GROUP_ID: string;
    public DEPT_ID: string;
    public DESCRIPTION: string;
    public USER_ID: string;
    public KEYVALUE: string;
    public UPC_ID: string;
    public MFG_ITEM_ID: string;
    public VEND_ITEM_ID: string;
    public MANUFACTURER: string;
    public VENDOR_ID: string;
    public LOT_ID: string;
    public SERIAL_ID: string;
    public EXPIRY_DATE?: Date;
    public CATALOG_FLG: string;
    public LAST_UPDATE_DATE?: Date;
    public LAST_UPDATE_USER: string;
    public ITEM_PRICE?: number;
    public UOM: string;
    public GTIN: string;
    public UOM_ISSUE: string;
    public UOM_PROCUREMENT: string;
    public CONV_FACTOR: number;
    public PRICE: number;
    public STATUS: number;
    public SERIAL_CONTROLLED: string;
    public LOT_CONTROLLED: string;
    public CHARGE_CODE: string;
    public REPLENISHMENT_TYPE: string;
    public PAR_LOC_ID: string;
    public BUSINESS_UNIT: string;
    public BIN: string;
    public COUNT_ORDER: number;
    public OPTIMAL_QTY: number;
    public COUNT_REQUIRED: string;
    public FILL_KILL_FLAG: string;
    public MAX_QTY: number;
    public FOQ_QTY: number;
    public ORDERING_TYPE: string;
    public COST_CENTER: string;
    public REQUISITION_TYPE: string;
    public USER_FIELD_1: string;
    public PAR_UOM: string;
    public CONV_RT_PAR_UOM: number;
        //Manage Consigned & BillOnly Items
    public ACTUAL_ITEM_ID: string;
    public CUST_ITEM_NO: string;
    public TRANSACTION_ID: number;
    public REVEIWER_TYPE: string;
    public VENDOR_NAME: string;
    public TRANSACTION_DATE: string;
    public DEPARTMENT_ID: string;
    public DEPT_NAME: string;
    public SHORT_DESCR: string;
    public ISSUE_PRICE?: number;
    public ITEM_LOTNUMBER: string;
    public ITEM_SRNUMBER: string;
    public PO_NO: string;
    public VENDOR_REVIEW_STATUS: string;
    public DEPT_REVIEW_STATUS: string;
    public EXCEPTION_REVIEW_STATUS: string;
    public WORKFLOW_INSTANCE_ID: any;
    public EXCP_APPROVAL_REQ: string;
    public PAR_LOCATION_ID: string;
    public QTY: number;
    public LINE_NO: string;
    public LINE_COMMENTS: string;
    public CAPTURE_DATE_TIME?: Date;
    //grid values
    public isReviewStatusVisible: boolean;
    public isReviewStatusDisable: boolean;
    public isVerndorChecked: boolean;
    public isDeptChecked: boolean;
    public isExceptionChecked: boolean;
    public isVerndorCBDisable: boolean ;
    public isDeptCBDisable: boolean;
    public isExceptionCBDisable: boolean;
    public istxtItemIdVisible: boolean;
    public blnCancel: boolean;
    public blnCancelDisable: boolean;
    public blnEdit: boolean;
    public blnEditDisable: boolean;
    public blnSave: boolean;
    public blnAbandon: boolean;
    public blnHoldUnhold: boolean;
    public blnHoldUnholdDiable: boolean;
    public blnUpdate: boolean;
    public holdBGColor: string;
    public parentRIndex: number;
    public childRIndex: number;
    public OLD_LINE_COMMENTS: string;
    public OLD_UOM: string;
    public OLD_ISSUE_PRICE?: number;
    public isOldVerndorCBDisable: boolean;
    public isOldDeptCBDisable: boolean;
    public isOldExceptionCBDisable: boolean;
    public titleHoldUnhold: string;


}