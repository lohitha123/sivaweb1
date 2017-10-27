export class MT_POU_CASE_TRACK_HISTORY {
    public ID: number;
    public CASE_ID: string;
    public PREF_LIST_ID: string;
    public PROCEDURE_CODE: string;
    public PATIENT_ID: string;
    public DEPARTMENT_ID: string;
    public CASE_STATUS?: number;
    public UPDATE_USER_ID: string;
    public WORKSTATION_MAC_ADDRESS: string;
    public UPDATE_DT_TIME:  Date;
    public CASE_PICK_STATUS?: number;
    public TRANSACTION_ID?: number;
    public CHARGE_CAPTURE_TRANS_ID?: number;
    public PERFORM_DATE?: Date;
    public COMMENTS: string;
}