export class MT_RECV_DEVIATION_DETAILS {
    public TRANSACTION_ID: number;
    public LINE_NO: number;
    public SERIAL_ID: string;
    public LOT_ID: string;
    public RECV_UOM: string;
    public RECV_CONVERSION_RATE?: number;
    public QTY?: number;
    public EXPIRY_DATE?: Date;
}