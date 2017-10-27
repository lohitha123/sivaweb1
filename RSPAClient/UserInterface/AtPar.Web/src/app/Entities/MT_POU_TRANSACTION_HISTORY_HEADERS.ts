
import { MT_POU_TRANSACTION_HISTORY_DETAILS } from './MT_POU_TRANSACTION_HISTORY_DETAILS'
export class MT_POU_TRANSACTION_HISTORY_HEADERS {

     public CUST_ITEM_ID: string;
     public ITEM_ID: string;
     public ITEM_DESCR: string;
     public CART_ID: string;
     public COMPARTMENT: string;
     public UPC_ID; string;
     public VNDR_ITEM_ID: string;
     public MFG_ITEM_ID: string;
     public ON_HAND_QTY: any;
     public QOH: any;
     public PAR_UOM: string;
     public DETAILS: MT_POU_TRANSACTION_HISTORY_DETAILS[]=[];

} 