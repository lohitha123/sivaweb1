import { MT_POU_QTY_ONHAND_ITEM_DETAILS } from './MT_POU_QTY_ONHAND_ITEM_DETAILS'
export class MT_POU_QTY_ONHAND_ITEM_HEADERS {
    public BUSINESS_UNIT; string;
    public ITEM_PRICE: any;
    public CART_ID: string;
    public COMPARTMENT: string;
    public ITEM_ID: string;
    public UOM: string;
    public ITEM_DESCRIPTION: string;
    public REPORT_KEY: string;
    public ITEM_QUANTITY_PAR: any;
    public PAR_VALUE: any;
    public ITEM_QUANTITY_ON_HAND: any;
    public ACTUAL_QUANTITY: string;
    public ON_HAND_VALUE: any;
    public TODAY_USAGE: string;
    public TODAY_USAGE1: string;
    public VENDOR_ID: string;  
    public DETAILS: MT_POU_QTY_ONHAND_ITEM_DETAILS[] = [];   
}
