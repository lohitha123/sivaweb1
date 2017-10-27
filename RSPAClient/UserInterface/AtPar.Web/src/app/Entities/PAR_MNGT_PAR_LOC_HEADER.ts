export class PAR_MNGT_PAR_LOC_HEADER {
    public ORG_ID: string;
    public PAR_LOC_ID: string;
    public LOCATION_NAME: string;
    public CART_TYPE: string;
    public COST_CENTER_CODE: string;
    public STATUS?: boolean;
    public POU_CART: string;
    public ASSET_ACCOUNT: string;
    public SHIPTO_ID: string;
    public DELV_LOC_ID: string;
    public DELV_LOC_ADDRESS_1: string;
    public DELV_LOC_ADDRESS_2: string;
    public DELV_LOC_CITY: string;
    public DELV_LOC_STATE: string;
    public DELV_LOC_ZIP: string;
    public DELV_LOC_COUNTRY: string;
    public LAST_UPDATE_DATE:  Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public PERPECTUAL_IN_MMIS?: boolean;
    public PARLOC_TYPE: string;
}