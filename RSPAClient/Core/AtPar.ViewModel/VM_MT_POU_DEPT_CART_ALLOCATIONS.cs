

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_DEPT_CART_ALLOCATIONS
    {
        public List<VM_MT_POU_DEPT_CART_ALLOCATIONS_TB> lstPouDeptCartAllocation { get; set; }
        public List<VM_MT_POU_CHARGECAPTURE_DETAILS> lstPouChargeCaptureDetails { get; set; }
        public List<VM_MT_POU_CASE_CART_DETAILS> lstPouCaseCartAllocation { get; set; }
        public List<VM_MT_POU_PHYSICIAN> lstPouPhysician { get; set; }
        public List<VM_MT_ATPAR_SERIAL> lstPouLotSerial { get; set; }
    }
}
