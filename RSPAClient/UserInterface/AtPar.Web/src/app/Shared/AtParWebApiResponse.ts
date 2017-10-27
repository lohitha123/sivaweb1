
import { StatusType } from './atparenums';
export class AtParWebApiResponse<T> {
    Data: T;
    DataList: T[];
    DataVariable: Object;
    ExceptionMessage: string;
    StatType: StatusType;
    StatusCode: any;
    StatusMessage: string; 
    DataDictionary: T[];
}