import { VM_MT_POU_CASE_CART_HEADER_TB } from "../../app/Entities/VM_MT_POU_CASE_CART_HEADER_TB";
import { VM_MT_POU_CASE_DISCRIPTON } from "../../app/Entities/VM_MT_POU_CASE_DISCRIPTON";
import { VM_MT_POU_CASE_CART } from "../../app/Entities/VM_MT_POU_CASE_CART";

export class VM_MT_POU_CASE_CART_HEADER {
    public lstCaseforQA: Array<VM_MT_POU_CASE_CART_HEADER_TB>;
    public lstCaseInfo: Array<VM_MT_POU_CASE_CART_HEADER_TB>;
    public lstDstCaseCartHeader: Array<VM_MT_POU_CASE_DISCRIPTON>;
    public lstDescDistCase: Array<VM_MT_POU_CASE_DISCRIPTON>;
    public lstCaseIdDesc: Array<VM_MT_POU_CASE_CART>;
}