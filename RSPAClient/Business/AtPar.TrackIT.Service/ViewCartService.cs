using AtPar.Common;
using AtPar.Common.Service;
using AtPar.POCOEntities;
using AtPar.Repository.Interfaces.Common;
using AtPar.Repository.Interfaces.TrackIT;
using AtPar.Service.Interfaces.TrackIT;
using AtPar.ViewModel;
using AtParEncryptionServices;
using log4net;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;


namespace AtPar.TrackIT.Service
{
    public class ViewCartService : IViewCartService
    {
        IViewCartRepository _Repo;
        ILog _log;
        ICommonRepository _commonRepo;
        IManageEquipmentItemsRepository _manageEquipmentItemsRepo;

        public ViewCartService(IViewCartRepository repo, ILog log, ICommonRepository commonRepository, IManageEquipmentItemsRepository manageEquipmentItemsRepo)
        {
            _Repo = repo;
            _log = log;
            _commonRepo = commonRepository;
            _manageEquipmentItemsRepo = manageEquipmentItemsRepo;
        }

        #region public methods

        public AtParWebApiResponse<long> ClearCart(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _Repo.ClearCart(deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> DeleteCartItem(int id)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.StatusCode = _Repo.DeleteCartItem(id);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> PlaceOrder(List<TKIT_ORDER_DETAILS> lstOrderDetails,
                                                            string comments, string requestor, string requrestID, string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();
            List<TKIT_ORDER_DETAILS> lstOrderDetailsSendMail = new List<TKIT_ORDER_DETAILS>();
            Tuple<long, string> tupleOutput;
            string OrderID = null;
            long StatusCode = -1;
            try
            {
                tupleOutput = _Repo.PlaceOrder(lstOrderDetails, comments, requrestID, deviceTokenEntry);

                StatusCode = tupleOutput.Item1;
                OrderID = tupleOutput.Item2;



                if (StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(StatusCode, _commonRepo, _log);
                    return response;
                }
                else
                {
                    foreach (var item in lstOrderDetails)
                    {
                        List<VM_TKIT_ITEM_DETAILS> ordermailDetails = new List<VM_TKIT_ITEM_DETAILS>();
                        ordermailDetails = _manageEquipmentItemsRepo.GetEquipmentItemDetails("Equpiment", item.ITEM_ID);

                        if (ordermailDetails != null)
                        {
                            if (ordermailDetails.Count > 0)
                            {

                                if (ordermailDetails[0].OWNER_TYPE == AtParWebEnums.Tkit_OwnerType_Enum.R.ToString())
                                {
                                    item.VENDOR = ordermailDetails[0].VENDOR;
                                    lstOrderDetailsSendMail.Add(item);

                                }
                            }
                        }
                    }


                    if (lstOrderDetailsSendMail.Count > 0)
                    {
                        DataSet dsSendDetails = new DataSet();
                        dsSendDetails = lstOrderDetailsSendMail.ToDataSet();


                        DataTable tblHeader = new DataTable("ORDER_HEADER");
                        tblHeader.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
                        tblHeader.Columns.Add("ORDER_NO", Type.GetType("System.Int32"));
                        tblHeader.Columns.Add("COMMENTS", Type.GetType("System.String"));
                        tblHeader.Columns.Add("REQUESTOR", Type.GetType("System.String"));

                        DataTable tblItems = new DataTable("ORDER_ITEMS");
                        tblItems.Columns.Add("ITEM_ID", Type.GetType("System.String"));
                        tblItems.Columns.Add("ITEM_DESCR", Type.GetType("System.String"));
                        tblItems.Columns.Add("REQUEST_QTY", Type.GetType("System.Int32"));
                        tblItems.Columns.Add("VENDOR_ID", Type.GetType("System.String"));
                        tblItems.Columns.Add("LOCATION_ID", Type.GetType("System.String"));
                        tblItems.Columns.Add("IMAGE", Type.GetType("System.String"));
                        tblItems.Columns.Add("ORDER_NO", Type.GetType("System.Int32"));


                        string strDeliverLoc = String.Empty;
                        string strInventoryOrderFlg = string.Empty;
                        string strVendorID = string.Empty;
                        string strItemID = string.Empty;
                        string strComprtID = string.Empty;
                        string strItemDesc = string.Empty;
                        string strPrevVendorId = string.Empty;
                        double dblQOH = 0;
                        string strUOM = string.Empty;
                        string strImage = string.Empty;
                        int lineNo = 0;
                        int requestQTY = 0;
                        long orderNo = -1;
                        for (int i = 0; i <= dsSendDetails.Tables["Table1"].Rows.Count - 1; i++)
                        {
                            DataRow dr = dsSendDetails.Tables["Table1"].Rows[i];

                            strVendorID = dr["VENDOR"].ToString();
                            strItemID = dr["ITEM_ID"].ToString();
                            strItemDesc = (dr["ITEM_DESCR"]).ToString();
                            strImage = dr["IMAGE"].ToString();
                            requestQTY = Convert.ToInt32(dr["REQUEST_QTY"]);
                            strDeliverLoc = dr["LOCATION_ID"].ToString();

                            if (strPrevVendorId != strVendorID || i == 0)
                            {
                                DataRow drhdr = tblHeader.NewRow();
                                drhdr["VENDOR_ID"] = strVendorID;
                                drhdr["ORDER_NO"] = OrderID;
                                drhdr["COMMENTS"] = comments;
                                drhdr["REQUESTOR"] = requestor;
                                tblHeader.Rows.Add(drhdr);

                            }
                            DataRow dritm = tblItems.NewRow();
                            dritm["ITEM_ID"] = strItemID;
                            dritm["ITEM_DESCR"] = strItemDesc;
                            dritm["VENDOR_ID"] = strVendorID;
                            dritm["REQUEST_QTY"] = requestQTY;
                            dritm["ORDER_NO"] = OrderID;
                            dritm["IMAGE"] = strImage;
                            dritm["LOCATION_ID"] = strDeliverLoc;
                            tblItems.Rows.Add(dritm);
                        }
                        DataSet dsInputParams = new DataSet();
                        dsInputParams.Tables.Add(tblHeader);
                        dsInputParams.Tables.Add(tblItems);

                        StatusCode = ProcessVendorEmail(OrderID, dsSendDetails, deviceTokenEntry, dsInputParams);
                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            response.AtParNotOK(StatusCode, _commonRepo, _log);
                            return response;
                        }
                    }


                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public AtParWebApiResponse<long> GetRequestedItemsCount(string[] deviceTokenEntry)
        {
            var methodBaseName = this.GetType().FullName + "." + System.Reflection.MethodBase.GetCurrentMethod().Name + ": ";
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            var response = new AtParWebApiResponse<long>();

            try
            {
                response.DataVariable = _Repo.GetRequestedItemsCount(deviceTokenEntry);

                if (response.StatusCode != AtparStatusCodes.ATPAR_OK)
                {
                    response.AtParNotOK(response.StatusCode, _commonRepo, _log);
                    return response;
                }

                response.AtParSuccess();
                return response;
            }
            catch (Exception ex)
            {
                response.AtParException(ex, _commonRepo, _log);
                return response;
            }
        }

        public long ProcessVendorEmail(string OrderID, DataSet inputParameters, string[] deviceTokenEntry, DataSet inputParameters1)
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strVendorEmail = string.Empty;
            string strDeptID = string.Empty;
            string strDeptName = string.Empty;
            string strVendorID = string.Empty;
            string strBUnit = string.Empty;
            string strCartID = string.Empty;
            string strCartName = string.Empty;
            string strAddress1 = string.Empty;
            string strAddress2 = string.Empty;
            string strCostCenter = string.Empty;
            string strBUserFName = string.Empty;
            string strBUserLName = string.Empty;
            string strBUserEmail = string.Empty;
            string strBUserPhone = string.Empty;
            string strBUserFax = string.Empty;
            string comments = string.Empty;
            string requestor = string.Empty;
            DataSet dsDeptInfo = new DataSet();
            DataSet dsParlocInfo = new DataSet();
            int intAcountNum = 0;
            StringBuilder sbItemInfo = new StringBuilder();
            StringBuilder sbHtmlString = new StringBuilder();
            StringBuilder sbHeaderInfo = new StringBuilder();
            StringBuilder sbFooterInfo = new StringBuilder();
            long StatusCode = -1;
            int intOrderNo = 0;
            double dblTotalPrice = 0;


            try
            {
                DataView dvItemInfo = new DataView();
                dvItemInfo = inputParameters1.Tables[0].DefaultView;
                DataTable dtVendors = dvItemInfo.ToTable(true, "VENDOR_ID", "ORDER_NO", "COMMENTS", "REQUESTOR");

                for (int i = 0; i < dtVendors.Rows.Count; i++)
                {
                    sbFooterInfo.Remove(0, sbFooterInfo.Length);
                    sbHeaderInfo.Remove(0, sbHeaderInfo.Length);
                    sbItemInfo.Remove(0, sbItemInfo.Length);
                    sbHtmlString.Remove(0, sbHtmlString.Length);


                    strVendorID = dtVendors.Rows[i]["VENDOR_ID"].ToString();
                    intOrderNo = Convert.ToInt32(dtVendors.Rows[i]["ORDER_NO"]);
                    comments = dtVendors.Rows[i]["COMMENTS"].ToString();
                    requestor = dtVendors.Rows[i]["REQUESTOR"].ToString();
                    string OrgName = "";

                    strVendorEmail = _Repo.GetVendorEmail(strVendorID, deviceTokenEntry);
                    OrgName = _Repo.GetRequestorOrgGroup(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);

                    if (!string.IsNullOrEmpty(strVendorEmail))
                    {
                        dblTotalPrice = 0;

                        DataRow[] drCartInfo = null;
                        // DataRow[] drItems = inputParameters.Tables["Table1"].Select("1 = 1");
                        DataRow[] drItems = inputParameters1.Tables["ORDER_ITEMS"].Select("VENDOR_ID = '" + strVendorID + "' AND ORDER_NO = " + intOrderNo + "");
                        List<TKIT_REQUESTOR_DEPT> reqDepts = new List<TKIT_REQUESTOR_DEPT>();
                        reqDepts = _Repo.GetRequestorDepts(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.UserID],
                                                            deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID]);
                        string departments = string.Empty;
                        if (reqDepts != null)
                        {

                            if (reqDepts.Count > 0)
                            {
                                int k = 0;
                                string[] lstDepts = new string[reqDepts.Count];
                                foreach (var item in reqDepts)
                                {
                                    lstDepts[k] = item.DEPT_ID;
                                    k++;
                                }
                                departments = String.Join(",", lstDepts);
                            }
                        }
                        sbHtmlString.Append("<table align=left width=100%>");
                        sbHtmlString.Append("<tr><td>");

                        // Building the Header

                        sbHeaderInfo.Append("<table align=left width=100%>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Requisition / Order No : " + intOrderNo + "</span></td></tr>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Deliver To( building and room ) : ");
                        sbHeaderInfo.Append("" + drItems[0]["LOCATION_ID"] + "");
                        sbHeaderInfo.Append("</span></td></tr>");
                        sbHeaderInfo.Append("<tr> ");
                        sbHeaderInfo.Append("<td align=left><span class=c2>Department : ");
                        sbHeaderInfo.Append("" + departments + "");

                        sbHeaderInfo.Append("</span></td></tr>");
                        sbHeaderInfo.Append("<tr>");
                        sbHeaderInfo.Append("<td align=left nowrap><span class=c2>Customer Name : " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + " - " + OrgName + "</span></td></tr>");
                        sbHeaderInfo.Append("</table>");
                        sbHeaderInfo.Append("</td></tr>");



                        sbItemInfo.Append("<tr><td>");
                        sbItemInfo.Append("<table align=left width=100% style=" + (char)34 + "BORDER-COLLAPSE:collapse" + (char)34 + " border=1 bordercolor=black>");
                        sbItemInfo.Append("<tr style='font-weight:bold'><td align=center nowrap  colspan=2><span class=c2>Image</span></td>");
                        sbItemInfo.Append("<td align=center nowrap  colspan=2><span class=c2>Item ID</span></td>");
                        sbItemInfo.Append("<td align=center nowrap  colspan=2><span class=c2>Item Description</span></td>");
                        sbItemInfo.Append("<td align=center nowrap  colspan=2><span class=c2>Request Quantity</span></td>");
                        sbItemInfo.Append("<td align=center nowrap  colspan=2><span class=c2>Deliver Location</span></td></tr>");

                        DataSet dsItemInfo = new DataSet();

                        if (drItems.Length > 0)
                        {

                            for (int j = 0; j < drItems.Length; j++)
                            {

                                //string imgPath = string.Empty;
                                //string[] imgArr = drItems[j]["IMAGE"].ToString().Split('/');

                                //if (imgArr.Count() > 0)
                                //{
                                //    imgArr[imgArr.Count() - 1] = Path.GetFileNameWithoutExtension(imgArr[imgArr.Count() - 1]) + "_thumb.bmp";
                                //    imgPath = string.Join("/", imgArr);
                                //}
                                //else
                                //{
                                //    imgPath = drItems[j]["IMAGE"].ToString();
                                //}

                                sbItemInfo.Append("<tr>");
                                sbItemInfo.Append("<td align=center nowrap  colspan=2><span class=c2> <img  height=25 src='" + drItems[j]["IMAGE"] + "'/></span></td>");
                                sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + drItems[j]["ITEM_ID"] + "</span></td>");
                                sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + drItems[j]["ITEM_DESCR"] + "</span></td>");
                                sbItemInfo.Append("<td align=right nowrap  colspan=2><span class=c2>" + drItems[j]["REQUEST_QTY"] + "</span></td>");
                                sbItemInfo.Append("<td align=left nowrap  colspan=2><span class=c2>" + drItems[j]["LOCATION_ID"] + "</span></td>");
                                sbItemInfo.Append("</tr>");
                            }
                            sbItemInfo.Append("</table>");
                            sbItemInfo.Append("</td></tr>");
                        }



                        sbFooterInfo.Append("<tr><td>");
                        sbFooterInfo.Append("<table align=left width=100%>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("<td colspan=2 align=left><span class=c2>Additional Comments : " + comments + " </span></td></tr>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("</tr>");
                        sbFooterInfo.Append("<tr>");
                        sbFooterInfo.Append("<td align=left><span class=c2>");
                        sbFooterInfo.Append("This requisition was created on " + DateTime.Now.ToString("MM/dd/yyyy") + " by " + requestor + " </span></td ></tr> ");

                        sbFooterInfo.Append("</table></td></tr>");


                        sbHtmlString.Append(sbHeaderInfo);
                        var _with9 = sbHtmlString;
                        _with9.Append("<tr><td><br /></td></tr>");
                        sbHtmlString.Append(sbItemInfo);
                        var _with10 = sbHtmlString;
                        _with10.Append("<tr><td><br /></td></tr>");
                        sbHtmlString.Append(sbFooterInfo);
                        sbHtmlString.Append("</table>");

                        StatusCode = SendEmail(deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.SystemId], "AtPar - Vendor Request ( Order No " + intOrderNo + " ) – ( " + deviceTokenEntry[(int)AtParWebEnums.TokenEntry_Enum.OrgGrpID] + " - " + OrgName + " )",
                            sbHtmlString.ToString(), strVendorEmail, MailPriority.High);

                        if (StatusCode != AtparStatusCodes.ATPAR_OK)
                        {
                            if (_log.IsFatalEnabled)
                                _log.Fatal(methodBaseName + ":Failed in sendEmail:" + "StatusCode is :" + StatusCode + System.Environment.NewLine);

                        }



                    }
                }

                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {
                if (_log.IsFatalEnabled)
                    _log.Fatal(string.Format(":{0}:Failed to Process Vendor Email and Exception is:{1} ", methodBaseName, ex.ToString()));
                return AtparStatusCodes.E_SERVERERROR;
            }

        }

        public long SendEmail(string systemID, string subject, string bodyText, string toAddress, MailPriority mailPriority = MailPriority.Normal, string attachment = "")
        {

            string methodBaseName = string.Format("{0}.{1}:", this.GetType().FullName, System.Reflection.MethodBase.GetCurrentMethod().Name);
            if (_log.IsDebugEnabled) { _log.Debug(methodBaseName); }

            string strFromAddress = "";
            string strSmtpHost = string.Empty;
            string strSmtpPort = string.Empty;
            string strSmtpUserName = string.Empty;
            string strSmtpPwd = string.Empty;
            string strSmtpAccountName = string.Empty;
            string strSmtpSSLEnabled = string.Empty;
            MailMessage objMail = new MailMessage();
            SmtpClient SmtpMail = new SmtpClient();

            try
            {

                List<MT_ATPAR_CONFIGURATION_SECTION_DTLS> lstConfigSectionDtls = new List<MT_ATPAR_CONFIGURATION_SECTION_DTLS>();


                List<string> lstParameters = new List<string>();
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString());
                lstParameters.Add(AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString());
                lstParameters.Add(AtParWebEnums.ERP_SYS_DETAILS.UPLOADTO.ToString());

                lstConfigSectionDtls = _commonRepo.GetConfigData(lstParameters).ToList();

                strFromAddress = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_MAIL_ADDRESS.ToString())
                                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpHost = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER.ToString())
                                                        .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpPort = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_SERVER_PORT.ToString())
                                                   .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpUserName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USER_NAME.ToString())
                                                 .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                Encryption encrypt = new Encryption();

                strSmtpPwd = encrypt.Decrypt(lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_PASSWORD.ToString())
                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault());


                strSmtpAccountName = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_ACCOUNT_NAME.ToString())
                                         .Select(x => x.PARAMETER_VALUE).FirstOrDefault();

                strSmtpSSLEnabled = lstConfigSectionDtls.Where(x => x.TAB_ID == AtParWebEnums.CONFIGFILE.EMAILCONFIGARATION.ToString() && x.PARAMETER_ID == AtParWebEnums.EMAILCONFIGARATION.SMTP_USE_SSL.ToString())
                                             .Select(x => x.PARAMETER_VALUE).FirstOrDefault();


                // checks whether the To Address is entered
                if (string.IsNullOrEmpty(toAddress))
                {
                    return AtparStatusCodes.EMAIL_ENTER_TO_ADDRESS;
                }
                objMail.To.Add(toAddress);


                // checks whether the SMTP HOST(Server) is configured
                if (string.IsNullOrEmpty(strSmtpHost))
                {
                    return AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING;
                }

                SmtpMail.Host = strSmtpHost;

                // checks whether the Port is configured
                if (string.IsNullOrEmpty(strSmtpPort))
                {
                    return AtparStatusCodes.EMAIL_SMTP_SERVER_MISSING;
                }
                SmtpMail.Port = Convert.ToInt32(strSmtpPort);

                // checks whether the From Address is being configured

                if (string.IsNullOrEmpty(strFromAddress))
                {

                    return AtparStatusCodes.EMAIL_ENTER_FROM_ADDRESS;
                }

                objMail.From = new MailAddress(strFromAddress);



                // checks whether the Subject is entered
                if (string.IsNullOrEmpty(subject))
                {
                    return AtparStatusCodes.EMAIL_ENTER_SUBJECT;
                }
                objMail.Subject = subject;

                // checks whether the Body is entered
                if (string.IsNullOrEmpty(bodyText))
                {
                    return AtparStatusCodes.EMAIL_ENTER_BODY;
                }
                objMail.Body = bodyText;

                // checks whether the Mail Format is configured, if no then setting it to HTML as default
                objMail.IsBodyHtml = true;

                // checks whether there are any attahments
                if (!string.IsNullOrEmpty(attachment))
                {
                    Attachment attachement = new Attachment(attachment);
                    objMail.Attachments.Add(attachement);
                }

                // setting the mail priority - default it is normal
                objMail.Priority = mailPriority;

                // checks whether the Username and password is configured else uses the default credentials to send the email
                System.Net.NetworkCredential SmtpCredentials = new System.Net.NetworkCredential();

                if (string.IsNullOrEmpty(strSmtpUserName) | string.IsNullOrEmpty(strSmtpPwd))
                {
                    SmtpMail.UseDefaultCredentials = true;
                }
                else
                {
                    // checks whether the Account Name (domain) is configured
                    if (string.IsNullOrEmpty(strSmtpAccountName))
                    {
                        SmtpCredentials = new System.Net.NetworkCredential(strSmtpUserName, strSmtpPwd);
                    }
                    SmtpCredentials = new System.Net.NetworkCredential(strSmtpUserName, strSmtpPwd, strSmtpAccountName);
                    SmtpMail.UseDefaultCredentials = false;
                    SmtpMail.Credentials = SmtpCredentials;
                }

                // checks whether the SSL is configured
                if (string.IsNullOrEmpty(strSmtpSSLEnabled) | strSmtpSSLEnabled.ToLower() == "no")
                {
                    SmtpMail.EnableSsl = false;
                }
                else if (strSmtpSSLEnabled.ToLower() == "yes")
                {
                    SmtpMail.EnableSsl = true;
                }

                SmtpMail.Send(objMail);
                return AtparStatusCodes.ATPAR_OK;

            }
            catch (Exception ex)
            {

                if (_log.IsFatalEnabled)
                    _log.Fatal("AtparUtils: SendEmail: Failed to get config data : " + ex.ToString());
                return AtparStatusCodes.EMAIL_SEND_FAILED;
            }


        }


        #endregion
    }
}
