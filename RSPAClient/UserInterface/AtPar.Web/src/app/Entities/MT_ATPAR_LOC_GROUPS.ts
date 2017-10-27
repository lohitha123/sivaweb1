export class MT_ATPAR_LOC_GROUPS {
    public ORG_GROUP_ID: string;
    public LOC_GROUP_ID: string;
    public LOC_DESCR: string;
    public STATUS: boolean;
    public LAST_UPDATE_DATE:  Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;

    //Addition field for front-end handling
    public checkvalue: boolean;
    public DEFAULT_PRINTER: string;
    public COUNT_FLAG: string;
    public ALLOW_SIC_CONSIGN: string;
    public CHK_VALUE: number;
    public CHK_ALLOCATED: number;
    public USERNAME: string;
    public ROWINDEX: number;

    public CHK_ALLOCATED_CNTFLG: string;
    public ROWINDEXFORCNTFLG: string;
    public CHK_ALLOCATED_CONSFLG: string;
    public ROWINDEXFORCONSFLG: string;
}