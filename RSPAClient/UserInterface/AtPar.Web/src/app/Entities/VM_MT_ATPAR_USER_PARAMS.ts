import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';
export class VM_MT_ATPAR_USER_PARAMS {

    public PARAMETER_ID: string;
    public PARAMETER_VALUE: any;
    public LONG_DESCR: string;
    public SHORT_DESCR: string;
    public PARAMETER_TYPE: string;
    public VALIDATION: string;
    public MULTIPLE_VALUES: string;
    public REQUIRED_FLAG: string;
    public PROMPT_TABLE: string;
    public PROMPT_FIELD: string;
    public WHERE_CONDITION: string;
    public validationRules: string;//ATPAR_VALIDATION_RULES[];
    public IsValidate: boolean;
    public DDLLIST: any;
    public TITLE: any;
}