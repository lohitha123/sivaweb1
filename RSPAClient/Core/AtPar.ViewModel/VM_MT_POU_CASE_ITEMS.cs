

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AtPar.ViewModel
{
    public class VM_MT_POU_CASE_ITEMS
    {
        public IList<VM_MT_POU_DEPT_CART_ALLOCATIONS_TB> lstPouDeptCartAllocation { get; set; }
        public IList<VM_MT_POU_CHARGECAPTURE_DETAILS> lstPouChargeCaptureDetails { get; set; }
        public IList<VM_MT_POU_CASE_CART_DETAILS> lstPouCaseCartDetails { get; set; }
        public IList<VM_MT_POU_PHYSICIAN> lstPouPhysician { get; set; }
        public IList<VM_MT_ATPAR_SERIAL> lstPouAtParSerial { get; set; }
    }
}
