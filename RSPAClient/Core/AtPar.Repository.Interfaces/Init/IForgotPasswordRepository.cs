using AtPar.POCOEntities;
using AtPar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.Repository.Interfaces.Init
{
    public interface IForgotPasswordRepository
    {
        List<VM_MT_ATPAR_FORGOT_PWD> ForgotPwd(string[] deviceTokenEntry, string userID, string hintQ, string hintA = "", string newPwd = "");   

        List<string> ChkPasswdHistory(string userId, string passHash);

        string UpdatePassword_SelectPassHashByUserId(string uname);

        long UpdatePasswdWithoutHintQuest(string hashedNewPwd, string uname);

        long UpdatePasswdWithHintQuest(string hashedNewPwd, string uname, string hintQ, string hintA);

        long UpdateUserACL(string datetime, int pswExpPeriod, string uname);

        long InsertPasswordHistory(string uname, string hashedNewPwd, string dateTime);
    }
}
