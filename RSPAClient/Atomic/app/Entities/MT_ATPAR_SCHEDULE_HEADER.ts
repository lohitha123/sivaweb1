export class MT_ATPAR_SCHEDULE_HEADER {
    public ORG_GROUP_ID: string;
    public SCHEDULE_ID: string;
    public DESCRIPTION: string;
    public STATUS?: number;
    public SCHEDULE_TYPE?: number;
    public LAST_UPDATE_DATE?: Date;
    public LAST_UPDATE_USER: string;
    public LAST_CLIENT_ADDRESS: string;
    public CREATED_USER: string;
    public CREATED_DATE?: Date;
    public START_TIME?: Date;
    public END_TIME?: Date;
    public INTERVAL?: number;
}