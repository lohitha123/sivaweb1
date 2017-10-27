export class MT_ATPAR_PATIENT_CACHE {
    public ORG_ID: string;
    public PATIENT_MRC: string;
    public PATIENT_ACCNUMBER: string;
    public PATIENT_NAME: string;
    public PATIENT_BEDNUMBER: string;
    public PATIENT_DEPARTMENT: string;
    public PATIENT_SEX: string;
    public PATIENT_CLASS: string;
    public MESSAGE_DATETIME:  Date;
    public PATIENT_ADMIT_DATE?: Date;
    public PATIENT_DISCHARGE_DATE?: Date;
    public PATIENT_VISIT_NUMBER: string;
    public STATUS: string;
    public OLD_PATIENT_MRC: string;
    public RBFlAG: boolean = false; 
    public ITEM_ID: string;
}