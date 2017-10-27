export class TKIT_ITEM_INVENTORY {
    public ORG_GROUP_ID: string;
    public ITEM_TYPE: string;
    public ITEM_ID: string;
    public SERIAL_NO: string;
    public LOT_NO: string;
    public ITEM_QTY?: number;
    public STORAGE_LOCATION: string;
    //public SERVICE_DT_TIME?: Date;
    public SERVICE_DT_TIME: any;
    public STATUS?: boolean;
    public USER_FIELD_1: string;
    public USER_FIELD_2: string;
    public AVAILABILITY?: boolean;
    public OWNER: string;
    public OWNER_TYPE: string;
    public CHECKIN_DATE?: Date;
    public UPDATE_DATE?: Date;
    public UPDATE_USER_ID: string;
    public ROW_INDEX: number;
    public Disable: boolean;
    public ASSET_ID: string;
    public ASSET_IDPART1: string;
}