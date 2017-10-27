using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.ViewModel;


namespace AtPar.Repository.Interfaces.Init
{
    public interface IReportsAdHocExtensionRepository
    {

        List<VM_MT_USER_DETAILS> GetOrgGroupsProductUsers(string userID, Guid? reportID);

        
    }
}