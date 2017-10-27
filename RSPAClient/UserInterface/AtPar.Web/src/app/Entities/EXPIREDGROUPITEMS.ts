import { VM_GETEXPIRETRACKREP } from './vm_getexpiretrackrep';

export class EXPIREDGROUPITEMS {
    public PAR_LOCATION: string;
    public BUNIT: string;
    public ExpiredItems: VM_GETEXPIRETRACKREP[] = [];
    public TotalAmount: number;
}