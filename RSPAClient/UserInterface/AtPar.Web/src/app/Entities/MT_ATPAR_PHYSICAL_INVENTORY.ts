export class MT_ATPAR_PHYSICAL_INVENTORY {
    public ORG_ID: string;
    public INV_ITEM_ID: string;
    public UOM: string;
    public STOR_LOC: string;
    public CHARGE_CODE: string;
    public LOT_ID: string;
    public SERIAL_ID: string;
    public DEFAULT_LOC_FLAG: string;
    public QUANTITY_ON_HAND?: number;
    public LAST_UPDATE_DATE?: Date;
    public REPLENISHMENT_TYPE: string;
    public STATUS?: boolean;
}