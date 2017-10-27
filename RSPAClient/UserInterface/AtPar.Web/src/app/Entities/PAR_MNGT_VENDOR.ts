/// <reference path="atpar_validation_rules.ts" />
import { ATPAR_VALIDATION_RULES } from "./atpar_validation_rules";
export class PAR_MNGT_VENDOR {
    public ORG_GROUP_ID: string;
    public VENDOR_ID: string;
    public VENDOR_NAME: string;
    public CONTACT_NAME: string;
    public ADDRESS1: string;
    public ADDRESS2: string;
    public CITY: string;
    public STATE: string;
    public COUNTRY: string;
    public ZIP: string;
    public PHONE: string;
    public FAX: string;
    public CONTACT_E_MAIL: string;
    public ORDER_DESPATCH_TYPE: string;
    public STATUS?: boolean;
    public LAST_UPDATE_DATE:  Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public ALLOW_VEND_ACCESS: any;
    public BILL_ONLY_EMAIL: string;
    public REMINDER_FREQ: number;
    public VEND_USER_ID: string;
    public ADD_ITEMS_LFLAG: string;
    public MODE: string = "ADD";
    public validationRules: ATPAR_VALIDATION_RULES[];
}