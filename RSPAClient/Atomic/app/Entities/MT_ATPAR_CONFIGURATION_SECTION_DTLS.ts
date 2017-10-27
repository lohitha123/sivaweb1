import { ATPAR_VALIDATION_RULES } from '../entities/atpar_validation_rules';

export class MT_ATPAR_CONFIGURATION_SECTION_DTLS {
    public TAB_ID: string;
    public TAB_NAME: string;
    public PARAMETER_ID: string;
    public FRIENDLY_NAME: string;
    public DESCRIPTION: string;
    public TYPE: string;
    public VALIDATION_RULES: string;
    public DEFAULT_VALUE: any;
    public PARAMETER_VALUE: any;
    public TOOL_TIP_INFO: string;
    public VALID_FOR_ERP: string;
    public DISPLAY_FLAG: string;
    public DISPLAY_ORDER?: number;
    public MinLength: number = 2;
    public MaxLength: number = 10;
    public VALIDATIONMessage: string;
    public IsValidate: boolean;
    public validationRules: ATPAR_VALIDATION_RULES[];
}