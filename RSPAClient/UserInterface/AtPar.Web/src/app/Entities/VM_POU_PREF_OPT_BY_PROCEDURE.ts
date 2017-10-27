import { VM_POU_PREF_OPT_BY_PHYSICIAN } from '../Entities/VM_POU_PREF_OPT_BY_PHYSICIAN';

export class VM_POU_PREF_OPT_BY_PROCEDURE {
    public SPECIALTY_CODE: string;
    public PROCEDURE_CODE: string;
    public PROCEDURE_DESCRIPTION: string;
    public NO_OF_PHYSICIANS: any;
    public NO_OF_PROCEDURES: any;
    public NO_OF_PREF_LISTS: any;
    public EFFICIENCY_PERCENTAGE: any;
    public TOTAL_PICKED_QTY: any;
    public TOTAL_PICKED_VALUE: any;
    public TOTAL_ISSUED_EXISTING_QTY: any;
    public TOTAL_ISSUED_EXISTING_VALUE: any;
    public TOTAL_ISSUED_NEW_QTY: any;
    public TOTAL_ISSUED_NEW_VALUE: any;
    public TOTAL_RETURN_QTY: any;
    public TOTAL_RETURN_VALUE: any;
    public TOTAL_WASTED_QTY: any;
    public TOTAL_WASTED_VALUE: any;
    public TOTAL_USAGE: any;
    public ISSHOW: boolean;
    public PHYSICIAN_DETAILS: VM_POU_PREF_OPT_BY_PHYSICIAN[] = [];
    public SHOW_PHYSICIAN_GRID: boolean = false;//ShowPhysicianGrid
    public IS_PREF_CARD_OPT_PHYSICIAN_ROW: boolean=false;
}


      