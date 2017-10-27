

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
    public class VM_MT_POU_CASE_CART_HEADER
    {
        public List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseforQA { get; set; }
        public List<VM_MT_POU_CASE_CART_HEADER_TB> lstCaseInfo { get; set; }
        public List<VM_MT_POU_CASE_DISCRIPTON> lstDstCaseCartHeader { get; set; }
        public List<VM_MT_POU_CASE_DISCRIPTON> lstDescDistCase { get; set; }
        public List<VM_MT_POU_CASE_CART> lstCaseIdDesc { get; set; }
    }
}
