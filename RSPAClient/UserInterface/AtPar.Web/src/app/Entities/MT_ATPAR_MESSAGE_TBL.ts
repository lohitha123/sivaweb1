export class MT_ATPAR_MESSAGE_TBL {
    public MESSAGE_ID: number;
    public FROM_USER: string;
    public TO_USER: string;
    public MESSAGE_TEXT: string;
    public CREATED_DATE?: Date;
    public SERVER_DELIVERED_DATE?: Date;
    public FINAL_DELIVERED_DATE?: Date;
    public READ_DATE?: Date;
    public DELETED_DATE?: Date;
    public STATUS: string;
    public LAST_UPDATE_DATE?: Date;
}