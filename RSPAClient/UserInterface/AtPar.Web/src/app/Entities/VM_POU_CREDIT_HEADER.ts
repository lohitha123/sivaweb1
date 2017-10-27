import { VM_POU_CREDIT_DETAILS } from './VM_POU_CREDIT_DETAILS';
export class VM_POU_CREDIT_HEADER {
    public TRANSACTION_ID: number;
    public PATIENT_ID: string;
    public ACCOUNT_ID: string;
    public EXAM_ID: string;
    public COMMENTS: string;
    public DATE_OF_SERVICE: string;
    public PATIENTID_CHANGED: string;
    public DATE_TIME: string;
    public PATIENT_NAME: string;
    public CAPTURE_DATE_TIME: string;
    public USER_ID: string;
    public REVIEWED: boolean;
    public DEPARTMENT_ID: string;
    public DETAILS: VM_POU_CREDIT_DETAILS[] = [];
}