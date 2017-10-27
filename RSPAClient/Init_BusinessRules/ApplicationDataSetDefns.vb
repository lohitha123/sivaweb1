
Imports System.Data
#Region "BugFixes"

'NB-0006023-03/13/2009

#End Region
Public Class ApplicationDataSetDefns

    ' Use: AtParEnums.TableCols to define the string arrays
    ' { {"FriendlyName", "XML TagID", "DataType", "Unique(Y/N)", "AllowNull(Y/N)", "Primary Key(Y/N)" } }


#Region "INIT"

    Public Shared Get_Upload_Summary_Defns(,) As String = _
        {{Enum_Upload_Summary.TOTAL_REC_CNT.ToString, Enum_Upload_Summary.TOTAL_REC_CNT, "System.Int32", "N", "Y", "N"}, _
        {Enum_Upload_Summary.SUCCESS_CNT.ToString, Enum_Upload_Summary.SUCCESS_CNT, "System.Int32", "N", "Y", "N"}, _
        {Enum_Upload_Summary.FAILURE_CNT.ToString, Enum_Upload_Summary.FAILURE_CNT, "System.Int32", "N", "Y", "N"}, _
        {Enum_Upload_Summary.ADDED_CNT.ToString, Enum_Upload_Summary.ADDED_CNT, "System.Int32", "N", "Y", "N"}, _
        {Enum_Upload_Summary.UPDATED_CNT.ToString, Enum_Upload_Summary.UPDATED_CNT, "System.Int32", "N", "Y", "N"}, _
        {Enum_Upload_Summary.WARNING_CNT.ToString, Enum_Upload_Summary.WARNING_CNT, "System.Int32", "N", "Y", "N"}}


    Public Shared Get_AutoPutAway_Details_Defns(,) As String = _
        {{Enum_AutoPutAway_Details.LOCATION.ToString, Enum_AutoPutAway_Details.LOCATION, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.ITEM_ID.ToString, Enum_AutoPutAway_Details.ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.STORAGE_LOCATION.ToString, Enum_AutoPutAway_Details.STORAGE_LOCATION, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.LOT_ID.ToString, Enum_AutoPutAway_Details.LOT_ID, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.SERIAL_ID.ToString, Enum_AutoPutAway_Details.SERIAL_ID, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.QTY.ToString, Enum_AutoPutAway_Details.QTY, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.CONVERSION_RATE.ToString, Enum_AutoPutAway_Details.CONVERSION_RATE, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Details.EXPIRY_DATE.ToString, Enum_AutoPutAway_Details.EXPIRY_DATE, "System.String", "N", "Y", "N"}}

    Public Shared Get_AutoPutAway_Header_Defns(,) As String = _
        {{Enum_AutoPutAway_Header.BUSINESS_UNIT.ToString, Enum_AutoPutAway_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Header.PO_DT.ToString, Enum_AutoPutAway_Header.PO_DT, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Header.VENDOR_ID.ToString, Enum_AutoPutAway_Header.VENDOR_ID, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Header.START_DT_TIME.ToString, Enum_AutoPutAway_Header.START_DT_TIME, "System.String", "N", "Y", "N"}, _
        {Enum_AutoPutAway_Header.END_DT_TIME.ToString, Enum_AutoPutAway_Header.END_DT_TIME, "System.String", "N", "Y", "N"}}

    Public Shared Send_Notes_Input_DETAILS_Enum_Defns(,) As String = _
    {{Send_Notes_Input_DETAILS_Enum.KEY_1.ToString, Send_Notes_Input_DETAILS_Enum.KEY_1, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_2.ToString, Send_Notes_Input_DETAILS_Enum.KEY_2, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_3.ToString, Send_Notes_Input_DETAILS_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_4.ToString, Send_Notes_Input_DETAILS_Enum.KEY_4, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_5.ToString, Send_Notes_Input_DETAILS_Enum.KEY_5, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_6.ToString, Send_Notes_Input_DETAILS_Enum.KEY_6, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_7.ToString, Send_Notes_Input_DETAILS_Enum.KEY_7, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_8.ToString, Send_Notes_Input_DETAILS_Enum.KEY_8, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_9.ToString, Send_Notes_Input_DETAILS_Enum.KEY_9, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_10.ToString, Send_Notes_Input_DETAILS_Enum.KEY_10, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_11.ToString, Send_Notes_Input_DETAILS_Enum.KEY_11, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_12.ToString, Send_Notes_Input_DETAILS_Enum.KEY_12, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.KEY_13.ToString, Send_Notes_Input_DETAILS_Enum.KEY_13, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.APP_ID.ToString, Send_Notes_Input_DETAILS_Enum.APP_ID, "System.Int32", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.SCREEN_NAME.ToString, Send_Notes_Input_DETAILS_Enum.SCREEN_NAME, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.TRANS_ID.ToString, Send_Notes_Input_DETAILS_Enum.TRANS_ID, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.CODE.ToString, Send_Notes_Input_DETAILS_Enum.CODE, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.NOTES.ToString, Send_Notes_Input_DETAILS_Enum.NOTES, "System.String", "N", "Y", "N"}, _
     {Send_Notes_Input_DETAILS_Enum.DATE_TIME.ToString, Send_Notes_Input_DETAILS_Enum.DATE_TIME, "System.String", "N", "Y", "N"}}

    Public Shared Case_Header_Defns(,) As String = _
        {{Enum_Case_Header.PATIENT_MRC.ToString, Enum_Case_Header.PATIENT_MRC.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.CASE_ID.ToString, Enum_Case_Header.CASE_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.CASE_DESC.ToString, Enum_Case_Header.CASE_DESC.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.ROOM_ID.ToString, Enum_Case_Header.ROOM_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PERFORM_DATETIME.ToString, Enum_Case_Header.PERFORM_DATETIME.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PROCEDURE_ID.ToString, Enum_Case_Header.PROCEDURE_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PROCEDURE_DESC.ToString, Enum_Case_Header.PROCEDURE_DESC.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PREF_LIST_ID.ToString, Enum_Case_Header.PREF_LIST_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PREF_LIST_DESC.ToString, Enum_Case_Header.PREF_LIST_DESC.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PHYSICIAN_ID.ToString, Enum_Case_Header.PHYSICIAN_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PHYSICIAN_FN.ToString, Enum_Case_Header.PHYSICIAN_FN.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PHYSICIAN_LN.ToString, Enum_Case_Header.PHYSICIAN_LN.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.PHYSICIAN_MN.ToString, Enum_Case_Header.PHYSICIAN_MN.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.DEPT_ID.ToString, Enum_Case_Header.DEPT_ID.ToString(), "System.String", "N", "Y", "N"}, _
        {Enum_Case_Header.COST_CENTER_CODE.ToString, Enum_Case_Header.COST_CENTER_CODE.ToString(), "System.String", "N", "Y", "N"}}

    Public Shared Case_Details_Defns(,) As String = _
       {{Enum_Case_Details.CASE_ID.ToString, Enum_Case_Details.CASE_ID.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.ITEM_ID.ToString, Enum_Case_Details.ITEM_ID.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.ITEM_DESC.ToString, Enum_Case_Details.ITEM_DESC.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.ITEM_INVENTORY.ToString, Enum_Case_Details.ITEM_INVENTORY.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.PICK_QTY.ToString, Enum_Case_Details.PICK_QTY.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.HOLD_QTY.ToString, Enum_Case_Details.HOLD_QTY.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.PREF_LIST_ID.ToString, Enum_Case_Details.PREF_LIST_ID.ToString(), "System.String", "N", "Y", "N"}, _
       {Enum_Case_Details.PROCEDURE_ID.ToString, Enum_Case_Details.PROCEDURE_ID.ToString(), "System.String", "N", "Y", "N"}}

#End Region

#Region "Bin To Bin"

#Region "BinToBin SendDetails Table columns to define the string arrays"
    Public Shared Send_BinToBin_Input_PRE_REQ_Enum_Defns(,) As String = _
           {{Send_BinToBin_Input_PRE_REQ_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_BinToBin_Input_PRE_REQ_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_BinToBin_Input_PRE_REQ_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.REMOTE_DATABASE.ToString, Send_BinToBin_Input_PRE_REQ_Enum.REMOTE_DATABASE, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.REMOTE_SCHEMA.ToString, Send_BinToBin_Input_PRE_REQ_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.PS_USER.ToString, Send_BinToBin_Input_PRE_REQ_Enum.PS_USER, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.ERP_USER_ID.ToString, Send_BinToBin_Input_PRE_REQ_Enum.ERP_USER_ID, "System.String", "N", "Y", "N"}, _
            {Send_BinToBin_Input_PRE_REQ_Enum.ALLOW_NEGATIVE_INVENTORY.ToString, Send_BinToBin_Input_PRE_REQ_Enum.ALLOW_NEGATIVE_INVENTORY, "System.String", "N", "Y", "N"}}

    Public Shared Send_BinToBin_Input_DETAILS_Enum_Defns(,) As String = _
              {{Send_BinToBin_Input_DETAILS_Enum.BUSINESS_UNIT.ToString, Send_BinToBin_Input_DETAILS_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.ITEM_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_LOC.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_LOC, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_AREA.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_AREA, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_1.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_2.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_3.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_4.ToString, Send_BinToBin_Input_DETAILS_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LOC.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LOC, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_1.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_2.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_3.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_4.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.UOM.ToString, Send_BinToBin_Input_DETAILS_Enum.UOM, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.LOT_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.LOT_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.SERIAL_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.CONTAINER_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.QTY.ToString, Send_BinToBin_Input_DETAILS_Enum.QTY, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.USER_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.UPDATE_DATE.ToString, Send_BinToBin_Input_DETAILS_Enum.UPDATE_DATE, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DEVICE_ID.ToString, Send_BinToBin_Input_DETAILS_Enum.DEVICE_ID, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_AREA.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_STOR_AREA, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.SEND_STATUS.ToString, Send_BinToBin_Input_DETAILS_Enum.SEND_STATUS, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.SYSTEM_QTY.ToString, Send_BinToBin_Input_DETAILS_Enum.SYSTEM_QTY, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DESTIN_UOM.ToString, Send_BinToBin_Input_DETAILS_Enum.DESTIN_UOM, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.CONVERSION_RATE.ToString, Send_BinToBin_Input_DETAILS_Enum.CONVERSION_RATE, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.STDUOM.ToString, Send_BinToBin_Input_DETAILS_Enum.STDUOM, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DFLT_UOM_STOCK.ToString, Send_BinToBin_Input_DETAILS_Enum.DFLT_UOM_STOCK, "System.String", "N", "Y", "N"}, _
               {Send_BinToBin_Input_DETAILS_Enum.DFLT_UOM_STOCK_QTY.ToString, Send_BinToBin_Input_DETAILS_Enum.DFLT_UOM_STOCK_QTY, "System.String", "N", "Y", "N"}}

#End Region

#End Region

#Region "Cart count"

#Region "SendDetails"

    Public Shared Send_Cart_Header_Defns(,) As String = _
     {{Send_Cart_Header_Enum.TRANSACTION_ID.ToString, Send_Cart_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.BUSINESS_UNIT.ToString, Send_Cart_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.CART_ID.ToString, Send_Cart_Header_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.START_DATETIME.ToString, Send_Cart_Header_Enum.START_DATETIME, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.END_DATETIME.ToString, Send_Cart_Header_Enum.END_DATETIME, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.USER_ID.ToString, Send_Cart_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.TOTAL_RECORDS.ToString, Send_Cart_Header_Enum.TOTAL_RECORDS, "System.Int32", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.NO_OF_SCANS.ToString, Send_Cart_Header_Enum.NO_OF_SCANS, "System.Int32", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS.ToString, Send_Cart_Header_Enum.NO_OF_ORDERED_ITEMS, "System.Int32", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.QUANTITY_OPTION.ToString, Send_Cart_Header_Enum.QUANTITY_OPTION, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.CARTFLAG.ToString, Send_Cart_Header_Enum.CARTFLAG, "System.String", "N", "Y", "N"}, _
     {Send_Cart_Header_Enum.CMTS.ToString, Send_Cart_Header_Enum.CMTS, "System.String", "N", "Y", "N"}, _
  {Send_Cart_Header_Enum.ALLOCATED_USER.ToString, Send_Cart_Header_Enum.ALLOCATED_USER, "System.String", "N", "Y", "N"}, _
  {Send_Cart_Header_Enum.CREATION_DT.ToString, Send_Cart_Header_Enum.CREATION_DT, "System.String", "N", "Y", "N"}, _
  {Send_Cart_Header_Enum.REQ_NO.ToString, Send_Cart_Header_Enum.REQ_NO, "System.String", "N", "Y", "N"}}

    Public Shared Send_Cart_BusinessRules_Defns(,) As String = _
        {{Send_Cart_BusinessRules_Enum.CART_DEFN_CHANGE.ToString, Send_Cart_BusinessRules_Enum.CART_DEFN_CHANGE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.DEL_ITEMS.ToString, Send_Cart_BusinessRules_Enum.DEL_ITEMS, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA.ToString, Send_Cart_BusinessRules_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.CART_SEQUENCE_ID.ToString, Send_Cart_BusinessRules_Enum.CART_SEQUENCE_ID, "System.Int64", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ITEM_COUNT_LOW_PCT.ToString, Send_Cart_BusinessRules_Enum.ITEM_COUNT_LOW_PCT, "System.Double", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ITEM_COUNT_HIGH_PCT.ToString, Send_Cart_BusinessRules_Enum.ITEM_COUNT_HIGH_PCT, "System.Double", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.PUTAWAY_CART_ITEMS.ToString, Send_Cart_BusinessRules_Enum.PUTAWAY_CART_ITEMS, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.REQ_ZIP_RELEASE.ToString, Send_Cart_BusinessRules_Enum.REQ_ZIP_RELEASE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.STOP_REL_NON_STOCK_REQ.ToString, Send_Cart_BusinessRules_Enum.STOP_REL_NON_STOCK_REQ, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.QTY_OPTION.ToString, Send_Cart_BusinessRules_Enum.QTY_OPTION, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.REQUESTOR_ID.ToString, Send_Cart_BusinessRules_Enum.REQUESTOR_ID, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.IGNORE_REQ_REL_ERR.ToString, Send_Cart_BusinessRules_Enum.IGNORE_REQ_REL_ERR, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.REMOTE_DB_TYPE.ToString, Send_Cart_BusinessRules_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.TRANSACTION_STATUS.ToString, Send_Cart_BusinessRules_Enum.TRANSACTION_STATUS, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.STATUS_CODE.ToString, Send_Cart_BusinessRules_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.SUPER_USER.ToString, Send_Cart_BusinessRules_Enum.SUPER_USER, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR.ToString, Send_Cart_BusinessRules_Enum.CARTS_MNGD_ATPAR, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.QTY_ROUND_TYPE.ToString, Send_Cart_BusinessRules_Enum.QTY_ROUND_TYPE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.CALCULATE_REQ_QTY.ToString, Send_Cart_BusinessRules_Enum.CALCULATE_REQ_QTY, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.POU_CART.ToString, Send_Cart_BusinessRules_Enum.POU_CART, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ORDIDS.ToString, Send_Cart_BusinessRules_Enum.ORDIDS, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ERP_USER_ID.ToString, Send_Cart_BusinessRules_Enum.ERP_USER_ID, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.STATUS_OF_REQUISITION.ToString, Send_Cart_BusinessRules_Enum.STATUS_OF_REQUISITION, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG.ToString, Send_Cart_BusinessRules_Enum.HL7_BILLING_MESG, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_Cart_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.ENTERPRISE_VERSION.ToString, Send_Cart_BusinessRules_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.CREATE_NSTKREQ_BYPAR.ToString, Send_Cart_BusinessRules_Enum.CREATE_NSTKREQ_BYPAR, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.INCLUDE_ZERO_ORDERED_ITEMS.ToString, Send_Cart_BusinessRules_Enum.INCLUDE_ZERO_ORDERED_ITEMS, "System.String", "N", "Y", "N"}, _
        {Send_Cart_BusinessRules_Enum.FTP_TO_SERVER.ToString, Send_Cart_BusinessRules_Enum.FTP_TO_SERVER, "System.String", "N", "Y", "N"}}



    Public Shared Send_Cart_Details_Defns(,) As String = _
            {{Send_Cart_Details_Enum.ITEM_ID.ToString, Send_Cart_Details_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.ITEM_DESCR.ToString, Send_Cart_Details_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.COMPARTMENT.ToString, Send_Cart_Details_Enum.COMPARTMENT, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.COUNT_QUANTITY.ToString, Send_Cart_Details_Enum.COUNT_QUANTITY, "System.Double", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.OPTIMAL_QUANTITY.ToString, Send_Cart_Details_Enum.OPTIMAL_QUANTITY, "System.Double", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.COUNT_REQUIRED.ToString, Send_Cart_Details_Enum.COUNT_REQUIRED, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.PRICE.ToString, Send_Cart_Details_Enum.PRICE, "System.Double", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.CRITICAL_ITEM.ToString, Send_Cart_Details_Enum.CRITICAL_ITEM, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.INVENTORY_ITEM.ToString, Send_Cart_Details_Enum.INVENTORY_ITEM, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.UOM.ToString, Send_Cart_Details_Enum.UOM, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY.ToString, Send_Cart_Details_Enum.NEW_OPTIMAL_QUANTITY, "System.Double", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.FILL_KILL_FLAG.ToString, Send_Cart_Details_Enum.FILL_KILL_FLAG, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.LNCMTS.ToString, Send_Cart_Details_Enum.LNCMTS, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.CART_REPLEN_CTRL.ToString, Send_Cart_Details_Enum.CART_REPLEN_CTRL, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.MAX_QTY.ToString, Send_Cart_Details_Enum.MAX_QTY, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.FOQ.ToString, Send_Cart_Details_Enum.FOQ, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.CUST_ITEM_NO.ToString, Send_Cart_Details_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.VENDOR_ID.ToString, Send_Cart_Details_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.CONV_FACTOR.ToString, Send_Cart_Details_Enum.CONV_FACTOR, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.CART_REPLEN_OPT.ToString, Send_Cart_Details_Enum.CART_REPLEN_OPT, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.LOC_TYPE.ToString, Send_Cart_Details_Enum.LOC_TYPE, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.ACT_QOH.ToString, Send_Cart_Details_Enum.ACT_QOH, "System.Double", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.ITEM_COUNT_ORDER.ToString, Send_Cart_Details_Enum.ITEM_COUNT_ORDER, "System.String", "N", "Y", "N"}, _
            {Send_Cart_Details_Enum.ORDER_QUANTITY.ToString, Send_Cart_Details_Enum.ORDER_QUANTITY, "System.Double", "N", "Y", "N"}}


    Public Shared Send_Cart_Output_Defns(,) As String = _
        {{Send_Cart_Output_Enum.STATUS_CODE.ToString, Send_Cart_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Send_Cart_Output_Enum.STATUS_DESCR.ToString, Send_Cart_Output_Enum.STATUS_DESCR, "System.String", "N", "Y", "N"}, _
        {Send_Cart_Output_Enum.TRANSACTION_ID.ToString, Send_Cart_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Send_Cart_Output_Enum.ITEM_ID.ToString, Send_Cart_Output_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Send_Cart_Output_Enum.PREV_TRANSACTION_ID.ToString, Send_Cart_Output_Enum.PREV_TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Send_Cart_Output_Enum.REQUISITION_NUMBER.ToString, Send_Cart_Output_Enum.REQUISITION_NUMBER, "System.String", "N", "Y", "N"}}


    Public Shared Send_CartReq_Details_Defns(,) As String = _
            {{Send_CartReq_Details.ITEM_ID.ToString, Send_CartReq_Details.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.ITEM_DESCR.ToString, Send_CartReq_Details.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.COUNT_QUANTITY.ToString, Send_CartReq_Details.COUNT_QUANTITY, "System.Double", "N", "Y", "N"}, _
            {Send_CartReq_Details.UOM.ToString, Send_CartReq_Details.UOM, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.UOP.ToString, Send_CartReq_Details.UOP, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.UOI.ToString, Send_CartReq_Details.UOI, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.CONV_FACTOR.ToString, Send_CartReq_Details.CONV_FACTOR, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.LNCMTS.ToString, Send_CartReq_Details.LNCMTS, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.SERIAL_CONTROLLED.ToString, Send_CartReq_Details.SERIAL_CONTROLLED, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.LOT_CONTROLLED.ToString, Send_CartReq_Details.LOT_CONTROLLED, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.LINE_NO.ToString, Send_CartReq_Details.LINE_NO, "System.Int32", "N", "Y", "N"}, _
            {Send_CartReq_Details.VENDOR_ID.ToString, Send_CartReq_Details.VENDOR_ID, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.ITEM_TYPE.ToString, Send_CartReq_Details.ITEM_TYPE, "System.String", "N", "Y", "N"}, _
            {Send_CartReq_Details.REPLENISHMENT_TYPE.ToString, Send_CartReq_Details.REPLENISHMENT_TYPE, "System.String", "N", "Y", "N"}}
#End Region

#Region "Get Header"

    Public Shared Get_Header_Defns(,) As String = _
     {{Get_Cart_Header_Enum.CART_ID.ToString, Get_Cart_Header_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
      {Get_Cart_Header_Enum.USER_ID.ToString, Get_Cart_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
      {Get_Cart_Header_Enum.BUSINESS_UNIT.ToString, Get_Cart_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
      {Get_Cart_Header_Enum.FLD_ORDER_BY.ToString, Get_Cart_Header_Enum.FLD_ORDER_BY, "System.String", "N", "Y", "N"}, _
      {Get_Cart_Header_Enum.ORDER_BY_ORDER.ToString, Get_Cart_Header_Enum.ORDER_BY_ORDER, "System.String", "N", "Y", "N"}, _
   {Get_Cart_Header_Enum.POU_CART.ToString, Get_Cart_Header_Enum.POU_CART, "System.String", "N", "Y", "N"}}

    Public Shared Get_Transactions_Defns(,) As String = _
     {{Get_Cart_Header_Transactions_Enum.TRANSACTION_ID.ToString, Get_Cart_Header_Transactions_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Params_Defns(,) As String = _
     {{Get_Cart_Header_PreReqData_Enum.CART_ALLOCATION.ToString, Get_Cart_Header_PreReqData_Enum.CART_ALLOCATION, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Header_PreReqData_Enum.CARTS_MNGD_ATPAR.ToString, Get_Cart_Header_PreReqData_Enum.CARTS_MNGD_ATPAR, "System.String", "N", "Y", "N"}}

    Public Shared Get_BusinessUnits_Defns(,) As String = _
     {{Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT.ToString, Get_Cart_Header_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Header_Output_Header(,) As String = _
        {{Get_Cart_Header_Output_Carts.CART_ID.ToString, Get_Cart_Header_Output_Carts.CART_ID, "System.String", "N", "Y", "N"}, _
         {Get_Cart_Header_Output_Carts.BUSINESS_UNIT.ToString, Get_Cart_Header_Output_Carts.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Get_Cart_Header_Output_Carts.DESCR.ToString, Get_Cart_Header_Output_Carts.DESCR, "System.String", "N", "Y", "N"}, _
         {Get_Cart_Header_Output_Carts.SHADOW_FLAG.ToString, Get_Cart_Header_Output_Carts.SHADOW_FLAG, "System.String", "N", "Y", "N"}, _
         {Get_Cart_Header_Output_Carts.CART_COUNT_ORDER.ToString, Get_Cart_Header_Output_Carts.CART_COUNT_ORDER, "System.String", "N", "Y", "N"}, _
        {Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION.ToString, Get_Cart_Header_Output_Carts.TWO_BIN_ALLOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE.ToString, Get_Cart_Header_Output_Carts.DEF_PERCENTAGE_VALUE, "System.String", "N", "Y", "N"}, _
          {Get_Cart_Header_Output_Carts.LOCATION_TYPE.ToString, Get_Cart_Header_Output_Carts.LOCATION_TYPE, "System.String", "N", "Y", "N"}}

#End Region

#Region "Get Details"

    Public Shared Get_Detail_Defns(,) As String = _
     {{Get_Detail_Defns_Enum.USER_ID.ToString, Get_Detail_Defns_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
     {Get_Detail_Defns_Enum.BUSINESS_UNIT.ToString, Get_Detail_Defns_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Get_Detail_Defns_Enum.CART_ID.ToString, Get_Detail_Defns_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
     {Get_Detail_Defns_Enum.TRANSACTION_ID.ToString, Get_Detail_Defns_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}, _
     {Get_Detail_Defns_Enum.DESCR.ToString, Get_Detail_Defns_Enum.DESCR, "System.String", "N", "Y", "N"}}

    Public Shared Get_Cart_DetailInput_Defns(,) As String = _
      {{Get_Cart_DetailInput_Defns_Enum.USER_ID.ToString, Get_Cart_DetailInput_Defns_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
      {Get_Cart_DetailInput_Defns_Enum.BUSINESS_UNIT.ToString, Get_Cart_DetailInput_Defns_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
      {Get_Cart_DetailInput_Defns_Enum.CART_ID.ToString, Get_Cart_DetailInput_Defns_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
       {Get_Cart_DetailInput_Defns_Enum.TRANS_ID.ToString, Get_Cart_DetailInput_Defns_Enum.TRANS_ID, "System.Int64", "N", "Y", "N"}}

    Public Shared Get_Cart_PreReqData_Defns(,) As String = _
        {{Get_Cart_PreReqData_Enum.CART_ALLOCATION.ToString, Get_Cart_PreReqData_Enum.CART_ALLOCATION, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.ITEM_PRICE.ToString, Get_Cart_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.ITEM_DESCR.ToString, Get_Cart_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_Cart_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.PUTAWAY_CART_ITEMS.ToString, Get_Cart_PreReqData_Enum.PUTAWAY_CART_ITEMS, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Cart_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Cart_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.QTY_OPTION.ToString, Get_Cart_PreReqData_Enum.QTY_OPTION, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, Get_Cart_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, Get_Cart_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.MFG_ITEM_REQD.ToString, Get_Cart_PreReqData_Enum.MFG_ITEM_REQD, "System.Boolean", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.VENDOR_ITEM_REQD.ToString, Get_Cart_PreReqData_Enum.VENDOR_ITEM_REQD, "System.Boolean", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.PRICE_REQD.ToString, Get_Cart_PreReqData_Enum.PRICE_REQD, "System.Boolean", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.GTIN.ToString, Get_Cart_PreReqData_Enum.GTIN, "System.Boolean", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.BUSINESS_UNIT.ToString, Get_Cart_PreReqData_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.CART_ID.ToString, Get_Cart_PreReqData_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR.ToString, Get_Cart_PreReqData_Enum.CARTS_MNGD_ATPAR, "System.String", "N", "Y", "N"}, _
        {Get_Cart_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString, Get_Cart_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}}

    Public Shared Get_Cart_DetailOutput_Header_Defns(,) As String = _
      {{Get_Cart_Detail_Output_Header_Enum.USER_ID.ToString, Get_Cart_Detail_Output_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT.ToString, Get_Cart_Detail_Output_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.DESCR.ToString, Get_Cart_Detail_Output_Header_Enum.DESCR, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.SHADOW_FLAG.ToString, Get_Cart_Detail_Output_Header_Enum.SHADOW_FLAG, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.QTY_OPTION.ToString, Get_Cart_Detail_Output_Header_Enum.QTY_OPTION, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.DEPT_ID.ToString, Get_Cart_Detail_Output_Header_Enum.DEPT_ID, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.TRANS_ID.ToString, Get_Cart_Detail_Output_Header_Enum.TRANS_ID, "System.Int64", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.CART_ID.ToString, Get_Cart_Detail_Output_Header_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.ORG_ID.ToString, Get_Cart_Detail_Output_Header_Enum.ORG_ID, "System.Int64", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.INV_BUSINESS_UNIT.ToString, Get_Cart_Detail_Output_Header_Enum.INV_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.YEAR.ToString, Get_Cart_Detail_Output_Header_Enum.YEAR, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.MONTH.ToString, Get_Cart_Detail_Output_Header_Enum.MONTH, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.DAY.ToString, Get_Cart_Detail_Output_Header_Enum.DAY, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.REQ_NO.ToString, Get_Cart_Detail_Output_Header_Enum.REQ_NO, "System.String", "N", "Y", "N"}, _
       {Get_Cart_Detail_Output_Header_Enum.LOCATION.ToString, Get_Cart_Detail_Output_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}}

    Public Shared Get_Cart_DetailOutput_Details_Defns(,) As String = _
           {{Get_Cart_Detail_Enum.INV_ITEM_ID.ToString, Get_Cart_Detail_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.COMPARTMENT.ToString, Get_Cart_Detail_Enum.COMPARTMENT, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_DESCR.ToString, Get_Cart_Detail_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.MFG_ITEM_ID.ToString, Get_Cart_Detail_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.VENDOR_ITEM_ID.ToString, Get_Cart_Detail_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.UPN_ID.ToString, Get_Cart_Detail_Enum.UPN_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_NDC.ToString, Get_Cart_Detail_Enum.ITEM_NDC, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_GTIN.ToString, Get_Cart_Detail_Enum.ITEM_GTIN, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_PRICE.ToString, Get_Cart_Detail_Enum.ITEM_PRICE, "System.Double", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.COUNT_ORDER.ToString, Get_Cart_Detail_Enum.COUNT_ORDER, "System.Int64", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.OPTIMAL_QTY.ToString, Get_Cart_Detail_Enum.OPTIMAL_QTY, "System.Double", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.FOQ.ToString, Get_Cart_Detail_Enum.FOQ, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.COUNT_REQD.ToString, Get_Cart_Detail_Enum.COUNT_REQD, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CART_REPLEN_CTRL.ToString, Get_Cart_Detail_Enum.CART_REPLEN_CTRL, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CART_REPLEN_OPT.ToString, Get_Cart_Detail_Enum.CART_REPLEN_OPT, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CONS_NON_STOCK.ToString, Get_Cart_Detail_Enum.CONS_NON_STOCK, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.INVENTORY_ITEM.ToString, Get_Cart_Detail_Enum.INVENTORY_ITEM, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ORDER_QTY.ToString, Get_Cart_Detail_Enum.ORDER_QTY, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.UOM.ToString, Get_Cart_Detail_Enum.UOM, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.MAX_QTY.ToString, Get_Cart_Detail_Enum.MAX_QTY, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.FILLKILL.ToString, Get_Cart_Detail_Enum.FILLKILL, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CUST_ITEM_ID.ToString, Get_Cart_Detail_Enum.CUST_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.LOT_CONTROLLED.ToString, Get_Cart_Detail_Enum.LOT_CONTROLLED, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.SERIAL_CONTROLLED.ToString, Get_Cart_Detail_Enum.SERIAL_CONTROLLED, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CONV_FACTOR.ToString, Get_Cart_Detail_Enum.CONV_FACTOR, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CHARGE_CODE.ToString, Get_Cart_Detail_Enum.CHARGE_CODE, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.VENDOR_NAME.ToString, Get_Cart_Detail_Enum.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.VENDOR_ID.ToString, Get_Cart_Detail_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.UOM_PROC.ToString, Get_Cart_Detail_Enum.UOM_PROC, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.QTY_OPTION.ToString, Get_Cart_Detail_Enum.QTY_OPTION, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.LAST_ORDER_DATE.ToString, Get_Cart_Detail_Enum.LAST_ORDER_DATE, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.STATUS.ToString, Get_Cart_Detail_Enum.STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.PACKAGING_STRING.ToString, Get_Cart_Detail_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.MFG_ID.ToString, Get_Cart_Detail_Enum.MFG_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CONSIGNMENT_ITEM.ToString, Get_Cart_Detail_Enum.CONSIGNMENT_ITEM, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.REPORT_FIELD_1.ToString, Get_Cart_Detail_Enum.REPORT_FIELD_1, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.REPORT_FIELD_2.ToString, Get_Cart_Detail_Enum.REPORT_FIELD_2, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.REPORT_FIELD_3.ToString, Get_Cart_Detail_Enum.REPORT_FIELD_3, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.REPORT_FIELD_4.ToString, Get_Cart_Detail_Enum.REPORT_FIELD_4, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_TYPE.ToString, Get_Cart_Detail_Enum.ITEM_TYPE, "System.Int16", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG.ToString, Get_Cart_Detail_Enum.SUBSTITUTE_ITEM_FLG, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.USER_FIELD_2.ToString, Get_Cart_Detail_Enum.USER_FIELD_2, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.IMPLANT_FLAG.ToString, Get_Cart_Detail_Enum.IMPLANT_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS.ToString, Get_Cart_Detail_Enum.ITEM_MASTER_ITEM_STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS.ToString, Get_Cart_Detail_Enum.NON_CART_ITEM_STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.BILL_ITEM_STATUS.ToString, Get_Cart_Detail_Enum.BILL_ITEM_STATUS, "System.String", "N", "Y", "N"}, _		   
           {Get_Cart_Detail_Enum.PAR_LOC_STATUS.ToString, Get_Cart_Detail_Enum.PAR_LOC_STATUS, "System.String", "N", "Y", "N"}, _
		   {Get_Cart_Detail_Enum.ITEM_MASTER_STATUS.ToString, Get_Cart_Detail_Enum.ITEM_MASTER_STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.ITEM_BU_STATUS.ToString, Get_Cart_Detail_Enum.ITEM_BU_STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.INFO_2.ToString, Get_Cart_Detail_Enum.INFO_2, "System.String", "N", "Y", "N"}, _
            {Get_Cart_Detail_Enum.INFO_3.ToString, Get_Cart_Detail_Enum.INFO_3, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM.ToString, Get_Cart_Detail_Enum.CONV_RATE_PAR_UOM, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Detail_Enum.PAR_UOM.ToString, Get_Cart_Detail_Enum.PAR_UOM, "System.String", "N", "Y", "N"}, _
            {Get_Cart_Detail_Enum.ISSUE_UOM.ToString, Get_Cart_Detail_Enum.ISSUE_UOM, "System.String", "N", "Y", "N"}}

    Public Shared Get_Cart_DetailOutput_LotSerial_Defns(,) As String = _
            {{Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT.ToString, Get_Cart_LotSerial_Info_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.CART_ID.ToString, Get_Cart_LotSerial_Info_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_LOCATION, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_AREA.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_1.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_1, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_2.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_2, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_3.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_3, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_4.ToString, Get_Cart_LotSerial_Info_Enum.STORAGE_LEVEL_4, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.ITEM_ID.ToString, Get_Cart_LotSerial_Info_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.LOT_NUMBER.ToString, Get_Cart_LotSerial_Info_Enum.LOT_NUMBER, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.SERIAL_NUMBER.ToString, Get_Cart_LotSerial_Info_Enum.SERIAL_NUMBER, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.STAGED_DATE.ToString, Get_Cart_LotSerial_Info_Enum.STAGED_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.CONTAINER_ID.ToString, Get_Cart_LotSerial_Info_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
            {Get_Cart_LotSerial_Info_Enum.UOM.ToString, Get_Cart_LotSerial_Info_Enum.UOM, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.UOM_PROC.ToString, Get_Cart_LotSerial_Info_Enum.UOM_PROC, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY.ToString, Get_Cart_LotSerial_Info_Enum.SYSTEM_QTY, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.STDUOM.ToString, Get_Cart_LotSerial_Info_Enum.STDUOM, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.STD_PACK_UOM.ToString, Get_Cart_LotSerial_Info_Enum.STD_PACK_UOM, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.LOWEST_QOH.ToString, Get_Cart_LotSerial_Info_Enum.LOWEST_QOH, "System.String", "N", "Y", "N"}, _
             {Get_Cart_LotSerial_Info_Enum.ACTUAL_QUANTITY.ToString, Get_Cart_LotSerial_Info_Enum.ACTUAL_QUANTITY, "System.String", "N", "Y", "N"}}

    Public Shared Get_Cart_Detail_ListView_RequiredParams(,) As String = _
    {{Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_CTRL, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.CART_REPLEN_OPT, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.COMPARTMENT, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.CONS_NON_STOCK, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_QTY, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.COUNT_REQUIRED, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.DESCR.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.DESCR, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.FOQ.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.FOQ, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.GTIN.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.GTIN, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.INVENTORY_ITEM, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_COUNT_ORDER, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.MAXIMUM_QTY, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.OPTIMAL_QTY, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.PRICE.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.PRICE, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.PRINT_LATER_FLAG, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.UOM.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.UOM, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.VNDR_ITEM_ID, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.CONSIGNMENT_ITEM.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.CONSIGNMENT_ITEM, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_1.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_1, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_2.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_2, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_3.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_3, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_4.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.REPORT_FIELD_4, "System.String", "N", "Y", "N"}, _
    {Get_Cart_Detail_ListView_Reqparams_Enum.PACKAGING_STRING.ToString, Get_Cart_Detail_ListView_Reqparams_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}

    Public Shared Send_Order_Details_Enum_Defns(,) As String = _
        {{Send_Order_Details_Enum.ORDER_NO.ToString, Send_Order_Details_Enum.ORDER_NO, "System.Int32", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.LINE_NO.ToString, Send_Order_Details_Enum.LINE_NO, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.ITEM_ID.ToString, Send_Order_Details_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.BIN_LOC.ToString, Send_Order_Details_Enum.BIN_LOC, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.REQ_QTY.ToString, Send_Order_Details_Enum.REQ_QTY, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.OPT_QTY.ToString, Send_Order_Details_Enum.OPT_QTY, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.LOT_NO.ToString, Send_Order_Details_Enum.LOT_NO, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.SR_NO.ToString, Send_Order_Details_Enum.SR_NO, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.UOM.ToString, Send_Order_Details_Enum.UOM, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.TRANS_ID.ToString, Send_Order_Details_Enum.TRANS_ID, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.LINE_COMMENTS.ToString, Send_Order_Details_Enum.LINE_COMMENTS, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.HDR_COMMENTS.ToString, Send_Order_Details_Enum.HDR_COMMENTS, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.CREATE_USER.ToString, Send_Order_Details_Enum.CREATE_USER, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.VENDOR_ID.ToString, Send_Order_Details_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.ACTUAL_ORDERQTY.ToString, Send_Order_Details_Enum.ACTUAL_ORDERQTY, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.ACTUAL_ISSUE_UOM.ToString, Send_Order_Details_Enum.ACTUAL_ISSUE_UOM, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.REPLENISHMENT_TYPE.ToString, Send_Order_Details_Enum.REPLENISHMENT_TYPE, "System.String", "N", "Y", "N"}, _
        {Send_Order_Details_Enum.COUNT_QTY.ToString, Send_Order_Details_Enum.COUNT_QTY, "System.String", "N", "Y", "N"}}


    Public Shared Get_Recall_Cart_DetailOutput_Details_Defns(,) As String = _
          {{Get_Cart_Detail_Enum.INV_ITEM_ID.ToString, Get_Cart_Detail_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
          {Get_Cart_Detail_Enum.MFG_ID.ToString, Get_Cart_Detail_Enum.MFG_ID, "System.String", "N", "Y", "N"}, _
          {Get_Cart_Detail_Enum.MFG_ITEM_ID.ToString, Get_Cart_Detail_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
          {Get_Cart_Detail_Enum.ITEM_DESCR.ToString, Get_Cart_Detail_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}}
#End Region

#Region "Send Charge Capture Details"

    Public Shared Send_Charge_Capture_Header_Defns(,) As String = _
       {{Send_Charge_Capture_Header_Enum.TRANSACTION_ID.ToString, Send_Charge_Capture_Header_Enum.TRANSACTION_ID, "System.Int32", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.CHARGE_CAPTURE_ID.ToString, Send_Charge_Capture_Header_Enum.CHARGE_CAPTURE_ID, "System.Int64", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.CART_ID.ToString, Send_Charge_Capture_Header_Enum.CART_ID, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.PATIENT_ID.ToString, Send_Charge_Capture_Header_Enum.PATIENT_ID, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.STATUS.ToString, Send_Charge_Capture_Header_Enum.STATUS, "System.Int32", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.TRANSACTION_DATE.ToString, Send_Charge_Capture_Header_Enum.TRANSACTION_DATE, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.PATIENT_NAME.ToString, Send_Charge_Capture_Header_Enum.PATIENT_NAME, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.USER_ID.ToString, Send_Charge_Capture_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.SERVICE_DATE.ToString, Send_Charge_Capture_Header_Enum.SERVICE_DATE, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.START_DATETIME.ToString, Send_Charge_Capture_Header_Enum.START_DATETIME, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.END_DATETIME.ToString, Send_Charge_Capture_Header_Enum.END_DATETIME, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.TOTAL_RECORDS.ToString, Send_Charge_Capture_Header_Enum.TOTAL_RECORDS, "System.Int32", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.PATIENT_SEX.ToString, Send_Charge_Capture_Header_Enum.PATIENT_SEX, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER.ToString, Send_Charge_Capture_Header_Enum.PATIENT_ACCOUNT_NUMBER, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.ORG_ID.ToString, Send_Charge_Capture_Header_Enum.ORG_ID, "System.String", "N", "Y", "N"}, _
       {Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER.ToString, Send_Charge_Capture_Header_Enum.PATIENT_VISIT_NUMBER, "System.String", "N", "Y", "N"}}

    Public Shared Send_Charge_Capture_Details_Defns(,) As String = _
      {{Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID.ToString, Send_Charge_Capture_Details_Enum.CHARGE_CAPTURE_ID, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.ITEM_ID.ToString, Send_Charge_Capture_Details_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.ITEM_COUNT.ToString, Send_Charge_Capture_Details_Enum.ITEM_COUNT, "System.Double", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME.ToString, Send_Charge_Capture_Details_Enum.CAPTURE_DATE_TIME, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.STATUS_CODE.ToString, Send_Charge_Capture_Details_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.TRANSACTION_ID.ToString, Send_Charge_Capture_Details_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.AMOUNT.ToString, Send_Charge_Capture_Details_Enum.AMOUNT, "System.Double", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.TRANSACTION_CODE.ToString, Send_Charge_Capture_Details_Enum.TRANSACTION_CODE, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE.ToString, Send_Charge_Capture_Details_Enum.TRANSACTION_TYPE, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.ITEM_PRICE.ToString, Send_Charge_Capture_Details_Enum.ITEM_PRICE, "System.Double", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.PHYSICIAN_ID.ToString, Send_Charge_Capture_Details_Enum.PHYSICIAN_ID, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.PATIENT_TYPE.ToString, Send_Charge_Capture_Details_Enum.PATIENT_TYPE, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION.ToString, Send_Charge_Capture_Details_Enum.ITEM_DESCRIPTION, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.LINE_NO.ToString, Send_Charge_Capture_Details_Enum.LINE_NO, "System.Int32", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.COST_CENTER.ToString, Send_Charge_Capture_Details_Enum.COST_CENTER, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.DEPARTMENT_ID.ToString, Send_Charge_Capture_Details_Enum.DEPARTMENT_ID, "System.String", "N", "Y", "N"}, _
      {Send_Charge_Capture_Details_Enum.E_MAIL.ToString, Send_Charge_Capture_Details_Enum.E_MAIL, "System.String", "N", "Y", "N"}}
#End Region


#End Region

#Region "CycleCount"

#Region "GetEvent Header"

    Public Shared Get_Event_Header_Defns(,) As String = _
        {{Get_Event_Header_Enum.EVENT_ID.ToString, Get_Event_Header_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Enum.FLD_ORDER_BY.ToString, Get_Event_Header_Enum.FLD_ORDER_BY, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Enum.ORDER_BY_ORDER.ToString, Get_Event_Header_Enum.ORDER_BY_ORDER, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Enum.USER_ID.ToString, Get_Event_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Event_Transactions_Defns(,) As String = _
     {{Get_Event_Transactions_Enum.TRANSACTION_ID.ToString, Get_Event_Transactions_Enum.TRANSACTION_ID, "System.Int32", "N", "Y", "N"}}

    Public Shared Get_Event_Params_Defns(,) As String = _
    {{Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS.ToString, Get_Event_Header_PreReqData_Enum.REVIEW_COUNTS, "System.String", "N", "Y", "N"}, _
     {Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION.ToString, Get_Event_Header_PreReqData_Enum.EVENT_ALLOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Event_Header_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
     {Get_Event_Header_PreReqData_Enum.ERP_CALL.ToString, Get_Event_Header_PreReqData_Enum.ERP_CALL, "System.String", "N", "Y", "N"}, _
      {Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS.ToString, Get_Event_Header_PreReqData_Enum.PERFORM_MANUAL_COUNTS, "System.String", "N", "Y", "N"}, _
      {Get_Event_Header_PreReqData_Enum.REVIEW_MANUAL_COUNTS.ToString, Get_Event_Header_PreReqData_Enum.REVIEW_MANUAL_COUNTS, "System.String", "N", "Y", "N"}}

    Public Shared Get_Event_BusinessUnits_Defns(,) As String = _
     {{Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT.ToString, Get_Event_Header_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Event_Header_Output_Header(,) As String = _
        {{Get_Event_Header_Output_Enum.BUSINESS_UNIT.ToString, Get_Event_Header_Output_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.EVENT_ID.ToString, Get_Event_Header_Output_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.NO_RECORDS.ToString, Get_Event_Header_Output_Enum.NO_RECORDS, "System.Int32", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.FROM_STOR_LOC.ToString, Get_Event_Header_Output_Enum.FROM_STOR_LOC, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.TO_STOR_LOC.ToString, Get_Event_Header_Output_Enum.TO_STOR_LOC, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.PARENT_EVENT_ID.ToString, Get_Event_Header_Output_Enum.PARENT_EVENT_ID, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.COUNT_HDR_STATUS.ToString, Get_Event_Header_Output_Enum.COUNT_HDR_STATUS, "System.String", "N", "Y", "N"}, _
         {Get_Event_Header_Output_Enum.EVENT_TYPE.ToString, Get_Event_Header_Output_Enum.EVENT_TYPE, "System.Int32", "N", "Y", "N"}}




#End Region

#Region "GetEvent Details"

    Public Shared Get_Event_Details_Defns(,) As String = _
       {{Get_Event_Details_Enum.BUSINESS_UNIT.ToString, Get_Event_Details_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.EVENT_ID.ToString, Get_Event_Details_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.COUNT_AND_NEW.ToString, Get_Event_Details_Enum.COUNT_AND_NEW, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.RECOUNT_AND_NEW.ToString, Get_Event_Details_Enum.RECOUNT_AND_NEW, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.USER_ID.ToString, Get_Event_Details_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.TRANSACTION.ToString, Get_Event_Details_Enum.TRANSACTION, "System.Int64", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.SEND_OLD_TRANSACTION.ToString, Get_Event_Details_Enum.SEND_OLD_TRANSACTION, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.EVENT_STATUS.ToString, Get_Event_Details_Enum.EVENT_STATUS, "System.Int32", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.INSERT_FLAG.ToString, Get_Event_Details_Enum.INSERT_FLAG, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.IS_ITEM_FROM_ERP.ToString, Get_Event_Details_Enum.IS_ITEM_FROM_ERP, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.RECOUNT.ToString, Get_Event_Details_Enum.RECOUNT, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID.ToString, Get_Event_Details_Enum.GET_RECOUNT_TRANSACTIONID, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID.ToString, Get_Event_Details_Enum.GET_RECOUNT_CANCEL_TRANSID, "System.Boolean", "N", "Y", "N"}, _
        {Get_Event_Details_Enum.EVENT_TYPE.ToString, Get_Event_Details_Enum.EVENT_TYPE, "System.Int32", "N", "Y", "N"}}

    Public Shared Get_Event_Details_PreReqData_Defns(,) As String = _
       {{Get_Event_Details_PreReqData_Enum.EVENT_ALLOCATION.ToString, Get_Event_Details_PreReqData_Enum.EVENT_ALLOCATION, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.REVIEW_COUNTS.ToString, Get_Event_Details_PreReqData_Enum.REVIEW_COUNTS, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.ITEM_DESCR.ToString, Get_Event_Details_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_Event_Details_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.ITEM_PRICE.ToString, Get_Event_Details_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.DISPLAY_PREV_COUNT.ToString, Get_Event_Details_PreReqData_Enum.DISPLAY_PREV_COUNT, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.COUNT_IN_DIFF_UOMS.ToString, Get_Event_Details_PreReqData_Enum.COUNT_IN_DIFF_UOMS, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, Get_Event_Details_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, Get_Event_Details_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.DISP_ALT_UOM.ToString, Get_Event_Details_PreReqData_Enum.DISP_ALT_UOM, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Event_Details_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Event_Details_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString, Get_Event_Details_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.DISPLAY_ORDERING_UOM_TYPE.ToString, Get_Event_Details_PreReqData_Enum.DISPLAY_ORDERING_UOM_TYPE, "System.String", "N", "Y", "N"}, _
       {Get_Event_Details_PreReqData_Enum.DEFAULT_UNIT_OF_MEASURE.ToString, Get_Event_Details_PreReqData_Enum.DEFAULT_UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.PERFORM_MANUAL_COUNTS.ToString, Get_Event_Details_PreReqData_Enum.PERFORM_MANUAL_COUNTS, "System.String", "N", "Y", "N"}, _
        {Get_Event_Details_PreReqData_Enum.REVIEW_MANUAL_COUNTS.ToString, Get_Event_Details_PreReqData_Enum.REVIEW_MANUAL_COUNTS, "System.String", "N", "Y", "N"}}

    Public Shared Get_Event_Detail_ListView_Defns(,) As String = _
          {{Get_Event_Detail_ListView_Enum.VENDOR_ITEM_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.VENDOR_ITEM_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.CUST_ITEM_NO_REQ.ToString, Get_Event_Detail_ListView_Enum.CUST_ITEM_NO_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.UPC_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.UPC_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STORAGE_AREA_REQ.ToString, Get_Event_Detail_ListView_Enum.STORAGE_AREA_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STOR_LEVEL_1_REQ.ToString, Get_Event_Detail_ListView_Enum.STOR_LEVEL_1_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STOR_LEVEL_2_REQ.ToString, Get_Event_Detail_ListView_Enum.STOR_LEVEL_2_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STOR_LEVEL_3_REQ.ToString, Get_Event_Detail_ListView_Enum.STOR_LEVEL_3_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STOR_LEVEL_4_REQ.ToString, Get_Event_Detail_ListView_Enum.STOR_LEVEL_4_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.CONTAINER_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.CONTAINER_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STAGED_DATE_REQ.ToString, Get_Event_Detail_ListView_Enum.STAGED_DATE_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.SERIAL_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.SERIAL_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.INV_LOT_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.INV_LOT_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.SYS_QTY_REQ.ToString, Get_Event_Detail_ListView_Enum.SYS_QTY_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.INV_TAG_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.INV_TAG_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.MFG_ITEM_ID_REQ.ToString, Get_Event_Detail_ListView_Enum.MFG_ITEM_ID_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.GTIN_REQ.ToString, Get_Event_Detail_ListView_Enum.GTIN_REQ, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.REPORT_FIELD_1.ToString, Get_Event_Detail_ListView_Enum.REPORT_FIELD_1, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.REPORT_FIELD_2.ToString, Get_Event_Detail_ListView_Enum.REPORT_FIELD_2, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.REPORT_FIELD_3.ToString, Get_Event_Detail_ListView_Enum.REPORT_FIELD_3, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.REPORT_FIELD_4.ToString, Get_Event_Detail_ListView_Enum.REPORT_FIELD_4, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.PRICE.ToString, Get_Event_Detail_ListView_Enum.PRICE, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.PACKAGING_STRING.ToString, Get_Event_Detail_ListView_Enum.PACKAGING_STRING, "System.Boolean", "N", "Y", "N"}, _
           {Get_Event_Detail_ListView_Enum.STD_PACK_UOM.ToString, Get_Event_Detail_ListView_Enum.STD_PACK_UOM, "System.Boolean", "N", "Y", "N"}}


    Public Shared Get_Event_DetailOutput_Header_Defns(,) As String = _
         {{Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT.ToString, Get_Event_DetailOutput_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_Header_Enum.EVENT_ID.ToString, Get_Event_DetailOutput_Header_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID.ToString, Get_Event_DetailOutput_Header_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_Header_Enum.PARENT_EVENT_ID.ToString, Get_Event_DetailOutput_Header_Enum.PARENT_EVENT_ID, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_Header_Enum.EVENT_TYPE.ToString, Get_Event_DetailOutput_Header_Enum.EVENT_TYPE, "System.Int32", "N", "Y", "N"}}

    Public Shared Get_Event_DetailOutput_Details_Defns(,) As String = _
       {{Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID.ToString, Get_Event_DetailOutput_Details_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM.ToString, Get_Event_DetailOutput_Details_Enum.ITEM_REC_NUM, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.MITMID.ToString, Get_Event_DetailOutput_Details_Enum.MITMID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.VITMID.ToString, Get_Event_DetailOutput_Details_Enum.VITMID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.DESCR.ToString, Get_Event_DetailOutput_Details_Enum.DESCR, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STORAGE_AREA.ToString, Get_Event_DetailOutput_Details_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1.ToString, Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2.ToString, Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3.ToString, Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4.ToString, Get_Event_DetailOutput_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE.ToString, Get_Event_DetailOutput_Details_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.PRICE.ToString, Get_Event_DetailOutput_Details_Enum.PRICE, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.CONTAINER_ID.ToString, Get_Event_DetailOutput_Details_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STAGED_DATE.ToString, Get_Event_DetailOutput_Details_Enum.STAGED_DATE, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.SERIAL_ID.ToString, Get_Event_DetailOutput_Details_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.INV_LOT_ID.ToString, Get_Event_DetailOutput_Details_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.COUNT_STATUS.ToString, Get_Event_DetailOutput_Details_Enum.COUNT_STATUS, "System.Char", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.QTY_COUNT.ToString, Get_Event_DetailOutput_Details_Enum.QTY_COUNT, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.SYSQTY.ToString, Get_Event_DetailOutput_Details_Enum.SYSQTY, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID.ToString, Get_Event_DetailOutput_Details_Enum.INVENTORY_TAG_ID, "System.Int32", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.GTIN.ToString, Get_Event_DetailOutput_Details_Enum.GTIN, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.UPC_ID.ToString, Get_Event_DetailOutput_Details_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO.ToString, Get_Event_DetailOutput_Details_Enum.CUSTOM_ITEM_NO, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.LOCATION.ToString, Get_Event_DetailOutput_Details_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.MANUFACTURER.ToString, Get_Event_DetailOutput_Details_Enum.MANUFACTURER, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.PROJECT_ID.ToString, Get_Event_DetailOutput_Details_Enum.PROJECT_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.EVENT_ID.ToString, Get_Event_DetailOutput_Details_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID.ToString, Get_Event_DetailOutput_Details_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT.ToString, Get_Event_DetailOutput_Details_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STORLOC.ToString, Get_Event_DetailOutput_Details_Enum.STORLOC, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID.ToString, Get_Event_DetailOutput_Details_Enum.COUNT_USER_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.USERNAME.ToString, Get_Event_DetailOutput_Details_Enum.USERNAME, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.CUST_ITEM_NO.ToString, Get_Event_DetailOutput_Details_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.ITEM_MANUFACTURER_NAME.ToString, Get_Event_DetailOutput_Details_Enum.ITEM_MANUFACTURER_NAME, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.UPDATE_DATE.ToString, Get_Event_DetailOutput_Details_Enum.UPDATE_DATE, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG.ToString, Get_Event_DetailOutput_Details_Enum.RECOUNT_FLAG, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.VALUEDIFF.ToString, Get_Event_DetailOutput_Details_Enum.VALUEDIFF, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF.ToString, Get_Event_DetailOutput_Details_Enum.REALVALUEDIFF, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID.ToString, Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_ID, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG.ToString, Get_Event_DetailOutput_Details_Enum.ACTUAL_RECOUNT_FLAG, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.ACTUAL_COUNT_QTY.ToString, Get_Event_DetailOutput_Details_Enum.ACTUAL_COUNT_QTY, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.RECNT_CHECK.ToString, Get_Event_DetailOutput_Details_Enum.RECNT_CHECK, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_NAME.ToString, Get_Event_DetailOutput_Details_Enum.RECOUNT_USER_NAME, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1.ToString, Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_1, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2.ToString, Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_2, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3.ToString, Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_3, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4.ToString, Get_Event_DetailOutput_Details_Enum.REPORT_FIELD_4, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING.ToString, Get_Event_DetailOutput_Details_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.QTY_COUNT1.ToString, Get_Event_DetailOutput_Details_Enum.QTY_COUNT1, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.QTY_COUNT2.ToString, Get_Event_DetailOutput_Details_Enum.QTY_COUNT2, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.UOM_TYPE.ToString, Get_Event_DetailOutput_Details_Enum.UOM_TYPE, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM.ToString, Get_Event_DetailOutput_Details_Enum.STD_PACK_UOM, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED.ToString, Get_Event_DetailOutput_Details_Enum.L_S_CONTROLLED, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG.ToString, Get_Event_DetailOutput_Details_Enum.CONSIGNED_FLAG, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.LATEST_SYSQTY.ToString, Get_Event_DetailOutput_Details_Enum.LATEST_SYSQTY, "System.Double", "N", "Y", "N"}, _
       {Get_Event_DetailOutput_Details_Enum.EVENT_TYPE.ToString, Get_Event_DetailOutput_Details_Enum.EVENT_TYPE, "System.Int32", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE.ToString, Get_Event_DetailOutput_Details_Enum.CONVERSION_RATE, "System.Double", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED.ToString, Get_Event_DetailOutput_Details_Enum.LOT_CONTROLLED, "System.String", "N", "Y", "N"}, _
        {Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED.ToString, Get_Event_DetailOutput_Details_Enum.SERIAL_CONTROLLED, "System.String", "N", "Y", "N"}}


    Public Shared Get_Event_DetailOutput_AlternateUOMs_Defns(,) As String = _
         {{Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE.ToString, Get_Event_DetailOutput_AlternateUOMs_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE.ToString, Get_Event_DetailOutput_AlternateUOMs_Enum.CONVERSION_RATE, "System.Double", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID.ToString, Get_Event_DetailOutput_AlternateUOMs_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_AlternateUOMs_Enum.ITEM_REC_NUM.ToString, Get_Event_DetailOutput_AlternateUOMs_Enum.ITEM_REC_NUM, "System.String", "N", "Y", "N"}, _
          {Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE.ToString, Get_Event_DetailOutput_AlternateUOMs_Enum.UOM_TYPE, "System.String", "N", "Y", "N"}}

#End Region

#Region "Delete Event"
    Public Shared Delete_CycleCount_Header_Defns(,) As String = _
    {{Delete_CycleCount_Header_Enum.TRANSACTION_ID.ToString, Delete_CycleCount_Header_Enum.TRANSACTION_ID, "System.Int32", "N", "Y", "N"}, _
     {Delete_CycleCount_Header_Enum.BUSINESS_UNIT.ToString, Delete_CycleCount_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Delete_CycleCount_Header_Enum.EVENT_ID.ToString, Delete_CycleCount_Header_Enum.EVENT_ID, "System.String", "N", "Y", "N"}}
#End Region

#Region "Send Event Details"
    Public Shared Send_CycleCount_Event_Defns(,) As String = _
           {{Send_CycleCount_Event_Enum.BUSINESS_UNIT.ToString, Send_CycleCount_Event_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.EVENT_ID.ToString, Send_CycleCount_Event_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.FROM_STOR_LOC.ToString, Send_CycleCount_Event_Enum.FROM_STOR_LOC, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.TO_STOR_LOC.ToString, Send_CycleCount_Event_Enum.TO_STOR_LOC, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.NO_RECORDS.ToString, Send_CycleCount_Event_Enum.NO_RECORDS, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.USER_ID.ToString, Send_CycleCount_Event_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.ALLOCATION_STATUS.ToString, Send_CycleCount_Event_Enum.ALLOCATION_STATUS, "System.String", "N", "Y", "N"}, _
            {Send_CycleCount_Event_Enum.ACTUAL_ALLOCATION_STATUS.ToString, Send_CycleCount_Event_Enum.ACTUAL_ALLOCATION_STATUS, "System.String", "N", "Y", "N"}}

    Public Shared Send_CycleCount_Details_Defns(,) As String = _
          {{Send_CycleCount_Details_Enum.ITEM_ID.ToString, Send_CycleCount_Details_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Send_CycleCount_Details_Enum.COUNT_QTY.ToString, Send_CycleCount_Details_Enum.COUNT_QTY, "System.String", "N", "Y", "N"}, _
           {Send_CycleCount_Details_Enum.LINE_NBR.ToString, Send_CycleCount_Details_Enum.LINE_NBR, "System.Int32", "N", "Y", "N"}, _
           {Send_CycleCount_Details_Enum.PAGE_NBR.ToString, Send_CycleCount_Details_Enum.PAGE_NBR, "System.Int32", "N", "Y", "N"}}

	Public Shared Send_CycleCount_Output_Defns(,) As String = _
        {{Send_Event_Output_Enum.STATUS_CODE.ToString, Send_Event_Output_Enum.STATUS_CODE, "System.String", "Y", "Y", "N"}, _
        {Send_Event_Output_Enum.STATUS_DESCR.ToString, Send_Event_Output_Enum.STATUS_DESCR, "System.String", "Y", "Y", "N"}}

#End Region


#End Region

#Region "Put Away"

#Region "Get Header"

    Public Shared Get_PutAway_Header_Defns(,) As String = _
        {{Enum_Get_PutAway_Header.BUSINESS_UNIT.ToString, Enum_Get_PutAway_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Enum_Get_PutAway_Header.PO_ID.ToString, Enum_Get_PutAway_Header.PO_ID, "System.String", "N", "Y", "N"}, _
         {Enum_Get_PutAway_Header.PLAN_ID.ToString, Enum_Get_PutAway_Header.PLAN_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_PutAway_Transactions_Defns(,) As String = _
         {{Enum_Get_PutAway_Header_Transactions.TRANSACTION_ID.ToString, Enum_Get_PutAway_Header_Transactions.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_PutAway_BusinessUnits_Defns(,) As String = _
     {{Enum_Get_PutAway_Header_BusinessUnit.BUSINESS_UNIT.ToString, Enum_Get_PutAway_Header_BusinessUnit.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_PutAway_Header_Output_Header(,) As String = _
        {{Eum_Get_PutAway_Header_OutPut.BUSINESS_UNIT.ToString, Eum_Get_PutAway_Header_OutPut.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Eum_Get_PutAway_Header_OutPut.PLAN_ID.ToString, Eum_Get_PutAway_Header_OutPut.PLAN_ID, "System.String", "N", "Y", "N"}, _
         {Eum_Get_PutAway_Header_OutPut.PO_ID.ToString, Eum_Get_PutAway_Header_OutPut.PO_ID, "System.String", "N", "Y", "N"}, _
         {Eum_Get_PutAway_Header_OutPut.STAGED_DATE.ToString, Eum_Get_PutAway_Header_OutPut.STAGED_DATE, "System.String", "N", "Y", "N"}, _
         {Eum_Get_PutAway_Header_OutPut.VENDOR_ID.ToString, Eum_Get_PutAway_Header_OutPut.VENDOR_ID, "System.String", "N", "Y", "N"}, _
         {Eum_Get_PutAway_Header_OutPut.PUTAWAY_STATUS.ToString, Eum_Get_PutAway_Header_OutPut.PUTAWAY_STATUS, "System.String", "N", "Y", "N"}}

    Public Shared Get_PutAway_Header_PreReq_Defns(,) As String = _
           {{Enum_Get_PutAway_Header_PreReqData.SCHEMA_NAME.ToString, Enum_Get_PutAway_Header_PreReqData.SCHEMA_NAME, "System.String", "N", "Y", "N"}, _
            {Enum_Get_PutAway_Header_PreReqData.REMOTE_DB_TYPE.ToString, Enum_Get_PutAway_Header_PreReqData.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}}


#End Region

#Region "Get Details"
    Public Shared GetDetails_PutAway_Header_Defns(,) As String = _
        {{GetDetails_PutAway_Header_Enum.PLAN_ID.ToString, GetDetails_PutAway_Header_Enum.PLAN_ID, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_Header_Enum.PO_ID.ToString, GetDetails_PutAway_Header_Enum.PO_ID, "System.String", "N", "Y", "N"}}


    Public Shared GetDetails_PutAway_Transactions_Defns(,) As String = _
     {{GetDetails_PutAway_Transactions_Enum.TRANSACTION_ID.ToString, GetDetails_PutAway_Transactions_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared GetDetails_PutAway_BusinessUnits_Defns(,) As String = _
         {{GetDetails_PutAway_BusinessUnits_Enum.BUSINESS_UNIT.ToString, GetDetails_PutAway_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared GetDetails_PutAway_PreReq_Defns(,) As String = _
         {{GetDetails_PutAway_PreReqData_Enum.MultipleUserDownload.ToString, GetDetails_PutAway_PreReqData_Enum.MultipleUserDownload, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, GetDetails_PutAway_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, GetDetails_PutAway_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.REMOTE_SCHEMA.ToString, GetDetails_PutAway_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.REMOTE_DB_TYPE.ToString, GetDetails_PutAway_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.ITEM_DESCR.ToString, GetDetails_PutAway_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, GetDetails_PutAway_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.ITEM_PRICE.ToString, GetDetails_PutAway_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
         {GetDetails_PutAway_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString, GetDetails_PutAway_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}}



    Public Shared GetDetails_PutAway_ListView_Defns(,) As String = _
     {{GetDetails_PutAway_ListView_Enum.PRICE.ToString, GetDetails_PutAway_ListView_Enum.PRICE, "System.String", "N", "Y", "N"}, _
     {GetDetails_PutAway_ListView_Enum.VENDOR_ITEM_ID.ToString, GetDetails_PutAway_ListView_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
     {GetDetails_PutAway_ListView_Enum.MFG_ITEM_ID.ToString, GetDetails_PutAway_ListView_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
     {GetDetails_PutAway_ListView_Enum.PACKAGING_STRING.ToString, GetDetails_PutAway_ListView_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}


    Public Shared GetDetails_PutAway_Output_Defns(,) As String = _
    {{GetDetails_PutAway_Output_Enum.PTWYPLAN_LN_NBR.ToString, GetDetails_PutAway_Output_Enum.PTWYPLAN_LN_NBR, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.INV_ITEM_ID.ToString, GetDetails_PutAway_Output_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.QTY_BASE.ToString, GetDetails_PutAway_Output_Enum.QTY_BASE, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.UNIT_OF_MEASURE.ToString, GetDetails_PutAway_Output_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.STORAGE_AREA.ToString, GetDetails_PutAway_Output_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.STOR_LEVEL_1.ToString, GetDetails_PutAway_Output_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.STOR_LEVEL_2.ToString, GetDetails_PutAway_Output_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.STOR_LEVEL_3.ToString, GetDetails_PutAway_Output_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.STOR_LEVEL_4.ToString, GetDetails_PutAway_Output_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.PO_ID.ToString, GetDetails_PutAway_Output_Enum.PO_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.VENDOR_ID.ToString, GetDetails_PutAway_Output_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.RECEIVER_ID.ToString, GetDetails_PutAway_Output_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.RECV_LN_NBR.ToString, GetDetails_PutAway_Output_Enum.RECV_LN_NBR, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.ITEM_DESCR.ToString, GetDetails_PutAway_Output_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.VENDOR_ITEM_ID.ToString, GetDetails_PutAway_Output_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.MFG_ITEM_ID.ToString, GetDetails_PutAway_Output_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.UPDATE_QTY.ToString, GetDetails_PutAway_Output_Enum.UPDATE_QTY, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.GTIN.ToString, GetDetails_PutAway_Output_Enum.GTIN, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.UPCID.ToString, GetDetails_PutAway_Output_Enum.UPCID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.CUSTITEMID.ToString, GetDetails_PutAway_Output_Enum.CUSTITEMID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.INV_LOT_ID.ToString, GetDetails_PutAway_Output_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.SERIAL_ID.ToString, GetDetails_PutAway_Output_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.PRICE.ToString, GetDetails_PutAway_Output_Enum.PRICE, "System.String", "N", "Y", "N"}, _
    {GetDetails_PutAway_Output_Enum.PACKAGING_STRING.ToString, GetDetails_PutAway_Output_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}

    Public Shared GetDetails_PutAway_Output_Header_Defns(,) As String = _
   {{GetDetails_PutAway_Output_Header_Enum.TRANSACTION_ID.ToString, GetDetails_PutAway_Output_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

#End Region

#Region "Send Details"

    Public Shared Send_PutAway_Header_Defns(,) As String = _
    {{SendDetails_PutAway_Header_Enum.BUSINESS_UNIT.ToString, SendDetails_PutAway_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Header_Enum.PTWY_PLAN_ID.ToString, SendDetails_PutAway_Header_Enum.PTWY_PLAN_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Header_Enum.PO_ID.ToString, SendDetails_PutAway_Header_Enum.PO_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Header_Enum.USER_ID.ToString, SendDetails_PutAway_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Header_Enum.TRANSACTION_ID.ToString, SendDetails_PutAway_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
		{SendDetails_PutAway_Header_Enum.VENDOR_ID.ToString, SendDetails_PutAway_Header_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
		{SendDetails_PutAway_Header_Enum.START_TIME.ToString, SendDetails_PutAway_Header_Enum.START_TIME, "System.String", "N", "Y", "N"}, _
		{SendDetails_PutAway_Header_Enum.END_TIME.ToString, SendDetails_PutAway_Header_Enum.END_TIME, "System.String", "N", "Y", "N"}}

    Public Shared Send_PutAway_Details_Defns(,) As String = _
    {{SendDetails_PutAway_Details_Enum.PTWYPLAN_LN_NBR.ToString, SendDetails_PutAway_Details_Enum.PTWYPLAN_LN_NBR, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.DT_TIMESTAMP.ToString, SendDetails_PutAway_Details_Enum.DT_TIMESTAMP, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.INV_ITEM_ID.ToString, SendDetails_PutAway_Details_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STORAGE_AREA.ToString, SendDetails_PutAway_Details_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STOR_LEVEL_1.ToString, SendDetails_PutAway_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STOR_LEVEL_2.ToString, SendDetails_PutAway_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STOR_LEVEL_3.ToString, SendDetails_PutAway_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STOR_LEVEL_4.ToString, SendDetails_PutAway_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.RECV_LN_NBR.ToString, SendDetails_PutAway_Details_Enum.RECV_LN_NBR, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.UNIT_OF_MEASURE.ToString, SendDetails_PutAway_Details_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.QTY.ToString, SendDetails_PutAway_Details_Enum.QTY, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.BASE_QTY.ToString, SendDetails_PutAway_Details_Enum.BASE_QTY, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.VENDOR_ID.ToString, SendDetails_PutAway_Details_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.STAGED_DATE.ToString, SendDetails_PutAway_Details_Enum.STAGED_DATE, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.RECEIVER_ID.ToString, SendDetails_PutAway_Details_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.START_TIME.ToString, SendDetails_PutAway_Details_Enum.START_TIME, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.END_TIME.ToString, SendDetails_PutAway_Details_Enum.END_TIME, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.CUST_ITEM_NO.ToString, SendDetails_PutAway_Details_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.LINE_NBR.ToString, SendDetails_PutAway_Details_Enum.LINE_NBR, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.INV_LOT_ID.ToString, SendDetails_PutAway_Details_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_Details_Enum.SERIAL_ID.ToString, SendDetails_PutAway_Details_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}}

    Public Shared SendDetails_PutAway_BusinessRules_Defns(,) As String = _
       {{SendDetails_PutAway_PreReq_Enum.PS_USER.ToString, SendDetails_PutAway_PreReq_Enum.PS_USER, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.ITEM_PUTAWAY_HIGH_PCT.ToString, SendDetails_PutAway_PreReq_Enum.ITEM_PUTAWAY_HIGH_PCT, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.ITEM_PUTAWAY_LOW_PCT.ToString, SendDetails_PutAway_PreReq_Enum.ITEM_PUTAWAY_LOW_PCT, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.REMOTE_SCHEMA.ToString, SendDetails_PutAway_PreReq_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.REMOTE_DB_TYPE.ToString, SendDetails_PutAway_PreReq_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.TRANSACTION_STATUS_REMOTESUCCESS.ToString, SendDetails_PutAway_PreReq_Enum.TRANSACTION_STATUS_REMOTESUCCESS, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.ENTERPRISE_SYSTEM_NAME.ToString, SendDetails_PutAway_PreReq_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {SendDetails_PutAway_PreReq_Enum.ENTERPRISE_VERSION.ToString, SendDetails_PutAway_PreReq_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}}

    Public Shared SendDetails_PutAway_Output_Defns(,) As String = _
    {{SendDetails_PutAway_Output_Enum.STATUS_CODE.ToString, SendDetails_PutAway_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}}

#End Region

#Region "Delete Header"

    Public Shared Delete_PutAway_Header_Defns(,) As String = _
    {{Enum_Delete_PutAway_Header.BUSINESS_UNIT.ToString, Enum_Delete_PutAway_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
    {Enum_Delete_PutAway_Header.PO_ID.ToString, Enum_Delete_PutAway_Header.PO_ID, "System.String", "N", "Y", "N"}, _
    {Enum_Delete_PutAway_Header.PLAN_ID.ToString, Enum_Delete_PutAway_Header.PLAN_ID, "System.String", "N", "Y", "N"}, _
    {Enum_Delete_PutAway_Header.TRANSACTION_ID.ToString, Enum_Delete_PutAway_Header.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

#End Region

#End Region

#Region "Receive"

#Region "SendPO"

    ' TODO have to check all datatypes
    Public Shared SendPO_Receive_Header_Defns(,) As String = _
      {{SendPO_Receive_Header_Enum.BUSINESS_UNIT.ToString, SendPO_Receive_Header_Enum.BUSINESS_UNIT, "System.String", "N", "N", "N"}, _
      {SendPO_Receive_Header_Enum.PO_ID.ToString, SendPO_Receive_Header_Enum.PO_ID, "System.String", "N", "N", "N"}, _
      {SendPO_Receive_Header_Enum.VENDOR_ID.ToString, SendPO_Receive_Header_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.BUSINESS_UNIT_PO.ToString, SendPO_Receive_Header_Enum.BUSINESS_UNIT_PO, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.TRANSACTION_CODE.ToString, SendPO_Receive_Header_Enum.TRANSACTION_CODE, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.DROP_SHIP_FL.ToString, SendPO_Receive_Header_Enum.DROP_SHIP_FL, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.TRANSACTION_ID.ToString, SendPO_Receive_Header_Enum.TRANSACTION_ID, "System.Int32", "Y", "N", "Y"}, _
      {SendPO_Receive_Header_Enum.START_DT_TIME.ToString, SendPO_Receive_Header_Enum.START_DT_TIME, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.END_DT_TIME.ToString, SendPO_Receive_Header_Enum.END_DT_TIME, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.CARRIER_ID.ToString, SendPO_Receive_Header_Enum.CARRIER_ID, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.BILL_OF_LADING.ToString, SendPO_Receive_Header_Enum.BILL_OF_LADING, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.INVOICE_NO.ToString, SendPO_Receive_Header_Enum.INVOICE_NO, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.STATUS.ToString, SendPO_Receive_Header_Enum.STATUS, "System.Int32", "N", "N", "N"}, _
      {SendPO_Receive_Header_Enum.USER_ID.ToString, SendPO_Receive_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.NON_STOCK_COUNT.ToString, SendPO_Receive_Header_Enum.NON_STOCK_COUNT, "System.Int32", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.STOCK_COUNT.ToString, SendPO_Receive_Header_Enum.STOCK_COUNT, "System.Int32", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.RECEIVER_ID.ToString, SendPO_Receive_Header_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.HDR_CMTS.ToString, SendPO_Receive_Header_Enum.HDR_CMTS, "System.String", "N", "Y", "N"}, _
      {SendPO_Receive_Header_Enum.PO_DT.ToString, SendPO_Receive_Header_Enum.PO_DT, "System.String", "N", "Y", "N"}}


    Public Shared SendPO_Receive_BusinessRules_Defns(,) As String = _
        {{SendPO_Receive_BusinessRules_Enum.REMOTE_SCHEMA.ToString, SendPO_Receive_BusinessRules_Enum.REMOTE_SCHEMA, "System.String", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.NON_STOCK_STORE.ToString, SendPO_Receive_BusinessRules_Enum.NON_STOCK_STORE, "System.String", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.PS_USER.ToString, SendPO_Receive_BusinessRules_Enum.PS_USER, "System.String", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.ASN_RECEIPT_STATUS.ToString, SendPO_Receive_BusinessRules_Enum.ASN_RECEIPT_STATUS, "System.String", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.ITEM_RECV_HIGH_PCT.ToString, SendPO_Receive_BusinessRules_Enum.ITEM_RECV_HIGH_PCT, "System.Int32", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.ITEM_RECV_LOW_PCT.ToString, SendPO_Receive_BusinessRules_Enum.ITEM_RECV_LOW_PCT, "System.Int32", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.REMOTE_DB_TYPE.ToString, SendPO_Receive_BusinessRules_Enum.REMOTE_DB_TYPE, "System.String", "Y", "N", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME.ToString, SendPO_Receive_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.ENTERPRISE_VERSION.ToString, SendPO_Receive_BusinessRules_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.LOT_SERIAL_ENABLED.ToString, SendPO_Receive_BusinessRules_Enum.LOT_SERIAL_ENABLED, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.POU_IMPLEMENTED.ToString, SendPO_Receive_BusinessRules_Enum.POU_IMPLEMENTED, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString, SendPO_Receive_BusinessRules_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString, SendPO_Receive_BusinessRules_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR, "System.String", "N", "Y", "N"}, _
          {SendPO_Receive_BusinessRules_Enum.ERP_USER_ID.ToString, SendPO_Receive_BusinessRules_Enum.ERP_USER_ID, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.PRINTER_ADDRESS.ToString, SendPO_Receive_BusinessRules_Enum.PRINTER_ADDRESS, "System.String", "N", "Y", "N"}, _
        {SendPO_Receive_BusinessRules_Enum.CUSTOM_VIEW_ERPUSER.ToString, SendPO_Receive_BusinessRules_Enum.CUSTOM_VIEW_ERPUSER, "System.String", "N", "Y", "N"}, _
		{SendPO_Receive_BusinessRules_Enum.RESTRICT_ZERO_QTY.ToString, SendPO_Receive_BusinessRules_Enum.RESTRICT_ZERO_QTY, "System.String", "N", "Y", "N"}}


    Public Shared SendPO_Receive_Details_Defns(,) As String = _
         {{SendPO_Receive_Details_Enum.LINE_NBR.ToString, SendPO_Receive_Details_Enum.LINE_NBR, "System.Int32", "N", "N", "Y"}, _
         {SendPO_Receive_Details_Enum.SCHED_NBR.ToString, SendPO_Receive_Details_Enum.SCHED_NBR, "System.Int32", "N", "N", "Y"}, _
         {SendPO_Receive_Details_Enum.QTY.ToString, SendPO_Receive_Details_Enum.QTY, "System.Double", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.UNIT_OF_MEASURE.ToString, SendPO_Receive_Details_Enum.UNIT_OF_MEASURE, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.CARRIER_ID.ToString, SendPO_Receive_Details_Enum.CARRIER_ID, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.BILL_OF_LADING.ToString, SendPO_Receive_Details_Enum.BILL_OF_LADING, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.SHIPTO_ID.ToString, SendPO_Receive_Details_Enum.SHIPTO_ID, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.NO_OF_BOXES.ToString, SendPO_Receive_Details_Enum.NO_OF_BOXES, "System.Int32", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.INV_ITEM_ID.ToString, SendPO_Receive_Details_Enum.INV_ITEM_ID, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.INVENTORY_ITEM.ToString, SendPO_Receive_Details_Enum.INVENTORY_ITEM, "System.String", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.QTY_PO.ToString, SendPO_Receive_Details_Enum.QTY_PO, "System.Double", "N", "N", "N"}, _
         {SendPO_Receive_Details_Enum.TRACKING_ID.ToString, SendPO_Receive_Details_Enum.TRACKING_ID, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.EXT_TRK_NO.ToString, SendPO_Receive_Details_Enum.EXT_TRK_NO, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID.ToString, SendPO_Receive_Details_Enum.RECEIVING_ROUTING_ID, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.LOCATION.ToString, SendPO_Receive_Details_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.RECEIVED_QTY.ToString, SendPO_Receive_Details_Enum.RECEIVED_QTY, "System.Double", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.RECV_UOM.ToString, SendPO_Receive_Details_Enum.RECV_UOM, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE.ToString, SendPO_Receive_Details_Enum.RECV_CONVERSION_RATE, "System.Double", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.LOT_ID.ToString, SendPO_Receive_Details_Enum.LOT_ID, "System.String", "N", "Y", "Y"}, _
         {SendPO_Receive_Details_Enum.SERIAL_ID.ToString, SendPO_Receive_Details_Enum.SERIAL_ID, "System.String", "N", "Y", "Y"}, _
         {SendPO_Receive_Details_Enum.CONVERSION_RATE.ToString, SendPO_Receive_Details_Enum.CONVERSION_RATE, "System.Double", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.ASN_QTY.ToString, SendPO_Receive_Details_Enum.ASN_QTY, "System.Double", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.LINE_CMTS.ToString, SendPO_Receive_Details_Enum.LINE_CMTS, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.CUST_ITEM_NO.ToString, SendPO_Receive_Details_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.EXPIRY_DATE.ToString, SendPO_Receive_Details_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.DESCRIPTION.ToString, SendPO_Receive_Details_Enum.DESCRIPTION, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.DUE_DT.ToString, SendPO_Receive_Details_Enum.DUE_DT, "System.String", "N", "Y", "N"}, _
         {SendPO_Receive_Details_Enum.STORAGE_LOCATION.ToString, SendPO_Receive_Details_Enum.STORAGE_LOCATION, "System.String", "N", "Y", "N"}}

    'TODO: Need to clarify, LotID, SerialID and Conversion Rate, as of now creating the columns for these, we will not use these anywhere

    Public Shared SendPO_Receive_ItemSubDetails_Defns(,) As String = _
   {{SendPO_Receive_ItemSubDetails_Enum.LINE_NBR.ToString, SendPO_Receive_ItemSubDetails_Enum.LINE_NBR, "System.Int32", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR.ToString, SendPO_Receive_ItemSubDetails_Enum.SCHED_NBR, "System.Int32", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.LOT_ID.ToString, SendPO_Receive_ItemSubDetails_Enum.LOT_ID, "System.String", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID.ToString, SendPO_Receive_ItemSubDetails_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE.ToString, SendPO_Receive_ItemSubDetails_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE.ToString, SendPO_Receive_ItemSubDetails_Enum.CONVERSION_RATE, "System.Double", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE.ToString, SendPO_Receive_ItemSubDetails_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
    {SendPO_Receive_ItemSubDetails_Enum.QTY.ToString, SendPO_Receive_ItemSubDetails_Enum.QTY, "System.String", "N", "Y", "N"}}


    Public Shared SendPO_Receive_Output_Defns(,) As String = _
        {{SendPO_Receive_Output_Enum.STATUS_CODE.ToString, SendPO_Receive_Output_Enum.STATUS_CODE, "System.String", "Y", "Y", "N"}, _
        {SendPO_Receive_Output_Enum.STATUS_DESCR.ToString, SendPO_Receive_Output_Enum.STATUS_DESCR, "System.String", "Y", "Y", "N"}}

#End Region
#Region "SearchPO"
    Public Shared SearchPO_Receive_Header_Defns(,) As String = _
           {{SearchPO_Receive_Header.BUSINESS_UNIT.ToString, SearchPO_Receive_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.ITEM_ID.ToString, SearchPO_Receive_Header.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.VENDOR_ID.ToString, SearchPO_Receive_Header.VENDOR_ID, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.VENDOR_NAME.ToString, SearchPO_Receive_Header.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.SHIP_TO_ID.ToString, SearchPO_Receive_Header.SHIP_TO_ID, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.FROM_DATE.ToString, SearchPO_Receive_Header.FROM_DATE, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.TO_DATE.ToString, SearchPO_Receive_Header.TO_DATE, "System.String", "N", "Y", "N"}, _
            {SearchPO_Receive_Header.SEARCH_TYPE.ToString, SearchPO_Receive_Header.SEARCH_TYPE, "System.String", "N", "Y", "N"}, _
   {SearchPO_Receive_Header.INCLUDE_ASN_POS.ToString, SearchPO_Receive_Header.INCLUDE_ASN_POS, "System.String", "N", "Y", "N"}}


    Public Shared SearchPO_Params_Defns(,) As String = _
     {{SearchPO_PreReqData_Enum.MAX_NO_OF_REC_DOWNLOAD.ToString, SearchPO_PreReqData_Enum.MAX_NO_OF_REC_DOWNLOAD, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, SearchPO_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.SCHEMA_NAME.ToString, SearchPO_PreReqData_Enum.SCHEMA_NAME, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.REMOTE_DB_TYPE.ToString, SearchPO_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString, SearchPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.ASN_RECEIPT_STATUS.ToString, SearchPO_PreReqData_Enum.ASN_RECEIPT_STATUS, "System.String", "N", "Y", "N"}, _
       {SearchPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString, SearchPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU, "System.String", "N", "Y", "N"}}
#End Region

#Region "GetPO"
    Public Shared GetPO_Receive_Header_Defns(,) As String = _
               {{GetPO_Receive_Header.BUSINESS_UNIT.ToString, GetPO_Receive_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.PO_NO.ToString, GetPO_Receive_Header.PO_NO, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.PACKSLIP_SEL_INVOICE_NO.ToString, GetPO_Receive_Header.PACKSLIP_SEL_INVOICE_NO, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.TOTAL_PO.ToString, GetPO_Receive_Header.TOTAL_PO, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.SHIP_TO_ID.ToString, GetPO_Receive_Header.SHIP_TO_ID, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.TRANS_ID.ToString, GetPO_Receive_Header.TRANS_ID, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.INCLUDE_ALL_PO_LINES.ToString, GetPO_Receive_Header.INCLUDE_ALL_PO_LINES, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.SELECTED_PAK_SLIP_NO.ToString, GetPO_Receive_Header.SELECTED_PAK_SLIP_NO, "System.String", "N", "Y", "N"}, _
                {GetPO_Receive_Header.RECEIVER_ID.ToString, GetPO_Receive_Header.RECEIVER_ID, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_Params_Defns(,) As String = _
     {{GetPO_PreReqData_Enum.NON_STOCK_STORE.ToString, GetPO_PreReqData_Enum.NON_STOCK_STORE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.MULTIPLE_USER_DOWNLOAD.ToString, GetPO_PreReqData_Enum.MULTIPLE_USER_DOWNLOAD, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.PS_USER.ToString, GetPO_PreReqData_Enum.PS_USER, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.REQUESTOR_EMAIL_TABLE.ToString, GetPO_PreReqData_Enum.REQUESTOR_EMAIL_TABLE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.ASN_RECEIPT_STATUS.ToString, GetPO_PreReqData_Enum.ASN_RECEIPT_STATUS, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, GetPO_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, GetPO_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.EDIT_UOM.ToString, GetPO_PreReqData_Enum.EDIT_UOM, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.SCHEMA_NAME.ToString, GetPO_PreReqData_Enum.SCHEMA_NAME, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.REMOTE_DB_TYPE.ToString, GetPO_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.ITEM_DESCR.ToString, GetPO_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.LOT_SERIAL_ENABLED.ToString, GetPO_PreReqData_Enum.LOT_SERIAL_ENABLED, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.POU_IMPLEMENTED.ToString, GetPO_PreReqData_Enum.POU_IMPLEMENTED, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS.ToString, GetPO_PreReqData_Enum.SEND_LOT_SERIAL_INFO_TO_MMIS, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR.ToString, GetPO_PreReqData_Enum.STORE_LOT_SERIAL_INFO_IN_ATPAR, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.ITEM_PRICE.ToString, GetPO_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString, GetPO_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}, _
    {GetPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS.ToString, GetPO_PreReqData_Enum.RECV_EXCLUDE_CAPITAL_POS, "System.String", "N", "Y", "N"}, _
       {GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU.ToString, GetPO_PreReqData_Enum.SEARCH_PO_WITHOUT_BU, "System.String", "N", "Y", "N"}, _
      {GetPO_PreReqData_Enum.RECEIVE_ITEM.ToString, GetPO_PreReqData_Enum.RECEIVE_ITEM, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_ListView_Params_Defns(,) As String = _
    {{GetPO_ListView_Enum.INV_ITEM_ID.ToString, GetPO_ListView_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.DESCR.ToString, GetPO_ListView_Enum.DESCR, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.INVENTORY_ITEM.ToString, GetPO_ListView_Enum.INVENTORY_ITEM, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.DUE_DT.ToString, GetPO_ListView_Enum.DUE_DT, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.UPC_ID.ToString, GetPO_ListView_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.UNIT_OF_MEASURE.ToString, GetPO_ListView_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.LINE_QTY.ToString, GetPO_ListView_Enum.LINE_QTY, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.RECEIVED_QTY.ToString, GetPO_ListView_Enum.RECEIVED_QTY, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.LINE_NBR.ToString, GetPO_ListView_Enum.LINE_NBR, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.LOCATION.ToString, GetPO_ListView_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.LINE_PO_QTY.ToString, GetPO_ListView_Enum.LINE_PO_QTY, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.ITM_ID_VNDR.ToString, GetPO_ListView_Enum.ITM_ID_VNDR, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.MFG_ITEM_ID.ToString, GetPO_ListView_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.SHIPTO_ID.ToString, GetPO_ListView_Enum.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.INSP_FLAG.ToString, GetPO_ListView_Enum.INSP_FLAG, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.ADDRESS1.ToString, GetPO_ListView_Enum.ADDRESS1, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.ADDRESS2.ToString, GetPO_ListView_Enum.ADDRESS2, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.ADDRESS3.ToString, GetPO_ListView_Enum.ADDRESS3, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.REQ_NUM.ToString, GetPO_ListView_Enum.REQ_NUM, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.DELIVER_TO.ToString, GetPO_ListView_Enum.DELIVER_TO, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.PRICE.ToString, GetPO_ListView_Enum.PRICE, "System.String", "N", "Y", "N"}, _
      {GetPO_ListView_Enum.PACKAGING_STRING.ToString, GetPO_ListView_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}, _
	  {GetPO_ListView_Enum.BUILDING.ToString, GetPO_ListView_Enum.BUILDING, "System.String", "N", "Y", "N"}, _
	  {GetPO_ListView_Enum.FLOOR.ToString, GetPO_ListView_Enum.FLOOR, "System.String", "N", "Y", "N"}, _
	  {GetPO_ListView_Enum.SECTOR.ToString, GetPO_ListView_Enum.SECTOR, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_Recv_ERP_RecvIDs_Defns(,) As String = _
    {{GetPO_Recv_ERP_RecvIDs_Enum.STATUS_CODE.ToString, GetPO_Recv_ERP_RecvIDs_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
      {GetPO_Recv_ERP_RecvIDs_Enum.RECEIVERID.ToString, GetPO_Recv_ERP_RecvIDs_Enum.RECEIVERID, "System.String", "N", "Y", "N"}, _
      {GetPO_Recv_ERP_RecvIDs_Enum.RECPT_DATE.ToString, GetPO_Recv_ERP_RecvIDs_Enum.RECPT_DATE, "System.String", "N", "Y", "N"}, _
      {GetPO_Recv_ERP_RecvIDs_Enum.INVOICE_NO.ToString, GetPO_Recv_ERP_RecvIDs_Enum.INVOICE_NO, "System.String", "N", "Y", "N"}, _
      {GetPO_Recv_ERP_RecvIDs_Enum.PACKSLIP_NO.ToString, GetPO_Recv_ERP_RecvIDs_Enum.PACKSLIP_NO, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_Recv_ERP_Header_Defns(,) As String = _
   {{GetPO_Recv_ERP_Header.PO_ID.ToString, GetPO_Recv_ERP_Header.PO_ID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.BUSINESS_UNIT.ToString, GetPO_Recv_ERP_Header.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.RECEIVER_ID.ToString, GetPO_Recv_ERP_Header.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.VENDOR_ID.ToString, GetPO_Recv_ERP_Header.VENDOR_ID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.PO_DT.ToString, GetPO_Recv_ERP_Header.PO_DT, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.ERS_TYPE.ToString, GetPO_Recv_ERP_Header.ERS_TYPE, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.HDR_CMTS.ToString, GetPO_Recv_ERP_Header.HDR_CMTS, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.VNDR_NAME.ToString, GetPO_Recv_ERP_Header.VNDR_NAME, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.TRANS_CODE.ToString, GetPO_Recv_ERP_Header.TRANS_CODE, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.BUYER_ID.ToString, GetPO_Recv_ERP_Header.BUYER_ID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.PHONE.ToString, GetPO_Recv_ERP_Header.PHONE, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.NO_REC.ToString, GetPO_Recv_ERP_Header.NO_REC, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.TRANSID.ToString, GetPO_Recv_ERP_Header.TRANSID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.DROPSHIP_FL.ToString, GetPO_Recv_ERP_Header.DROPSHIP_FL, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_NAME.ToString, GetPO_Recv_ERP_Header.SH_NAME, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_ADDR1.ToString, GetPO_Recv_ERP_Header.SH_ADDR1, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_ADDR2.ToString, GetPO_Recv_ERP_Header.SH_ADDR2, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_ADDR3.ToString, GetPO_Recv_ERP_Header.SH_ADDR3, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_ADDR4.ToString, GetPO_Recv_ERP_Header.SH_ADDR4, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_Header.SH_CITY_ADDR5.ToString, GetPO_Recv_ERP_Header.SH_CITY_ADDR5, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_Recv_ERP_Details_Defns(,) As String = _
{{GetPO_Recv_ERP_Details.LN_NBR.ToString, GetPO_Recv_ERP_Details.LN_NBR, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.SCHED_NBR.ToString, GetPO_Recv_ERP_Details.SCHED_NBR, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.ITEM_ID.ToString, GetPO_Recv_ERP_Details.ITEM_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.DESCR.ToString, GetPO_Recv_ERP_Details.DESCR, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.MFG_ITM_ID.ToString, GetPO_Recv_ERP_Details.MFG_ITM_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.VNDR_ITM_ID.ToString, GetPO_Recv_ERP_Details.VNDR_ITM_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.GTIN.ToString, GetPO_Recv_ERP_Details.GTIN, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.UPC_ID.ToString, GetPO_Recv_ERP_Details.UPC_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.LCMNTS.ToString, GetPO_Recv_ERP_Details.LCMNTS, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.DUE_DT.ToString, GetPO_Recv_ERP_Details.DUE_DT, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.UOM.ToString, GetPO_Recv_ERP_Details.UOM, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.ISSUE_UOM.ToString, GetPO_Recv_ERP_Details.ISSUE_UOM, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.CONV_RATE.ToString, GetPO_Recv_ERP_Details.CONV_RATE, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.QTY_PO.ToString, GetPO_Recv_ERP_Details.QTY_PO, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.RECV_QTY.ToString, GetPO_Recv_ERP_Details.RECV_QTY, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.QTY_SH_RECVD.ToString, GetPO_Recv_ERP_Details.QTY_SH_RECVD, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.TOLPCT.ToString, GetPO_Recv_ERP_Details.TOLPCT, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.INSP_FLAG.ToString, GetPO_Recv_ERP_Details.INSP_FLAG, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.SHIPTO_ID.ToString, GetPO_Recv_ERP_Details.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.INV_ITM_FLAG.ToString, GetPO_Recv_ERP_Details.INV_ITM_FLAG, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.ASSET_ITM_FLAG.ToString, GetPO_Recv_ERP_Details.ASSET_ITM_FLAG, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.LOT_FLAG.ToString, GetPO_Recv_ERP_Details.LOT_FLAG, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.SRL_FLAG.ToString, GetPO_Recv_ERP_Details.SRL_FLAG, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.PURCHASE_REQ_NO.ToString, GetPO_Recv_ERP_Details.PURCHASE_REQ_NO, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.CUST_ITEM_NO.ToString, GetPO_Recv_ERP_Details.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID.ToString, GetPO_Recv_ERP_Details.RECEIVING_ROUTING_ID, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.ITEM_TYPE.ToString, GetPO_Recv_ERP_Details.ITEM_TYPE, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.BIN_TRACK_FL.ToString, GetPO_Recv_ERP_Details.BIN_TRACK_FL, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.BILL_OF_LADING.ToString, GetPO_Recv_ERP_Details.BILL_OF_LADING, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.PRICE.ToString, GetPO_Recv_ERP_Details.PRICE, "System.String", "N", "Y", "N"}, _
   {GetPO_Recv_ERP_Details.PACKAGING_STRING.ToString, GetPO_Recv_ERP_Details.PACKAGING_STRING, "System.String", "N", "Y", "N"}}


    Public Shared GetPO_Recv_ERP_AltUOM_Defns(,) As String = _
    {{GetPO_Recv_ERP_AltUOM.LN_NBR.ToString, GetPO_Recv_ERP_AltUOM.LN_NBR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_AltUOM.UOM.ToString, GetPO_Recv_ERP_AltUOM.UOM, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_AltUOM.CONV_FACT.ToString, GetPO_Recv_ERP_AltUOM.CONV_FACT, "System.String", "N", "Y", "N"}}

    Public Shared GetPO_Recv_ERP_LOC_Defns(,) As String = _
    {{GetPO_Recv_ERP_LOC.LN_NBR.ToString, GetPO_Recv_ERP_LOC.LN_NBR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.SETID.ToString, GetPO_Recv_ERP_LOC.SETID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.LOCATION.ToString, GetPO_Recv_ERP_LOC.LOCATION, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.DESCR.ToString, GetPO_Recv_ERP_LOC.DESCR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.DEPTID.ToString, GetPO_Recv_ERP_LOC.DEPTID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.INVITM.ToString, GetPO_Recv_ERP_LOC.INVITM, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.REQUESTOR_ID.ToString, GetPO_Recv_ERP_LOC.REQUESTOR_ID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.EMAILID.ToString, GetPO_Recv_ERP_LOC.EMAILID, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.DELV_TO_NAME.ToString, GetPO_Recv_ERP_LOC.DELV_TO_NAME, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.ADDRESS1.ToString, GetPO_Recv_ERP_LOC.ADDRESS1, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.SCHED_NBR.ToString, GetPO_Recv_ERP_LOC.SCHED_NBR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.ADDRESS2.ToString, GetPO_Recv_ERP_LOC.ADDRESS2, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.ADDRESS3.ToString, GetPO_Recv_ERP_LOC.ADDRESS3, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.PHONE.ToString, GetPO_Recv_ERP_LOC.PHONE, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.STORAGE_LOCATION.ToString, GetPO_Recv_ERP_LOC.STORAGE_LOCATION, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.REQ_NUM.ToString, GetPO_Recv_ERP_LOC.REQ_NUM, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.FLOOR.ToString, GetPO_Recv_ERP_LOC.FLOOR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.SECTOR.ToString, GetPO_Recv_ERP_LOC.SECTOR, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.BUILDING.ToString, GetPO_Recv_ERP_LOC.BUILDING, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.REQUISITION_NAME.ToString, GetPO_Recv_ERP_LOC.REQUISITION_NAME, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.BUYER_NAME.ToString, GetPO_Recv_ERP_LOC.BUYER_NAME, "System.String", "N", "Y", "N"}, _
     {GetPO_Recv_ERP_LOC.REQ_ID.ToString, GetPO_Recv_ERP_LOC.REQ_ID, "System.String", "N", "Y", "N"}}


#End Region

#Region "DeletePO"

    Public Shared DeletePO_Recv_Header_Defns(,) As String = _
           {{DeletePO_Recv_Header_Enum.TRANS_ID.ToString, DeletePO_Recv_Header_Enum.TRANS_ID, "System.String", "N", "Y", "N"}}

#End Region

#Region "SendNonPOs"
    Public Shared SendNonPO_Recv_Header_Defns(,) As String = _
           {{SendNonPOs_Hdr.TRANSACTION_ID.ToString, SendNonPOs_Hdr.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.TRACKING_NBR.ToString, SendNonPOs_Hdr.TRACKING_NBR, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.LOCATION.ToString, SendNonPOs_Hdr.LOCATION, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.CARRIER_ID.ToString, SendNonPOs_Hdr.CARRIER_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.DELIVER_TO.ToString, SendNonPOs_Hdr.DELIVER_TO, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.STATUS.ToString, SendNonPOs_Hdr.STATUS, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.USER_ID.ToString, SendNonPOs_Hdr.USER_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.DESCR.ToString, SendNonPOs_Hdr.DESCR, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.VENDOR_NAME1.ToString, SendNonPOs_Hdr.VENDOR_NAME1, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.DEPT_ID.ToString, SendNonPOs_Hdr.DEPT_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.PO_ID.ToString, SendNonPOs_Hdr.PO_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.LINE_NBR.ToString, SendNonPOs_Hdr.LINE_NBR, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.SHIPTO_ID.ToString, SendNonPOs_Hdr.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.NON_PO_ITEM.ToString, SendNonPOs_Hdr.NON_PO_ITEM, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.TYPE_OF_PACKAGE.ToString, SendNonPOs_Hdr.TYPE_OF_PACKAGE, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.END_DT_TIME.ToString, SendNonPOs_Hdr.END_DT_TIME, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.START_DT_TIME.ToString, SendNonPOs_Hdr.START_DT_TIME, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.COMMENTS.ToString, SendNonPOs_Hdr.COMMENTS, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.LOCDESCR.ToString, SendNonPOs_Hdr.LOCDESCR, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.PO_DT.ToString, SendNonPOs_Hdr.PO_DT, "System.String", "N", "Y", "N"}, _
            {SendNonPOs_Hdr.VENDOR_ID.ToString, SendNonPOs_Hdr.VENDOR_ID, "System.String", "N", "Y", "N"}, _
           {SendNonPOs_Hdr.NOTES_COMMENTS.ToString, SendNonPOs_Hdr.NOTES_COMMENTS, "System.String", "N", "Y", "N"}, _
          {SendNonPOs_Hdr.NO_OF_PACKAGES.ToString, SendNonPOs_Hdr.NO_OF_PACKAGES, "System.String", "N", "Y", "N"}}
			
			Public Shared Send_Recv_Output_Defns(,) As String = _
          {{Send_Recv_Output_Enum.TRANSACTION_ID.ToString, Send_Recv_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}
#End Region
#Region "Transaction"
    Public Shared Receive_Transactions(,) As String = _
            {{Receive_Transaction_Enum.TRANSACTIONID.ToString, Receive_Transaction_Enum.TRANSACTIONID, "System.Int64", "N", "Y", "N"}}

#End Region
#End Region

#Region "IUT"

#Region "SearchIUT"

    Public Shared SearchIUT_Header_Defns(,) As String = _
           {{SearchIUT_Header_Enum.BUSINESS_UNIT.ToString, SearchIUT_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {SearchIUT_Header_Enum.ITEM_ID.ToString, SearchIUT_Header_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {SearchIUT_Header_Enum.FROM_DATE.ToString, SearchIUT_Header_Enum.FROM_DATE, "System.String", "N", "Y", "N"}, _
            {SearchIUT_Header_Enum.TO_DATE.ToString, SearchIUT_Header_Enum.TO_DATE, "System.String", "N", "Y", "N"}, _
            {SearchIUT_Header_Enum.PRODUCT.ToString, SearchIUT_Header_Enum.PRODUCT, "System.Int32", "N", "Y", "N"}}

    Public Shared SearchIUT_Recv_PreReq_Defns(,) As String = _
     {{SearchIUT_PreReqData_Enum.SCHEMA_NAME.ToString, SearchIUT_PreReqData_Enum.SCHEMA_NAME, "System.String", "N", "Y", "N"}}

#End Region

#Region "IUT Get"
    Public Shared GetIUT_Header_Defns(,) As String = _
        {{GetIUT_Header_Enum.CANCEL_TRANSID.ToString, GetIUT_Header_Enum.CANCEL_TRANSID, "System.String", "N", "Y", "N"}, _
         {GetIUT_Header_Enum.BUSINESS_UNIT.ToString, GetIUT_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {GetIUT_Header_Enum.IUT_ORDERNO.ToString, GetIUT_Header_Enum.IUT_ORDERNO, "System.String", "N", "Y", "N"}, _
         {GetIUT_Header_Enum.PRODUCT.ToString, GetIUT_Header_Enum.PRODUCT, "System.Int32", "N", "Y", "N"}}

    Public Shared GetIUT_Params_Defns(,) As String = _
        {{GetIUT_PreReqData_Enum.MULTI_IUT_DOWNLOAD.ToString, GetIUT_PreReqData_Enum.MULTI_IUT_DOWNLOAD, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, GetIUT_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, GetIUT_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.REMOTE_DB_TYPE.ToString, GetIUT_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.SCHEMA_NAME.ToString, GetIUT_PreReqData_Enum.SCHEMA_NAME, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, GetIUT_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.ITEM_DESCR.ToString, GetIUT_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.ITEM_PRICE.ToString, GetIUT_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
        {GetIUT_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS.ToString, GetIUT_PreReqData_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}}

    Public Shared GetIUT_ListView_Params_Defns(,) As String = _
           {{GetIUT_ListView_Enum.PACKAGING_STRING.ToString, GetIUT_ListView_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}

    Public Shared GetIUT_ERP_Header_Defns(,) As String = _
        {{GetIUT_ERP_Header_Enum.DESTIN_BU.ToString, GetIUT_ERP_Header_Enum.DESTIN_BU, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.ORIG_BU.ToString, GetIUT_ERP_Header_Enum.ORIG_BU, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.INTERUNIT_ID.ToString, GetIUT_ERP_Header_Enum.INTERUNIT_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.INTERUNIT_LINE.ToString, GetIUT_ERP_Header_Enum.INTERUNIT_LINE, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.INV_ITEM_ID.ToString, GetIUT_ERP_Header_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.STORAGE_AREA.ToString, GetIUT_ERP_Header_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.STOR_LEVEL_1.ToString, GetIUT_ERP_Header_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.STOR_LEVEL_2.ToString, GetIUT_ERP_Header_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.STOR_LEVEL_3.ToString, GetIUT_ERP_Header_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.STOR_LEVEL_4.ToString, GetIUT_ERP_Header_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.QTY_SHIPPED.ToString, GetIUT_ERP_Header_Enum.QTY_SHIPPED, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.LAST_QTY_SHIP.ToString, GetIUT_ERP_Header_Enum.LAST_QTY_SHIP, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DEST_SA.ToString, GetIUT_ERP_Header_Enum.DEST_SA, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DEST_SL1.ToString, GetIUT_ERP_Header_Enum.DEST_SL1, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DEST_SL2.ToString, GetIUT_ERP_Header_Enum.DEST_SL2, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DEST_SL3.ToString, GetIUT_ERP_Header_Enum.DEST_SL3, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DEST_SL4.ToString, GetIUT_ERP_Header_Enum.DEST_SL4, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.UNIT_MEASURE_SHIP.ToString, GetIUT_ERP_Header_Enum.UNIT_MEASURE_SHIP, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.SHIP_DTTM.ToString, GetIUT_ERP_Header_Enum.SHIP_DTTM, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.TRANSACTION_ID.ToString, GetIUT_ERP_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.DESCRIPTION.ToString, GetIUT_ERP_Header_Enum.DESCRIPTION, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.UPC_ID.ToString, GetIUT_ERP_Header_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.VENDOR_ITEM_ID.ToString, GetIUT_ERP_Header_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.MFG_ITEM_ID.ToString, GetIUT_ERP_Header_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.GTIN.ToString, GetIUT_ERP_Header_Enum.GTIN, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.SERIAL_FLAG.ToString, GetIUT_ERP_Header_Enum.SERIAL_FLAG, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.LOT_FLAG.ToString, GetIUT_ERP_Header_Enum.LOT_FLAG, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.QTY_RECEIVED.ToString, GetIUT_ERP_Header_Enum.QTY_RECEIVED, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.INV_LOT_ID.ToString, GetIUT_ERP_Header_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.SERIAL_ID.ToString, GetIUT_ERP_Header_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.PRICE.ToString, GetIUT_ERP_Header_Enum.PRICE, "System.String", "N", "Y", "N"}, _
         {GetIUT_ERP_Header_Enum.PACKAGING_STRING.ToString, GetIUT_ERP_Header_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}

#End Region

#Region "Delete IUT"

    Public Shared Delete_IUT_Hdr_Defns(,) As String = _
            {{Delete_IUT_Header_Enum.PRODUCT.ToString, Delete_IUT_Header_Enum.PRODUCT, "System.Int32", "N", "Y", "N"}}

#End Region

#Region "Send IUT"
    Public Shared SendIUT_Header_Defns(,) As String = _
               {{SendIUT_Header_Enum.PRODUCT_ID.ToString, SendIUT_Header_Enum.PRODUCT_ID, "System.String", "N", "Y", "N"}}

    Public Shared SendIUT_Transaction_Defns(,) As String = _
               {{SendIUT_TRANSACTIONS_Enum.TRANSACTION_ID.ToString, SendIUT_TRANSACTIONS_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared SendIUT_Details_Defns(,) As String = _
           {{SendIUT_DETAILS_Enum.TRANSACTION_ID.ToString, SendIUT_DETAILS_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.DESTIN_BUSINESS_UNIT.ToString, SendIUT_DETAILS_Enum.DESTIN_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.ORIG_BUSINESS_UNIT.ToString, SendIUT_DETAILS_Enum.ORIG_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.INTERUNIT_ID.ToString, SendIUT_DETAILS_Enum.INTERUNIT_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.START_DT_TIME.ToString, SendIUT_DETAILS_Enum.START_DT_TIME, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.END_DT_TIME.ToString, SendIUT_DETAILS_Enum.END_DT_TIME, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.USER_ID.ToString, SendIUT_DETAILS_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.LINE_NO.ToString, SendIUT_DETAILS_Enum.LINE_NO, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.ITEM_ID.ToString, SendIUT_DETAILS_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.DESCRIPTION.ToString, SendIUT_DETAILS_Enum.DESCRIPTION, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.QTY.ToString, SendIUT_DETAILS_Enum.QTY, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.QTY_SHIPPED.ToString, SendIUT_DETAILS_Enum.QTY_SHIPPED, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.UOM.ToString, SendIUT_DETAILS_Enum.UOM, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.CARRIER_ID.ToString, SendIUT_DETAILS_Enum.CARRIER_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.BILL_OF_LADING.ToString, SendIUT_DETAILS_Enum.BILL_OF_LADING, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.NO_OF_PKGS.ToString, SendIUT_DETAILS_Enum.NO_OF_PKGS, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.INV_LOT_ID.ToString, SendIUT_DETAILS_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.SERIAL_ID.ToString, SendIUT_DETAILS_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
            {SendIUT_DETAILS_Enum.INTERUNIT_LINE.ToString, SendIUT_DETAILS_Enum.INTERUNIT_LINE, "System.String", "N", "Y", "N"}}



    Public Shared SendIUT_PreReq_Defns(,) As String = _
           {{SendIUT_PreReqData_Enum.PS_USER.ToString, SendIUT_PreReqData_Enum.PS_USER, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT.ToString, SendIUT_PreReqData_Enum.ITEM_RECV_LOW_PCT, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT.ToString, SendIUT_PreReqData_Enum.ITEM_RECV_HIGH_PCT, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.REMOTE_SCHEMA.ToString, SendIUT_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.REMOTE_DB_TYPE.ToString, SendIUT_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.TRANSACTION_STATUS_REMOTESUCCESS.ToString, SendIUT_PreReqData_Enum.TRANSACTION_STATUS_REMOTESUCCESS, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.ENTERPRISE_SYSTEM_NAME.ToString, SendIUT_PreReqData_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
            {SendIUT_PreReqData_Enum.ENTERPRISE_VERSION.ToString, SendIUT_PreReqData_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}}

#End Region


#End Region

#Region "StockIssue"

#Region "SendDetails"

    Public Shared Send_StockIssue_Header_Defns(,) As String = _
     {{Send_StockIssue_Header_Enum.BUSINESS_UNIT.ToString, Send_StockIssue_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.ORDER_NO.ToString, Send_StockIssue_Header_Enum.ORDER_NO, "System.Int64", "N", "N", "N"}, _
     {Send_StockIssue_Header_Enum.LOCATION.ToString, Send_StockIssue_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.STATUS.ToString, Send_StockIssue_Header_Enum.STATUS, "System.Int32", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.DEPARTMENT_ID.ToString, Send_StockIssue_Header_Enum.DEPARTMENT_ID, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.PATIENT_ID.ToString, Send_StockIssue_Header_Enum.PATIENT_ID, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.ISSUETO_USER_ID.ToString, Send_StockIssue_Header_Enum.ISSUETO_USER_ID, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.CURRENT_USER_ID.ToString, Send_StockIssue_Header_Enum.CURRENT_USER_ID, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.SUSER_ID.ToString, Send_StockIssue_Header_Enum.SUSER_ID, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.START_DATE.ToString, Send_StockIssue_Header_Enum.START_DATE, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.END_DATE.ToString, Send_StockIssue_Header_Enum.END_DATE, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.DISTRIB_TYPE.ToString, Send_StockIssue_Header_Enum.DISTRIB_TYPE, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.SIGNATURE_ID.ToString, Send_StockIssue_Header_Enum.SIGNATURE_ID, "System.Int64", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.SIGNATURE.ToString, Send_StockIssue_Header_Enum.SIGNATURE, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.TRANSACTION_ID.ToString, Send_StockIssue_Header_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.COUNT_FLAG.ToString, Send_StockIssue_Header_Enum.COUNT_FLAG, "System.String", "N", "Y", "N"}, _
     {Send_StockIssue_Header_Enum.COMPANY.ToString, Send_StockIssue_Header_Enum.COMPANY, "System.String", "N", "Y", "N"}}


    Public Shared Send_StockIssue_BusinessRules_Defns(,) As String = _
        {{Send_StockIssue_BusinessRules_Enum.CREATE_MSR_FOR_ISSUE.ToString, Send_StockIssue_BusinessRules_Enum.CREATE_MSR_FOR_ISSUE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.PSCILOGINURL.ToString, Send_StockIssue_BusinessRules_Enum.PSCILOGINURL, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.STOR_LOC_REQD.ToString, Send_StockIssue_BusinessRules_Enum.STOR_LOC_REQD, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.DEFAULT_LOC_AS_DEPT.ToString, Send_StockIssue_BusinessRules_Enum.DEFAULT_LOC_AS_DEPT, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ONE_ITEM_IN_MSR.ToString, Send_StockIssue_BusinessRules_Enum.ONE_ITEM_IN_MSR, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.SIGNATURE_ID.ToString, Send_StockIssue_BusinessRules_Enum.SIGNATURE_ID, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.PRICE.ToString, Send_StockIssue_BusinessRules_Enum.PRICE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.OPRID_MODIFIED_BY.ToString, Send_StockIssue_BusinessRules_Enum.OPRID_MODIFIED_BY, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.EXP_PUTAWAY_CI_NAME.ToString, Send_StockIssue_BusinessRules_Enum.EXP_PUTAWAY_CI_NAME, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.RMA_COMPONENT_INTERFACE.ToString, Send_StockIssue_BusinessRules_Enum.RMA_COMPONENT_INTERFACE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.RMA_CI_NAME.ToString, Send_StockIssue_BusinessRules_Enum.RMA_CI_NAME, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.COMPONENT_NAME.ToString, Send_StockIssue_BusinessRules_Enum.COMPONENT_NAME, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_StockIssue_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ENTERPRISE_VERSION.ToString, Send_StockIssue_BusinessRules_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.DOC_ID_GENERATION.ToString, Send_StockIssue_BusinessRules_Enum.DOC_ID_GENERATION, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.DEFAULT_COMPANY.ToString, Send_StockIssue_BusinessRules_Enum.DEFAULT_COMPANY, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.IGNORE_DOC_REL_ERR.ToString, Send_StockIssue_BusinessRules_Enum.IGNORE_DOC_REL_ERR, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.REMOTE_DB_TYPE.ToString, Send_StockIssue_BusinessRules_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.REMOTE_SCHEMA.ToString, Send_StockIssue_BusinessRules_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.REASON_CD.ToString, Send_StockIssue_BusinessRules_Enum.REASON_CD, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.INV_DATA_SYNC.ToString, Send_StockIssue_BusinessRules_Enum.INV_DATA_SYNC, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.UNIT_MEASURE_PICK.ToString, Send_StockIssue_BusinessRules_Enum.UNIT_MEASURE_PICK, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.TRANSACTION_STATUS.ToString, Send_StockIssue_BusinessRules_Enum.TRANSACTION_STATUS, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.CREATE_RMA_RECEIPT.ToString, Send_StockIssue_BusinessRules_Enum.CREATE_RMA_RECEIPT, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.RMA_RECEIPT_CI_NAME.ToString, Send_StockIssue_BusinessRules_Enum.RMA_RECEIPT_CI_NAME, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ITEM_PRICE.ToString, Send_StockIssue_BusinessRules_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ITEM_DESCR.ToString, Send_StockIssue_BusinessRules_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.DEFAULT_MFG_ITEM_ID.ToString, Send_StockIssue_BusinessRules_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ITEM_NDC_TYPE_CODE.ToString, Send_StockIssue_BusinessRules_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ITEM_UPN_TYPE_CODE.ToString, Send_StockIssue_BusinessRules_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.ALLOW_NEGATIVE_INVENTORY.ToString, Send_StockIssue_BusinessRules_Enum.ALLOW_NEGATIVE_INVENTORY, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.SKIP_ISSUE_ITEMS_IN_PEOPLESOFT.ToString, Send_StockIssue_BusinessRules_Enum.SKIP_ISSUE_ITEMS_IN_PEOPLESOFT, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_BusinessRules_Enum.LOT_SERIAL_ENABLED.ToString, Send_StockIssue_BusinessRules_Enum.LOT_SERIAL_ENABLED, "System.String", "N", "Y", "N"}}

    Public Shared Send_StockIssue_Details_Defns(,) As String = _
            {{Send_StockIssue_Details_Enum.ITEM_ID.ToString, Send_StockIssue_Details_Enum.ITEM_ID, "System.String", "N", "N", "N"}, _
            {Send_StockIssue_Details_Enum.STORAGE_LOCATION.ToString, Send_StockIssue_Details_Enum.STORAGE_LOCATION, "System.String", "N", "N", "N"}, _
            {Send_StockIssue_Details_Enum.STORAGE_AREA.ToString, Send_StockIssue_Details_Enum.STORAGE_AREA, "System.String", "N", "N", "N"}, _
            {Send_StockIssue_Details_Enum.STOR_LEVEL_1.ToString, Send_StockIssue_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.STOR_LEVEL_2.ToString, Send_StockIssue_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.STOR_LEVEL_3.ToString, Send_StockIssue_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.STOR_LEVEL_4.ToString, Send_StockIssue_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.UOM.ToString, Send_StockIssue_Details_Enum.UOM, "System.String", "N", "N", "N"}, _
            {Send_StockIssue_Details_Enum.QTY.ToString, Send_StockIssue_Details_Enum.QTY, "System.Double", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ACTUAL_ISSUED_UOM.ToString, Send_StockIssue_Details_Enum.ACTUAL_ISSUED_UOM, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ACTUAL_ISSUED_QTY.ToString, Send_StockIssue_Details_Enum.ACTUAL_ISSUED_QTY, "System.Double", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.PRICE.ToString, Send_StockIssue_Details_Enum.PRICE, "System.Double", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.SERIAL_ID.ToString, Send_StockIssue_Details_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.LOT_ID.ToString, Send_StockIssue_Details_Enum.LOT_ID, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.CONTAINER_ID.ToString, Send_StockIssue_Details_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ADJUST_TYPE.ToString, Send_StockIssue_Details_Enum.ADJUST_TYPE, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.PROCESS_TYPE.ToString, Send_StockIssue_Details_Enum.PROCESS_TYPE, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ADJUST_QTY.ToString, Send_StockIssue_Details_Enum.ADJUST_QTY, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ACCOUNT.ToString, Send_StockIssue_Details_Enum.ACCOUNT, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.DESTIN_GL_BU.ToString, Send_StockIssue_Details_Enum.DESTIN_GL_BU, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.EXPIRY_DATE.ToString, Send_StockIssue_Details_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.STD_UOM.ToString, Send_StockIssue_Details_Enum.STD_UOM, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.ITEM_DESC.ToString, Send_StockIssue_Details_Enum.ITEM_DESC, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.COMPARTMENT.ToString, Send_StockIssue_Details_Enum.COMPARTMENT, "System.String", "N", "Y", "N"}, _
            {Send_StockIssue_Details_Enum.UNIT_COST.ToString, Send_StockIssue_Details_Enum.UNIT_COST, "System.String", "N", "Y", "N"}}
			

    Public Shared Send_StockIssue_Sub_Details_Defns(,) As String = _
               {{Send_StockIssue_Sub_Details_Enum.ITEM_ID.ToString, Send_StockIssue_Sub_Details_Enum.ITEM_ID, "System.String", "N", "N", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STORAGE_LOCATION.ToString, Send_StockIssue_Sub_Details_Enum.STORAGE_LOCATION, "System.String", "N", "N", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STORAGE_AREA.ToString, Send_StockIssue_Sub_Details_Enum.STORAGE_AREA, "System.String", "N", "N", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_1.ToString, Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_2.ToString, Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_3.ToString, Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_4.ToString, Send_StockIssue_Sub_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.UOM.ToString, Send_StockIssue_Sub_Details_Enum.UOM, "System.String", "N", "N", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.QTY.ToString, Send_StockIssue_Sub_Details_Enum.QTY, "System.Double", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ACTUAL_ISSUED_UOM.ToString, Send_StockIssue_Sub_Details_Enum.ACTUAL_ISSUED_UOM, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ACTUAL_ISSUED_QTY.ToString, Send_StockIssue_Sub_Details_Enum.ACTUAL_ISSUED_QTY, "System.Double", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.PRICE.ToString, Send_StockIssue_Sub_Details_Enum.PRICE, "System.Double", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.SERIAL_ID.ToString, Send_StockIssue_Sub_Details_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.LOT_ID.ToString, Send_StockIssue_Sub_Details_Enum.LOT_ID, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.CONTAINER_ID.ToString, Send_StockIssue_Sub_Details_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ADJUST_TYPE.ToString, Send_StockIssue_Sub_Details_Enum.ADJUST_TYPE, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.PROCESS_TYPE.ToString, Send_StockIssue_Sub_Details_Enum.PROCESS_TYPE, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ADJUST_QTY.ToString, Send_StockIssue_Sub_Details_Enum.ADJUST_QTY, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ACCOUNT.ToString, Send_StockIssue_Sub_Details_Enum.ACCOUNT, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.DESTIN_GL_BU.ToString, Send_StockIssue_Sub_Details_Enum.DESTIN_GL_BU, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.EXPIRY_DATE.ToString, Send_StockIssue_Sub_Details_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.STD_UOM.ToString, Send_StockIssue_Sub_Details_Enum.STD_UOM, "System.String", "N", "Y", "N"}, _
               {Send_StockIssue_Sub_Details_Enum.ITEM_DESC.ToString, Send_StockIssue_Sub_Details_Enum.ITEM_DESC, "System.String", "N", "Y", "N"}}

    Public Shared Send_StockIssue_Output_Defns(,) As String = _
        {{Send_StockIssue_Output_Enum.STATUS_CODE.ToString, Send_StockIssue_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
		{Send_StockIssue_Output_Enum.STATUS_DESCR.ToString, Send_StockIssue_Output_Enum.STATUS_DESCR, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_Output_Enum.DOCUMENT_ID.ToString, Send_StockIssue_Output_Enum.DOCUMENT_ID, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_Output_Enum.TRANSACTION_ID.ToString, Send_StockIssue_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Send_StockIssue_Output_Enum.ORDER_NO.ToString, Send_StockIssue_Output_Enum.ORDER_NO, "System.String", "N", "Y", "N"}}


    Public Shared Get_StockIssue_Details_Defns(,) As String = _
       {{Get_StockIssue_Details_Enum.BUSINESS_UNIT.ToString, Get_StockIssue_Details_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.BUNIT_DESCR.ToString, Get_StockIssue_Details_Enum.BUNIT_DESCR, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ORDER_BY.ToString, Get_StockIssue_Details_Enum.ORDER_BY, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ORDER_BY_ORDER.ToString, Get_StockIssue_Details_Enum.ORDER_BY_ORDER, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.BUNIT.ToString, Get_StockIssue_Details_Enum.BUNIT, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.MFG_ITEM_REQD.ToString, Get_StockIssue_Details_Enum.MFG_ITEM_REQD, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.VENDOR_ITEM_REQD.ToString, Get_StockIssue_Details_Enum.VENDOR_ITEM_REQD, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.PRICE_REQD.ToString, Get_StockIssue_Details_Enum.PRICE_REQD, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ITEM_DESCR.ToString, Get_StockIssue_Details_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_StockIssue_Details_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.CUSTOM_SQL_DESTLOCATION.ToString, Get_StockIssue_Details_Enum.CUSTOM_SQL_DESTLOCATION, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ITEM_UPN_TYPE_CODE.ToString, Get_StockIssue_Details_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ITEM_NDC_TYPE_CODE.ToString, Get_StockIssue_Details_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.BIN_TO_BIN_ACCESS.ToString, Get_StockIssue_Details_Enum.BIN_TO_BIN_ACCESS, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.APP_ID.ToString, Get_StockIssue_Details_Enum.APP_ID, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ALLOC_DEST_LOC_REQUIRED.ToString, Get_StockIssue_Details_Enum.ALLOC_DEST_LOC_REQUIRED, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ALLOW_NEGATIVE_INVENTORY.ToString, Get_StockIssue_Details_Enum.ALLOW_NEGATIVE_INVENTORY, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.ITEM_PRICE_TYPE.ToString, Get_StockIssue_Details_Enum.ITEM_PRICE_TYPE, "System.String", "N", "Y", "N"}, _
       {Get_StockIssue_Details_Enum.USER_ID.ToString, Get_StockIssue_Details_Enum.USER_ID, "System.String", "N", "Y", "N"}}


    Public Shared Get_StockIssue_PreReqData_Defns(,) As String = _
     {{StockIssue_PreReq_Enum.CUSTOM_SQL_DESTLOCATION.ToString, StockIssue_PreReq_Enum.CUSTOM_SQL_DESTLOCATION, "System.String", "N", "Y", "N"}}

   
#End Region

#End Region

#Region "PointOfUse"
    Public Shared Get_Cart_Details_Defns(,) As String = _
          {{Get_Cart_Details.BUSINESS_UNIT.ToString, Get_Cart_Details.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Details.CART_ID.ToString, Get_Cart_Details.CART_ID, "System.String", "N", "Y", "N"}, _
           {Get_Cart_Details.LOCATION_TYPE.ToString, Get_Cart_Details.LOCATION_TYPE, "System.String", "N", "Y", "N"}}
     Public Shared Get_Ptwy_Orders_Defns(,) As String = _
  {{Get_Ptwy_Orders.ORDER_ID.ToString, Get_Ptwy_Orders.ORDER_ID, "System.String", "N", "Y", "N"}, _
     {Get_Ptwy_Orders.LOCATION_TYPE.ToString, Get_Ptwy_Orders.LOCATION_TYPE, "System.String", "N", "Y", "N"}}

    Public Shared Get_Recall_ParamValue(,) As String = _
  {{Get_Recall_ParamValue_Enum.RECALL_MGMT_IMPLEMENTED.ToString, Get_Recall_ParamValue_Enum.RECALL_MGMT_IMPLEMENTED, "System.Boolean", "N", "Y", "N"}}

    Public Shared Send_POU_Issue_Header_Defns(,) As String = _
     {{Send_POU_Issue_Header_Enum.BUSINESS_UNIT.ToString, Send_POU_Issue_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.ORDER_NO.ToString, Send_POU_Issue_Header_Enum.ORDER_NO, "System.Int64", "N", "N", "N"}, _
     {Send_POU_Issue_Header_Enum.LOCATION.ToString, Send_POU_Issue_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.STATUS.ToString, Send_POU_Issue_Header_Enum.STATUS, "System.Int32", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.DEPARTMENT_ID.ToString, Send_POU_Issue_Header_Enum.DEPARTMENT_ID, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.PATIENT_ID.ToString, Send_POU_Issue_Header_Enum.PATIENT_ID, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.ISSUETO_USER_ID.ToString, Send_POU_Issue_Header_Enum.ISSUETO_USER_ID, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.CURRENT_USER_ID.ToString, Send_POU_Issue_Header_Enum.CURRENT_USER_ID, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.SUSER_ID.ToString, Send_POU_Issue_Header_Enum.SUSER_ID, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.START_DATE.ToString, Send_POU_Issue_Header_Enum.START_DATE, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.END_DATE.ToString, Send_POU_Issue_Header_Enum.END_DATE, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.DISTRIB_TYPE.ToString, Send_POU_Issue_Header_Enum.DISTRIB_TYPE, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.SIGNATURE_ID.ToString, Send_POU_Issue_Header_Enum.SIGNATURE_ID, "System.Int64", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.SIGNATURE.ToString, Send_POU_Issue_Header_Enum.SIGNATURE, "System.String", "N", "Y", "N"}, _
     {Send_POU_Issue_Header_Enum.TRANSACTION_ID.ToString, Send_POU_Issue_Header_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}}

    Public Shared Send_POU_Issue_Details_Defns(,) As String = _
           {{Send_POU_Issue_Details_Enum.ITEM_ID.ToString, Send_POU_Issue_Details_Enum.ITEM_ID, "System.String", "N", "N", "N"}, _
           {Send_POU_Issue_Details_Enum.STORAGE_LOCATION.ToString, Send_POU_Issue_Details_Enum.STORAGE_LOCATION, "System.String", "N", "N", "N"}, _
           {Send_POU_Issue_Details_Enum.STORAGE_AREA.ToString, Send_POU_Issue_Details_Enum.STORAGE_AREA, "System.String", "N", "N", "N"}, _
           {Send_POU_Issue_Details_Enum.STOR_LEVEL_1.ToString, Send_POU_Issue_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.STOR_LEVEL_2.ToString, Send_POU_Issue_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.STOR_LEVEL_3.ToString, Send_POU_Issue_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.STOR_LEVEL_4.ToString, Send_POU_Issue_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.UOM.ToString, Send_POU_Issue_Details_Enum.UOM, "System.String", "N", "N", "N"}, _
           {Send_POU_Issue_Details_Enum.QTY.ToString, Send_POU_Issue_Details_Enum.QTY, "System.Double", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.ACTUAL_ISSUED_UOM.ToString, Send_POU_Issue_Details_Enum.ACTUAL_ISSUED_UOM, "System.String", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.ACTUAL_ISSUED_QTY.ToString, Send_POU_Issue_Details_Enum.ACTUAL_ISSUED_QTY, "System.Double", "N", "Y", "N"}, _
           {Send_POU_Issue_Details_Enum.PRICE.ToString, Send_POU_Issue_Details_Enum.PRICE, "System.Double", "N", "Y", "N"}}

    Public Shared Send_POU_Issue_PreReq_Defns(,) As String = _
        {{Send_POU_Issue_PreReq_Enum.CREATE_MSR_FOR_ISSUE.ToString, Send_POU_Issue_PreReq_Enum.CREATE_MSR_FOR_ISSUE, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.PSCILOGINURL.ToString, Send_POU_Issue_PreReq_Enum.PSCILOGINURL, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.STOR_LOC_REQD.ToString, Send_POU_Issue_PreReq_Enum.STOR_LOC_REQD, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.DEFAULT_LOC_AS_DEPT.ToString, Send_POU_Issue_PreReq_Enum.DEFAULT_LOC_AS_DEPT, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.ONE_ITEM_IN_MSR.ToString, Send_POU_Issue_PreReq_Enum.ONE_ITEM_IN_MSR, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.SIGNATURE_ID.ToString, Send_POU_Issue_PreReq_Enum.SIGNATURE_ID, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.PRICE.ToString, Send_POU_Issue_PreReq_Enum.PRICE, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.OPRID_MODIFIED_BY.ToString, Send_POU_Issue_PreReq_Enum.OPRID_MODIFIED_BY, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.EXP_PUTAWAY_CI_NAME.ToString, Send_POU_Issue_PreReq_Enum.EXP_PUTAWAY_CI_NAME, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_PreReq_Enum.COMPONENT_NAME.ToString, Send_POU_Issue_PreReq_Enum.COMPONENT_NAME, "System.String", "N", "Y", "N"}}

    Public Shared Send_POU_Issue_Output_Defns(,) As String = _
        {{Send_POU_Issue_Output_Enum.STATUS_CODE.ToString, Send_POU_Issue_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_Output_Enum.DOCUMENT_ID.ToString, Send_POU_Issue_Output_Enum.DOCUMENT_ID, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_Output_Enum.TRANSACTION_ID.ToString, Send_POU_Issue_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Send_POU_Issue_Output_Enum.ORDER_NO.ToString, Send_POU_Issue_Output_Enum.ORDER_NO, "System.String", "N", "Y", "N"}}

    Public Shared POU_Billing_Process_PreReq_Defns(,) As String = _
        {{Billing_Process_PreReq_Enum.CART_DEFN_CHANGE.ToString, Billing_Process_PreReq_Enum.CART_DEFN_CHANGE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.DEL_ITEMS.ToString, Billing_Process_PreReq_Enum.DEL_ITEMS, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.REMOTE_SCHEMA.ToString, Billing_Process_PreReq_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.CART_SEQUENCE_ID.ToString, Billing_Process_PreReq_Enum.CART_SEQUENCE_ID, "System.Int64", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ITEM_COUNT_LOW_PCT.ToString, Billing_Process_PreReq_Enum.ITEM_COUNT_LOW_PCT, "System.Double", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ITEM_COUNT_HIGH_PCT.ToString, Billing_Process_PreReq_Enum.ITEM_COUNT_HIGH_PCT, "System.Double", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.PUTAWAY_CART_ITEMS.ToString, Billing_Process_PreReq_Enum.PUTAWAY_CART_ITEMS, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.REQ_ZIP_RELEASE.ToString, Billing_Process_PreReq_Enum.REQ_ZIP_RELEASE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.STOP_REL_NON_STOCK_REQ.ToString, Billing_Process_PreReq_Enum.STOP_REL_NON_STOCK_REQ, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.QTY_OPTION.ToString, Billing_Process_PreReq_Enum.QTY_OPTION, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.REQUESTOR_ID.ToString, Billing_Process_PreReq_Enum.REQUESTOR_ID, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.IGNORE_REQ_REL_ERR.ToString, Billing_Process_PreReq_Enum.IGNORE_REQ_REL_ERR, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.REMOTE_DB_TYPE.ToString, Billing_Process_PreReq_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.TRANSACTION_STATUS.ToString, Billing_Process_PreReq_Enum.TRANSACTION_STATUS, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.STATUS_CODE.ToString, Billing_Process_PreReq_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.SUPER_USER.ToString, Billing_Process_PreReq_Enum.SUPER_USER, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.CARTS_MNGD_ATPAR.ToString, Billing_Process_PreReq_Enum.CARTS_MNGD_ATPAR, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.QTY_ROUND_TYPE.ToString, Billing_Process_PreReq_Enum.QTY_ROUND_TYPE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.CALCULATE_REQ_QTY.ToString, Billing_Process_PreReq_Enum.CALCULATE_REQ_QTY, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.POU_CART.ToString, Billing_Process_PreReq_Enum.POU_CART, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ORDIDS.ToString, Billing_Process_PreReq_Enum.ORDIDS, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ERP_USER_ID.ToString, Billing_Process_PreReq_Enum.ERP_USER_ID, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.STATUS_OF_REQUISITION.ToString, Billing_Process_PreReq_Enum.STATUS_OF_REQUISITION, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.HL7_BILLING_MESG.ToString, Billing_Process_PreReq_Enum.HL7_BILLING_MESG, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING.ToString, Billing_Process_PreReq_Enum.EXCLUDE_CHRG_CODE_ITEMS_BILING, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS.ToString, Billing_Process_PreReq_Enum.ADT_BILLING_SEND_ADDRESS, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT.ToString, Billing_Process_PreReq_Enum.ADT_BILLING_SEND_PORT, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE.ToString, Billing_Process_PreReq_Enum.ADT_BILLING_THRESHOLD_VALUE, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION.ToString, Billing_Process_PreReq_Enum.ADT_RECEIVING_APPLICATION, "System.String", "N", "Y", "N"}, _
        {Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY.ToString, Billing_Process_PreReq_Enum.ADT_RECEIVING_FACILITY, "System.String", "N", "Y", "N"}}

    Public Shared Search_POU_Item_Header_Defns(,) As String = _
      {{Search_POU_Item_Header_Enum.ITEMID.ToString, Search_POU_Item_Header_Enum.ITEMID, "System.String", "N", "Y", "N"}, _
       {Search_POU_Item_Header_Enum.ITEM_DESCR.ToString, Search_POU_Item_Header_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
       {Search_POU_Item_Header_Enum.MANUFACTURER.ToString, Search_POU_Item_Header_Enum.MANUFACTURER, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Header_Enum.SCANFLAG.ToString, Search_POU_Item_Header_Enum.SCANFLAG, "System.Boolean", "N", "Y", "N"}}

    Public Shared Search_POU_Item_PreReq_Defns(,) As String = _
         {{Search_POU_Item_PreReqData_Enum.ITEM_DESCR.ToString, Search_POU_Item_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.ITEM_PRICE.ToString, Search_POU_Item_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, Search_POU_Item_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.ITEM_NDC_TYPE_CODE.ToString, Search_POU_Item_PreReqData_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.ITEM_UPN_TYPE_CODE.ToString, Search_POU_Item_PreReqData_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.REMOTE_DATABASE.ToString, Search_POU_Item_PreReqData_Enum.REMOTE_DATABASE, "System.String", "N", "Y", "N"}, _
         {Search_POU_Item_PreReqData_Enum.REMOTE_SCHEMA.ToString, Search_POU_Item_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}}

    Public Shared Search_POU_Item_Output_Defns(,) As String = _
        {{Search_POU_Item_Enum.ITEMID.ToString, Search_POU_Item_Enum.ITEMID, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.ITEM_DESCR.ToString, Search_POU_Item_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.MFG_ITEM_ID.ToString, Search_POU_Item_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.VENDOR_ITEM_ID.ToString, Search_POU_Item_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.MANUFACTURER.ToString, Search_POU_Item_Enum.MANUFACTURER, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.UPCID.ToString, Search_POU_Item_Enum.UPCID, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.ITEM_PRICE.ToString, Search_POU_Item_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.UOM.ToString, Search_POU_Item_Enum.UOM, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.LOT_CONTROLLED.ToString, Search_POU_Item_Enum.LOT_CONTROLLED, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.SERIAL_CONTROLLED.ToString, Search_POU_Item_Enum.SERIAL_CONTROLLED, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.VENDOR_ID.ToString, Search_POU_Item_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.CUST_ITEM_NO.ToString, Search_POU_Item_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.ITEM_TYPE.ToString, Search_POU_Item_Enum.ITEM_TYPE, "System.Int16", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.GTIN.ToString, Search_POU_Item_Enum.GTIN, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.IMPLANT_FLAG.ToString, Search_POU_Item_Enum.IMPLANT_FLAG, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS.ToString, Search_POU_Item_Enum.ITEM_MASTER_ITEM_STATUS, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.NON_CART_ITEM_STATUS.ToString, Search_POU_Item_Enum.NON_CART_ITEM_STATUS, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.BILL_ITEM_STATUS.ToString, Search_POU_Item_Enum.BILL_ITEM_STATUS, "System.String", "N", "Y", "N"}, _
        {Search_POU_Item_Enum.PAR_LOC_STATUS.ToString, Search_POU_Item_Enum.PAR_LOC_STATUS, "System.String", "N", "Y", "N"}}


#End Region

#Region "PickPlan"

#Region "PickPlan GetHeader Table columns to define the string arrays"
    Public Shared Get_Pick_IP_Header_Pre_Req_Defns(,) As String = _
 {{Get_Pick_IP_Header_Pre_Req_Enum.LOCATION_ALLOCATION.ToString, Get_Pick_IP_Header_Pre_Req_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_PRIORITY.ToString, Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_PRIORITY, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.LIMIT_OF_LISTS.ToString, Get_Pick_IP_Header_Pre_Req_Enum.LIMIT_OF_LISTS, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.CHCK_PLANS_SENT.ToString, Get_Pick_IP_Header_Pre_Req_Enum.CHCK_PLANS_SENT, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_BUNIT.ToString, Get_Pick_IP_Header_Pre_Req_Enum.DEFAULT_BUNIT, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_SCHEMA.ToString, Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_DATABASE.ToString, Get_Pick_IP_Header_Pre_Req_Enum.REMOTE_DATABASE, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.PICK_ALLOC_STORAGE_LOC_REQ.ToString, Get_Pick_IP_Header_Pre_Req_Enum.PICK_ALLOC_STORAGE_LOC_REQ, "System.String", "N", "Y", "N"}, _
  {Get_Pick_IP_Header_Pre_Req_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN.ToString, Get_Pick_IP_Header_Pre_Req_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_IP_Header_Order_Prefix_Defns(,) As String = _
    {{Get_Pick_IP_Header_Order_Prefix_Enum.ORDER_PREFIX.ToString, Get_Pick_IP_Header_Order_Prefix_Enum.ORDER_PREFIX, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_IP_Header_Location_BusinessUnit_Defns(,) As String = _
     {{Get_Pick_IP_Header_Location_BusinessUnit_Enum.LOCATION.ToString, Get_Pick_IP_Header_Location_BusinessUnit_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Pick_IP_Header_Location_BusinessUnit_Enum.BUSINESS_UNIT.ToString, Get_Pick_IP_Header_Location_BusinessUnit_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_IP_Header_Exclude_Orders_Defns(,) As String = _
     {{Get_Pick_IP_Header_Exclude_Orders_Enum.ORDER_ID.ToString, Get_Pick_IP_Header_Exclude_Orders_Enum.ORDER_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_IP_Header_Inventory_BusinessUnits_Defns(,) As String = _
     {{Get_Pick_IP_Header_Inventory_BusinessUnits_Enum.INVENTORY_BUSINESSUNIT.ToString, Get_Pick_IP_Header_Inventory_BusinessUnits_Enum.INVENTORY_BUSINESSUNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_OP_Header_Details_Defns(,) As String = _
     {{Get_Pick_OP_Header_Details_Enum.BUSINESS_UNIT.ToString, Get_Pick_OP_Header_Details_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.PICK_BATCH_ID.ToString, Get_Pick_OP_Header_Details_Enum.PICK_BATCH_ID, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.ORDER_NO.ToString, Get_Pick_OP_Header_Details_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.SHIP_TO_CUST_ID.ToString, Get_Pick_OP_Header_Details_Enum.SHIP_TO_CUST_ID, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.SHIP_CUST_NAME1.ToString, Get_Pick_OP_Header_Details_Enum.SHIP_CUST_NAME1, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.LOCATION.ToString, Get_Pick_OP_Header_Details_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.DMDSRC.ToString, Get_Pick_OP_Header_Details_Enum.DMDSRC, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.SBUNIT.ToString, Get_Pick_OP_Header_Details_Enum.SBUNIT, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.PRIORITY.ToString, Get_Pick_OP_Header_Details_Enum.PRIORITY, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.USER_ID.ToString, Get_Pick_OP_Header_Details_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
     {Get_Pick_OP_Header_Details_Enum.INV_BUSINESS_UNIT.ToString, Get_Pick_OP_Header_Details_Enum.INV_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.LOCATION_DESC.ToString, Get_Pick_OP_Header_Details_Enum.LOCATION_DESC, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.INV_BUNIT_DESC.ToString, Get_Pick_OP_Header_Details_Enum.INV_BUNIT_DESC, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ADDRESS1.ToString, Get_Pick_OP_Header_Details_Enum.ADDRESS1, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ADDRESS2.ToString, Get_Pick_OP_Header_Details_Enum.ADDRESS2, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ADDRESS3.ToString, Get_Pick_OP_Header_Details_Enum.ADDRESS3, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ADDRESS4.ToString, Get_Pick_OP_Header_Details_Enum.ADDRESS4, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.CITY.ToString, Get_Pick_OP_Header_Details_Enum.CITY, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.STATE.ToString, Get_Pick_OP_Header_Details_Enum.STATE, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ZIP_CODE.ToString, Get_Pick_OP_Header_Details_Enum.ZIP_CODE, "System.String", "N", "Y", "N"}, _
    {Get_Pick_OP_Header_Details_Enum.ATTN_TO.ToString, Get_Pick_OP_Header_Details_Enum.ATTN_TO, "System.String", "N", "Y", "N"}, _
	{Get_Pick_OP_Header_Details_Enum.REQUEST_DATE.ToString, Get_Pick_OP_Header_Details_Enum.REQUEST_DATE, "System.String", "N", "Y", "N"}}
	
   

#End Region

#Region "PickPlan GetDetails Table columns to define the string arrays"

    Public Shared Get_Pick_Detail_Input_Header_Defns(,) As String = _
            {{Get_Pick_Detail_Input_Header_Enum.BUSINESS_UNIT.ToString, Get_Pick_Detail_Input_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_Header_Enum.ORDER_NO.ToString, Get_Pick_Detail_Input_Header_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_Header_Enum.LOCATION.ToString, Get_Pick_Detail_Input_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
            {Get_Pick_GetDetails_Enum.BATCH_ID.ToString, Get_Pick_GetDetails_Enum.BATCH_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_Detail_Input_PreReq_Defns(,) As String = _
            {{Get_Pick_Detail_Input_PreReq_Enum.LOCATION_ALLOCATION.ToString, Get_Pick_Detail_Input_PreReq_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.ITEM_DESCR.ToString, Get_Pick_Detail_Input_PreReq_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_PICKUP_BUNIT.ToString, Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_PICKUP_BUNIT, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICKUP_MULTI_LOC.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICKUP_MULTI_LOC, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.ITEM_UPN_TYPE_CODE.ToString, Get_Pick_Detail_Input_PreReq_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.ITEM_NDC_TYPE_CODE.ToString, Get_Pick_Detail_Input_PreReq_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.REMOTE_SCHEMA.ToString, Get_Pick_Detail_Input_PreReq_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.REMOTE_DATABASE.ToString, Get_Pick_Detail_Input_PreReq_Enum.REMOTE_DATABASE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_STOCK_STORE.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_STOCK_STORE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_ENABLE_LOT_SRL_TRACKING, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_UPDATE_POU_INVENTORY.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_UPDATE_POU_INVENTORY, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_ALLOC_STORAGE_LOC_REQ.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_ALLOC_STORAGE_LOC_REQ, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN.ToString, Get_Pick_Detail_Input_PreReq_Enum.PICK_MULT_USERS_DOWNLOAD_PLAN, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.ITEM_PRICE.ToString, Get_Pick_Detail_Input_PreReq_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.PACKAGING_STRING_FOR_LABELS.ToString, Get_Pick_Detail_Input_PreReq_Enum.PACKAGING_STRING_FOR_LABELS, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.DISPLAY_ORDERING_UOM_TYPE.ToString, Get_Pick_Detail_Input_PreReq_Enum.DISPLAY_ORDERING_UOM_TYPE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_UNIT_OF_MEASURE.ToString, Get_Pick_Detail_Input_PreReq_Enum.DEFAULT_UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_PreReq_Enum.EDIT_PICK_UOM.ToString, Get_Pick_Detail_Input_PreReq_Enum.EDIT_PICK_UOM, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pick_Detail_Input_ListViewParams_Defns(,) As String = _
            {{Get_Pick_Detail_Input_ListViewParams_Enum.VEND_ITEM_ID.ToString, Get_Pick_Detail_Input_ListViewParams_Enum.VEND_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_ListViewParams_Enum.MFG_ITEM_ID.ToString, Get_Pick_Detail_Input_ListViewParams_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_ListViewParams_Enum.PRICE.ToString, Get_Pick_Detail_Input_ListViewParams_Enum.PRICE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Input_ListViewParams_Enum.PACKAGING_STRING.ToString, Get_Pick_Detail_Input_ListViewParams_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}}

   

    Public Shared Get_Pick_Detail_Input_StorageLocation_Defns(,) As String = _
              {{Get_Pick_Detail_Input_StorageLocation_Enum.STORAGE_AREA.ToString, Get_Pick_Detail_Input_StorageLocation_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
               {Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_1.ToString, Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
               {Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_2.ToString, Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
               {Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_3.ToString, Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
               {Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_4.ToString, Get_Pick_Detail_Input_StorageLocation_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pick_Detail_Output_Header_Defns(,) As String = _
            {{Get_Pick_Detail_Output_Header_Enum.BUSINESS_UNIT.ToString, Get_Pick_Detail_Output_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.DEMAND_SOURCE.ToString, Get_Pick_Detail_Output_Header_Enum.DEMAND_SOURCE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.SOURCE_BUS_UNIT.ToString, Get_Pick_Detail_Output_Header_Enum.SOURCE_BUS_UNIT, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.ORDER_NO.ToString, Get_Pick_Detail_Output_Header_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.LOCATION.ToString, Get_Pick_Detail_Output_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.PICK_BATCH_ID.ToString, Get_Pick_Detail_Output_Header_Enum.PICK_BATCH_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.SHIP_CUST_NAME1.ToString, Get_Pick_Detail_Output_Header_Enum.SHIP_CUST_NAME1, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_Header_Enum.TRANSACTION_ID.ToString, Get_Pick_Detail_Output_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_Detail_Output_Details_Defns(,) As String = _
           {{Get_Pick_Detail_Output_Details_Enum.STDUOM.ToString, Get_Pick_Detail_Output_Details_Enum.STDUOM, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.ORDER_INT_LINE_NO.ToString, Get_Pick_Detail_Output_Details_Enum.ORDER_INT_LINE_NO, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SCHED_LINE_NBR.ToString, Get_Pick_Detail_Output_Details_Enum.SCHED_LINE_NBR, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.INV_ITEM_ID.ToString, Get_Pick_Detail_Output_Details_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.DEMAND_LINE_NO.ToString, Get_Pick_Detail_Output_Details_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SEQ_NBR.ToString, Get_Pick_Detail_Output_Details_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PICK_BATCH_ID.ToString, Get_Pick_Detail_Output_Details_Enum.PICK_BATCH_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PICKLIST_LINE_NO.ToString, Get_Pick_Detail_Output_Details_Enum.PICKLIST_LINE_NO, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SHIP_TO_CUST_ID.ToString, Get_Pick_Detail_Output_Details_Enum.SHIP_TO_CUST_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SHIP_CUST_NAME1.ToString, Get_Pick_Detail_Output_Details_Enum.SHIP_CUST_NAME1, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.QTY_REQUESTED.ToString, Get_Pick_Detail_Output_Details_Enum.QTY_REQUESTED, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.QTY_REQUESTED_BASE.ToString, Get_Pick_Detail_Output_Details_Enum.QTY_REQUESTED_BASE, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.QTYALT_BASE.ToString, Get_Pick_Detail_Output_Details_Enum.QTYALT_BASE, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.UNIT_OF_MEASURE.ToString, Get_Pick_Detail_Output_Details_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STORAGE_AREA.ToString, Get_Pick_Detail_Output_Details_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_1.ToString, Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_2.ToString, Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_3.ToString, Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_4.ToString, Get_Pick_Detail_Output_Details_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PARTIAL_QTY_FLAG.ToString, Get_Pick_Detail_Output_Details_Enum.PARTIAL_QTY_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.CONFIRMED_FLAG.ToString, Get_Pick_Detail_Output_Details_Enum.CONFIRMED_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PARTIAL_ORDER_FLAG.ToString, Get_Pick_Detail_Output_Details_Enum.PARTIAL_ORDER_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.DEPTID.ToString, Get_Pick_Detail_Output_Details_Enum.DEPTID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.MFG_ITEM_ID.ToString, Get_Pick_Detail_Output_Details_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.VENDOR_ITEM_ID.ToString, Get_Pick_Detail_Output_Details_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.DESCR.ToString, Get_Pick_Detail_Output_Details_Enum.DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.GTIN.ToString, Get_Pick_Detail_Output_Details_Enum.GTIN, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.UPCID.ToString, Get_Pick_Detail_Output_Details_Enum.UPCID, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SQTY.ToString, Get_Pick_Detail_Output_Details_Enum.SQTY, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PICKUOM.ToString, Get_Pick_Detail_Output_Details_Enum.PICKUOM, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.CONVERSION_RATE.ToString, Get_Pick_Detail_Output_Details_Enum.CONVERSION_RATE, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.CUST_ITEM_NO.ToString, Get_Pick_Detail_Output_Details_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.LOT_FLAG.ToString, Get_Pick_Detail_Output_Details_Enum.LOT_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.SRL_FLAG.ToString, Get_Pick_Detail_Output_Details_Enum.SRL_FLAG, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.QTY_PICKED_CONV.ToString, Get_Pick_Detail_Output_Details_Enum.QTY_PICKED_CONV, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PRICE.ToString, Get_Pick_Detail_Output_Details_Enum.PRICE, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.PACKAGING_STRING.ToString, Get_Pick_Detail_Output_Details_Enum.PACKAGING_STRING, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STD_PACK_UOM.ToString, Get_Pick_Detail_Output_Details_Enum.STD_PACK_UOM, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.STD_CONV_FACT.ToString, Get_Pick_Detail_Output_Details_Enum.STD_CONV_FACT, "System.String", "N", "Y", "N"}, _
           {Get_Pick_Detail_Output_Details_Enum.ASRS_ID.ToString, Get_Pick_Detail_Output_Details_Enum.ASRS_ID, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pick_Detail_Output_AlternateLocations_Defns(,) As String = _
            {{Get_Pick_Detail_Output_AlternateLocations_Enum.SERIAL_ID.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.INV_LOT_ID.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.CONTAINER_ID.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_AREA.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_1.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_1, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_2.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_2, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_3.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_3, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_4.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.STORAGE_LEVEL_4, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.PHY_INV_UOM.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.PHY_INV_UOM, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.CONVERSION_RATE.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.CONVERSION_RATE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.QTY.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.QTY, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.INV_ITEM_ID.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.ORDER_INT_LINE_NO.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.ORDER_INT_LINE_NO, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.EXPIRY_DATE.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.ALLOTED_LOT_FLAG.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.ALLOTED_LOT_FLAG, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.SCHED_LINE_NBR.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.SCHED_LINE_NBR, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.DEMAND_LINE_NO.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
            {Get_Pick_Detail_Output_AlternateLocations_Enum.SEQ_NBR.ToString, Get_Pick_Detail_Output_AlternateLocations_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pick_Detail_Output_SubstituteItems_Defns(,) As String = _
          {{Get_Pick_Detail_Output_SubstituteItems_Enum.SERIAL_ID.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.INV_LOT_ID.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_AREA.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_1.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_1, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_2.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_2, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_3.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_3, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_4.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.STORAGE_LEVEL_4, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.UNIT_OF_MEASURE.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.CONVERSION_RATE.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.CONVERSION_RATE, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.QTY.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.QTY, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.INV_ITEM_ID.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.SUB_ITM_ID.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.SUB_ITM_ID, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.CONTAINER_ID.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.EXPIRY_DATE.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
          {Get_Pick_Detail_Output_SubstituteItems_Enum.SCHED_LINE_NBR.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.ORDER_INT_LINE_NO, "System.String", "N", "Y", "N"}, _
    {Get_Pick_Detail_Output_SubstituteItems_Enum.SCHED_LINE_NBR.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.SCHED_LINE_NBR, "System.String", "N", "Y", "N"}, _
    {Get_Pick_Detail_Output_SubstituteItems_Enum.DEMAND_LINE_NO.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
    {Get_Pick_Detail_Output_SubstituteItems_Enum.SEQ_NBR.ToString, Get_Pick_Detail_Output_SubstituteItems_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_Detail_Output_AlternateUOMs_Defns(,) As String = _
       {{Get_Pick_Detail_Output_AlternateUOMs_Enum.ORDER_INT_LINE.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.ORDER_INT_LINE, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.INV_ITEM_ID.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.SCHED_LINE_NO.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.SCHED_LINE_NO, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.DEMAND_LINE_NO.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.SEQ_NBR.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.UNIT_OF_MEASURE.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
        {Get_Pick_Detail_Output_AlternateUOMs_Enum.CONVERSION_RATE.ToString, Get_Pick_Detail_Output_AlternateUOMs_Enum.CONVERSION_RATE, "System.Double", "N", "Y", "N"}}


#End Region

#Region "PickPlan SendDetails Table columns to define the string arrays"

    Public Shared Send_Pick_Input_HEADER_Enum_Defns(,) As String = _
       {{Send_Pick_Input_HEADER_Enum.BUSINESS_UNIT.ToString, Send_Pick_Input_HEADER_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.BATCH_ID.ToString, Send_Pick_Input_HEADER_Enum.BATCH_ID, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.ORDER_NO.ToString, Send_Pick_Input_HEADER_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.STARTTIME.ToString, Send_Pick_Input_HEADER_Enum.STARTTIME, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.ENDTIME.ToString, Send_Pick_Input_HEADER_Enum.ENDTIME, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.TRANSACTION_ID.ToString, Send_Pick_Input_HEADER_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.USER_ID.ToString, Send_Pick_Input_HEADER_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.SOURCE_BUSINESS_UNIT.ToString, Send_Pick_Input_HEADER_Enum.SOURCE_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.DEMAND_SOURCE.ToString, Send_Pick_Input_HEADER_Enum.DEMAND_SOURCE, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.SHIPMENT_NBR.ToString, Send_Pick_Input_HEADER_Enum.SHIPMENT_NBR, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.TRACKING_NBR.ToString, Send_Pick_Input_HEADER_Enum.TRACKING_NBR, "System.String", "N", "Y", "N"}, _
        {Send_Pick_Input_HEADER_Enum.REQUEST_DATE.ToString, Send_Pick_Input_HEADER_Enum.REQUEST_DATE, "System.String", "N", "Y", "N"}}


    Public Shared Send_Pick_Input_DETAILS_Enum_Defns(,) As String = _
     {{Send_Pick_Input_DETAILS_Enum.LINE_NO.ToString, Send_Pick_Input_DETAILS_Enum.LINE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.ORDERLINE_NO.ToString, Send_Pick_Input_DETAILS_Enum.ORDERLINE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.INV_ITEM_ID.ToString, Send_Pick_Input_DETAILS_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.SCHED_LINE_NO.ToString, Send_Pick_Input_DETAILS_Enum.SCHED_LINE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.DEMAND_LINE_NO.ToString, Send_Pick_Input_DETAILS_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.SEQ_NBR.ToString, Send_Pick_Input_DETAILS_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STORAGE_AREA.ToString, Send_Pick_Input_DETAILS_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_1.ToString, Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_2.ToString, Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_3.ToString, Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_4.ToString, Send_Pick_Input_DETAILS_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.QTY_PICKED.ToString, Send_Pick_Input_DETAILS_Enum.QTY_PICKED, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.SUM_QTY.ToString, Send_Pick_Input_DETAILS_Enum.SUM_QTY, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.QTY_ORDER.ToString, Send_Pick_Input_DETAILS_Enum.QTY_ORDER, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.STD_UOM.ToString, Send_Pick_Input_DETAILS_Enum.STD_UOM, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.UNIT_OF_MEASURE.ToString, Send_Pick_Input_DETAILS_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.PICK_UOM.ToString, Send_Pick_Input_DETAILS_Enum.PICK_UOM, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.DEPTID.ToString, Send_Pick_Input_DETAILS_Enum.DEPTID, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.QTY_REQUESTED.ToString, Send_Pick_Input_DETAILS_Enum.QTY_REQUESTED, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.QTY_ALLOCATED.ToString, Send_Pick_Input_DETAILS_Enum.QTY_ALLOCATED, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.DATE_TIME.ToString, Send_Pick_Input_DETAILS_Enum.DATE_TIME, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.CUST_ITEM_NO.ToString, Send_Pick_Input_DETAILS_Enum.CUST_ITEM_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.LOCATION.ToString, Send_Pick_Input_DETAILS_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.TOTE_NO.ToString, Send_Pick_Input_DETAILS_Enum.TOTE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.HAS_SUBSTITUTE_ITEMS.ToString, Send_Pick_Input_DETAILS_Enum.HAS_SUBSTITUTE_ITEMS, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_DETAILS_Enum.CONVERSION_FACTOR.ToString, Send_Pick_Input_DETAILS_Enum.CONVERSION_FACTOR, "System.String", "N", "Y", "N"}}

    Public Shared Send_Pick_Input_ALTERNATE_LOCATIONS_Enum_Defns(,) As String = _
    {{Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.INV_ITEM_ID.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
     {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.ORDER_INT_LINE_NO.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.ORDER_INT_LINE_NO, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STORAGE_AREA.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STORAGE_AREA, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_1.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_1, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_2.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_2, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_3.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_3, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_4.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.STOR_LEVEL_4, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.UNIT_OF_MEASURE.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.UNIT_OF_MEASURE, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SYS_QTY.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SYS_QTY, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.QTY_PICKED.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.QTY_PICKED, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.PICK_UOM.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.PICK_UOM, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.CONVERSION_FACTOR.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.CONVERSION_FACTOR, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SERIAL_ID.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.INV_LOT_ID.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.INV_LOT_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.CONTAINER_ID.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.CONTAINER_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SCHED_LINE_NO.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SCHED_LINE_NO, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.DEMAND_LINE_NO.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.DEMAND_LINE_NO, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SEQ_NBR.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SEQ_NBR, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SUB_ITEM_ID.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.SUB_ITEM_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.EXPIRY_DATE.ToString, Send_Pick_Input_ALTERNATE_LOCATIONS_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}}

    Public Shared Send_Pick_Input_PRE_REQ_Enum_Defns(,) As String = _
     {{Send_Pick_Input_PRE_REQ_Enum.ITEM_PICK_HIGH_PCT.ToString, Send_Pick_Input_PRE_REQ_Enum.ITEM_PICK_HIGH_PCT, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.ITEM_PICK_LOW_PCT.ToString, Send_Pick_Input_PRE_REQ_Enum.ITEM_PICK_LOW_PCT, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.REMOTE_SCHEMA.ToString, Send_Pick_Input_PRE_REQ_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.REMOTE_DATABASE.ToString, Send_Pick_Input_PRE_REQ_Enum.REMOTE_DATABASE, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_Pick_Input_PRE_REQ_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.ENTERPRISE_VERSION.ToString, Send_Pick_Input_PRE_REQ_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.PICK_STOCK_STORE.ToString, Send_Pick_Input_PRE_REQ_Enum.PICK_STOCK_STORE, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.PRINT_PATIENT_CHARGE.ToString, Send_Pick_Input_PRE_REQ_Enum.PRINT_PATIENT_CHARGE, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.COORDINATOR_EMAIL_PICKREQ.ToString, Send_Pick_Input_PRE_REQ_Enum.COORDINATOR_EMAIL_PICKREQ, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Input_PRE_REQ_Enum.PS_USER.ToString, Send_Pick_Input_PRE_REQ_Enum.PS_USER, "System.String", "N", "Y", "N"}, _
	  {Send_Pick_Input_PRE_REQ_Enum.PICK_ENABLE_LOT_SRL_TRACKING.ToString, Send_Pick_Input_PRE_REQ_Enum.PICK_ENABLE_LOT_SRL_TRACKING, "System.String", "N", "Y", "N"}, _
	  {Send_Pick_Input_PRE_REQ_Enum.PICK_UPDATE_POU_INVENTORY.ToString, Send_Pick_Input_PRE_REQ_Enum.PICK_UPDATE_POU_INVENTORY, "System.String", "N", "Y", "N"}, _
	  {Send_Pick_Input_PRE_REQ_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS.ToString, Send_Pick_Input_PRE_REQ_Enum.PICK_SEND_LOT_SRL_INFO_TO_MMIS, "System.String", "N", "Y", "N"}}
		

#End Region

#Region "[ Old Code ]"
    Public Shared Get_Pick_Header_Defns(,) As String = _
    {{Get_Pick_Header_Enum.LOCATION_ALLOCATION.ToString, Get_Pick_Header_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.DEFAULT_PRIORITY.ToString, Get_Pick_Header_Enum.DEFAULT_PRIORITY, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.DEFAULT_PICKUP_BUNIT.ToString, Get_Pick_Header_Enum.DEFAULT_PICKUP_BUNIT, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.LIMIT_OF_LISTS.ToString, Get_Pick_Header_Enum.LIMIT_OF_LISTS, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.BUSINESS_UNIT.ToString, Get_Pick_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.SET_ID.ToString, Get_Pick_Header_Enum.SET_ID, "System.String", "N", "Y", "N"}, _
     {Get_Pick_Header_Enum.LOCATION.ToString, Get_Pick_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
  {Get_Pick_Header_Enum.LOCATIONNAME.ToString, Get_Pick_Header_Enum.LOCATIONNAME, "System.String", "N", "Y", "N"}, _
  {Get_Pick_Header_Enum.STATUS.ToString, Get_Pick_Header_Enum.STATUS, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_PreReqData_Defns(,) As String = _
   {{Pick_PreReq_Enum.LOCATION_ALLOCATION.ToString, Pick_PreReq_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.LIMIT_OF_LISTS.ToString, Pick_PreReq_Enum.LIMIT_OF_LISTS, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.DEFAULT_PRIORITY.ToString, Pick_PreReq_Enum.DEFAULT_PRIORITY, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.DEFAULT_PICKUP_BUNIT.ToString, Pick_PreReq_Enum.DEFAULT_PICKUP_BUNIT, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.ITEM_PICK_HIGH_PCT.ToString, Pick_PreReq_Enum.ITEM_PICK_HIGH_PCT, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.ITEM_PICK_LOW_PCT.ToString, Pick_PreReq_Enum.ITEM_PICK_LOW_PCT, "System.String", "N", "Y", "N"}, _
    {Pick_PreReq_Enum.ORDER_PREFIX.ToString, Pick_PreReq_Enum.ORDER_PREFIX, "System.String", "N", "Y", "N"}, _
     {Pick_PreReq_Enum.ERP_USER_ID.ToString, Pick_PreReq_Enum.ERP_USER_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pick_Details_Defns(,) As String = _
        {{Get_Pick_GetDetails_Enum.ITEM_UPN_TYPE_CODE.ToString, Get_Pick_GetDetails_Enum.ITEM_UPN_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.ITEM_NDC_TYPE_CODE.ToString, Get_Pick_GetDetails_Enum.ITEM_NDC_TYPE_CODE, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.PICKUP_MULTI_LOC.ToString, Get_Pick_GetDetails_Enum.PICKUP_MULTI_LOC, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_Pick_GetDetails_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.ITEM_DESCR.ToString, Get_Pick_GetDetails_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.BUSINESS_UNIT.ToString, Get_Pick_GetDetails_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.ORDER_NO.ToString, Get_Pick_GetDetails_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.LOCATION.ToString, Get_Pick_GetDetails_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
         {Get_Pick_GetDetails_Enum.BATCH_ID.ToString, Get_Pick_GetDetails_Enum.BATCH_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_Pick_Header_Defns(,) As String = _
      {{Send_Pick_Header_Enum.BUSINESS_UNIT.ToString, Send_Pick_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.BATCH_ID.ToString, Send_Pick_Header_Enum.BATCH_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.ORDER_NO.ToString, Send_Pick_Header_Enum.ORDER_NO, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.USER_ID.ToString, Send_Pick_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.END_DT_TIME.ToString, Send_Pick_Header_Enum.END_DT_TIME, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.SHIPMENT_NUMBER.ToString, Send_Pick_Header_Enum.SHIPMENT_NUMBER, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Header_Enum.SOURCE_BUNIT.ToString, Send_Pick_Header_Enum.SOURCE_BUNIT, "System.String", "N", "Y", "N"}}


    Public Shared Send_Pick_Details_Defns(,) As String = _
      {{Send_Pick_Details_Enum.ORDER_LINE_NBR.ToString, Send_Pick_Details_Enum.ORDER_LINE_NBR, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.ITEM_ID.ToString, Send_Pick_Details_Enum.ITEM_ID, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.DT_TIME.ToString, Send_Pick_Details_Enum.DT_TIME, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.QTY.ToString, Send_Pick_Details_Enum.QTY, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.ALLOCATED_QTY.ToString, Send_Pick_Details_Enum.ALLOCATED_QTY, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.UOM.ToString, Send_Pick_Details_Enum.UOM, "System.String", "N", "Y", "N"}, _
     {Send_Pick_Details_Enum.LINE_NBR.ToString, Send_Pick_Details_Enum.LINE_NBR, "System.String", "N", "Y", "N"}, _
       {Send_Pick_Details_Enum.BUSINESS_UNIT.ToString, Send_Pick_Details_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
      {Send_Pick_Details_Enum.ORDER_NO.ToString, Send_Pick_Details_Enum.ORDER_NO, "System.String", "N", "Y", "N"}}
#End Region
#End Region

#Region "Deliver"



    Public Shared Get_Delv_Header_Input_Defns(,) As String = _
            {{Get_Delv_Header_Input_Enum.LOCATION.ToString, Get_Delv_Header_Input_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.POID.ToString, Get_Delv_Header_Input_Enum.POID, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.TRKNO.ToString, Get_Delv_Header_Input_Enum.TRKNO, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.FROM_DATE.ToString, Get_Delv_Header_Input_Enum.FROM_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.TO_DATE.ToString, Get_Delv_Header_Input_Enum.TO_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.ORG_GROUP_ID.ToString, Get_Delv_Header_Input_Enum.ORG_GROUP_ID, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.DELVUSER.ToString, Get_Delv_Header_Input_Enum.DELVUSER, "System.String", "N", "Y", "N"}, _
            {Get_Delv_Header_Input_Enum.PALLETNO.ToString, Get_Delv_Header_Input_Enum.PALLETNO, "System.String", "N", "Y", "N"}, _
			{Get_Delv_Header_Input_Enum.REDELIVER.ToString, Get_Delv_Header_Input_Enum.REDELIVER, "System.String", "N", "Y", "N"}, _
			{Get_Delv_Header_Input_Enum.REDELIVERPOPUP.ToString, Get_Delv_Header_Input_Enum.REDELIVERPOPUP, "System.String", "N", "Y", "N"}}


    Public Shared Get_Deliver_PreReqData_Defns(,) As String = _
          {{Get_Deliver_PreReqData_Enum.DEFAULT_SHIP_TO_LOC.ToString, Get_Deliver_PreReqData_Enum.DEFAULT_SHIP_TO_LOC, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.SHIP_TO_LOC_ALLOCATION.ToString, Get_Deliver_PreReqData_Enum.SHIP_TO_LOC_ALLOCATION, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.NON_STOCK_STORE.ToString, Get_Deliver_PreReqData_Enum.NON_STOCK_STORE, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.DELV_RCPT_PRINT_NT_PRINTER.ToString, Get_Deliver_PreReqData_Enum.DELV_RCPT_PRINT_NT_PRINTER, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.DELIVER_BUSINESS_UNIT.ToString, Get_Deliver_PreReqData_Enum.DELIVER_BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Deliver_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Deliver_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.RECV_ORDER_NON_STOCK.ToString, Get_Deliver_PreReqData_Enum.RECV_ORDER_NON_STOCK, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.ITEM_DESCR.ToString, Get_Deliver_PreReqData_Enum.ITEM_DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.DEFAULT_MFG_ITEM_ID.ToString, Get_Deliver_PreReqData_Enum.DEFAULT_MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.REQUESTOR_EMAIL_TABLE.ToString, Get_Deliver_PreReqData_Enum.REQUESTOR_EMAIL_TABLE, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.DELV_RECEIPT_EMAIL.ToString, Get_Deliver_PreReqData_Enum.DELV_RECEIPT_EMAIL, "System.String", "N", "Y", "N"}, _
     {Get_Deliver_PreReqData_Enum.PICK_STOCK_STORE.ToString, Get_Deliver_PreReqData_Enum.PICK_STOCK_STORE, "System.String", "N", "Y", "N"}, _
     {Get_Deliver_PreReqData_Enum.ITEM_PRICE.ToString, Get_Deliver_PreReqData_Enum.ITEM_PRICE, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_PreReqData_Enum.DEFAULT_SHIPTO_ID.ToString, Get_Deliver_PreReqData_Enum.DEFAULT_SHIPTO_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Deliver_Detail_ListView_Reqparams_Defns(,) As String = _
           {{Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_5.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_5, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.DESCR.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.INFO_1.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.INFO_1, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.INV_ITEM_ID.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_4.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_4, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_1.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_1, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_3.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_2.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_2, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.QTY.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.QTY, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_4.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_4, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_3.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_3, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.STATUS.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.STATUS, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.TRANSACTION_ID.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.UOM.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.UOM, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.UPC_ID.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.VENDOR_ITEM_ID.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_1.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_1, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_7.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_7, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_5.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.KEY_5, "System.String", "N", "Y", "N"}, _
		   {Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_6.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.REPORT_DATA_6, "System.String", "N", "Y", "N"}, _
           {Get_Deliver_Detail_ListView_Reqparams_Enum.PRICE.ToString, Get_Deliver_Detail_ListView_Reqparams_Enum.PRICE, "System.String", "N", "Y", "N"}}

    Public Shared Get_Delv_Transactions_Defns(,) As String = _
         {{Get_Delv_Header_Transactions_Enum.TRANSACTION_ID.ToString, Get_Delv_Header_Transactions_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Delv_Header_Locations_Defns(,) As String = _
        {{Get_Delv_Header_Locations_Enum.LOCATION.ToString, Get_Delv_Header_Locations_Enum.LOCATION, "System.String", "N", "Y", "N"}}

    Public Shared Get_Delv_BusinessUnits_Defns(,) As String = _
         {{Get_Delv_Header_BusinessUnits_Enum.BUSINESS_UNIT.ToString, Get_Delv_Header_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Delv_Header_Output_Defns(,) As String = _
              {{Get_Delv_Header_Output_Enum.TRANSACTION_ID.ToString, Get_Delv_Header_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.SET_ID.ToString, Get_Delv_Header_Output_Enum.SET_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.LOCATION.ToString, Get_Delv_Header_Output_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.DESCR.ToString, Get_Delv_Header_Output_Enum.DESCR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ADDRESS1.ToString, Get_Delv_Header_Output_Enum.ADDRESS1, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ADDRESS2.ToString, Get_Delv_Header_Output_Enum.ADDRESS2, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ADDRESS3.ToString, Get_Delv_Header_Output_Enum.ADDRESS3, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ADDRESS4.ToString, Get_Delv_Header_Output_Enum.ADDRESS4, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.CITY.ToString, Get_Delv_Header_Output_Enum.CITY, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.STATE.ToString, Get_Delv_Header_Output_Enum.STATE, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.COUNTRY.ToString, Get_Delv_Header_Output_Enum.COUNTRY, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.COUNTY.ToString, Get_Delv_Header_Output_Enum.COUNTY, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ZIP_CODE.ToString, Get_Delv_Header_Output_Enum.ZIP_CODE, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.BUILDING.ToString, Get_Delv_Header_Output_Enum.BUILDING, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.FLOOR.ToString, Get_Delv_Header_Output_Enum.FLOOR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.PHONE.ToString, Get_Delv_Header_Output_Enum.PHONE, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.EXTENSION.ToString, Get_Delv_Header_Output_Enum.EXTENSION, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.COMMENTS.ToString, Get_Delv_Header_Output_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ATTN_TO.ToString, Get_Delv_Header_Output_Enum.ATTN_TO, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.BUSINESS_UNIT.ToString, Get_Delv_Header_Output_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ILOCATION.ToString, Get_Delv_Header_Output_Enum.ILOCATION, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECEIVER_ID.ToString, Get_Delv_Header_Output_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECV_LN_NBR.ToString, Get_Delv_Header_Output_Enum.RECV_LN_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECV_SHIP_SEQ_NBR.ToString, Get_Delv_Header_Output_Enum.RECV_SHIP_SEQ_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.DISTRIB_LINE_NUM.ToString, Get_Delv_Header_Output_Enum.DISTRIB_LINE_NUM, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.LINE_NBR.ToString, Get_Delv_Header_Output_Enum.LINE_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.DEPTID.ToString, Get_Delv_Header_Output_Enum.DEPTID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.INV_ITEM_ID.ToString, Get_Delv_Header_Output_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.QTY.ToString, Get_Delv_Header_Output_Enum.QTY, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.IDESCR.ToString, Get_Delv_Header_Output_Enum.IDESCR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.UPC_ID.ToString, Get_Delv_Header_Output_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.VENDOR_ITEM_ID.ToString, Get_Delv_Header_Output_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.MFG_ITEM_ID.ToString, Get_Delv_Header_Output_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECEIVE_UOM.ToString, Get_Delv_Header_Output_Enum.RECEIVE_UOM, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.PO_ID.ToString, Get_Delv_Header_Output_Enum.PO_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.SHIPTO_ID.ToString, Get_Delv_Header_Output_Enum.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECV_STATUS.ToString, Get_Delv_Header_Output_Enum.RECV_STATUS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.VENDOR_ID.ToString, Get_Delv_Header_Output_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.VENDOR_NAME.ToString, Get_Delv_Header_Output_Enum.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.RECEIPT_DT.ToString, Get_Delv_Header_Output_Enum.RECEIPT_DT, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.BILL_OF_LADING.ToString, Get_Delv_Header_Output_Enum.BILL_OF_LADING, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.DUE_DT.ToString, Get_Delv_Header_Output_Enum.DUE_DT, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.STMT_COMMENTS.ToString, Get_Delv_Header_Output_Enum.STMT_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.REQUESTOR_ID.ToString, Get_Delv_Header_Output_Enum.REQUESTOR_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.LINE_COMMENTS.ToString, Get_Delv_Header_Output_Enum.LINE_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.FAX.ToString, Get_Delv_Header_Output_Enum.FAX, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.ZIP.ToString, Get_Delv_Header_Output_Enum.ZIP, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.UOM.ToString, Get_Delv_Header_Output_Enum.UOM, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.STATUS.ToString, Get_Delv_Header_Output_Enum.STATUS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.TRKNBR.ToString, Get_Delv_Header_Output_Enum.TRKNBR, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.AUTH_PERSONS.ToString, Get_Delv_Header_Output_Enum.AUTH_PERSONS, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.AUTH_ID.ToString, Get_Delv_Header_Output_Enum.AUTH_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.AUTH_NAME.ToString, Get_Delv_Header_Output_Enum.AUTH_NAME, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.EMAIL.ToString, Get_Delv_Header_Output_Enum.EMAIL, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.CARRIERID.ToString, Get_Delv_Header_Output_Enum.CARRIERID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.DLVDTO.ToString, Get_Delv_Header_Output_Enum.DLVDTO, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.USER_ID.ToString, Get_Delv_Header_Output_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.STATUS_CODE.ToString, Get_Delv_Header_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
               {Get_Delv_Header_Output_Enum.CANCELLED_STATUS.ToString, Get_Delv_Header_Output_Enum.CANCELLED_STATUS, "System.String", "N", "Y", "N"}, _
              {Get_Delv_Header_Output_Enum.TYPE_OF_PACKAGE.ToString, Get_Delv_Header_Output_Enum.TYPE_OF_PACKAGE, "System.String", "N", "Y", "N"}, _
              {Get_Delv_Header_Output_Enum.PRICE.ToString, Get_Delv_Header_Output_Enum.PRICE, "System.String", "N", "Y", "N"}, _
              {Get_Delv_Header_Output_Enum.PALLETNO.ToString, Get_Delv_Header_Output_Enum.PALLETNO, "System.String", "N", "Y", "N"}, _
			  {Get_Delv_Header_Output_Enum.SECTOR.ToString, Get_Delv_Header_Output_Enum.SECTOR, "System.String", "N", "Y", "N"}, _
			  {Get_Delv_Header_Output_Enum.NO_OF_PACKAGES.ToString, Get_Delv_Header_Output_Enum.NO_OF_PACKAGES, "System.String", "N", "Y", "N"}}


    Public Shared Get_Delv_Output_Status_Defns(,) As String = _
           {{Get_Delv_Output_Status_Enum.STATUS_CODE.ToString, Get_Delv_Output_Status_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
           {Get_Delv_Output_Status_Enum.STATUS_DESCR.ToString, Get_Delv_Output_Status_Enum.STATUS_DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Delv_Output_Status_Enum.MULTIPLE_LOCATIONS.ToString, Get_Delv_Output_Status_Enum.MULTIPLE_LOCATIONS, "System.String", "N", "Y", "N"}, _
           {Get_Delv_Output_Status_Enum.TRANSACTION_ID.ToString, Get_Delv_Output_Status_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
           {Get_Delv_Output_Status_Enum.OLD_TRANSACTION_ID.ToString, Get_Delv_Output_Status_Enum.OLD_TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_Delv_Details_Defns(,) As String = _
              {{Send_Delv_Details_Enum.TRANSACTION_ID.ToString, Send_Delv_Details_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.PRINTER_ADDRESS.ToString, Send_Delv_Details_Enum.PRINTER_ADDRESS, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.EMAIL_FLAG.ToString, Send_Delv_Details_Enum.EMAIL_FLAG, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.ATTEMPT_DATE.ToString, Send_Delv_Details_Enum.ATTEMPT_DATE, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.ATTEMPT_COMMENTS.ToString, Send_Delv_Details_Enum.ATTEMPT_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.TRACKING_NBR.ToString, Send_Delv_Details_Enum.TRACKING_NBR, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.CARRIER_ID.ToString, Send_Delv_Details_Enum.CARRIER_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.LOCATION.ToString, Send_Delv_Details_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.DELIVER_TO.ToString, Send_Delv_Details_Enum.DELIVER_TO, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.DELIVERY_LOCATION.ToString, Send_Delv_Details_Enum.DELIVERY_LOCATION, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.RECEIVER.ToString, Send_Delv_Details_Enum.RECEIVER, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.VENDOR_NAME.ToString, Send_Delv_Details_Enum.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.DESCR.ToString, Send_Delv_Details_Enum.DESCR, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.DEPT_ID.ToString, Send_Delv_Details_Enum.DEPT_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.KEY_3.ToString, Send_Delv_Details_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.LINE_NO.ToString, Send_Delv_Details_Enum.LINE_NO, "System.String", "N", "Y", "N"}, _
                {Send_Delv_Details_Enum.SHIPTO_ID.ToString, Send_Delv_Details_Enum.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.TYPE_OF_PACKAGE.ToString, Send_Delv_Details_Enum.TYPE_OF_PACKAGE, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.COMMENTS.ToString, Send_Delv_Details_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.EVENT_ID.ToString, Send_Delv_Details_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.UPDATE_DATE.ToString, Send_Delv_Details_Enum.UPDATE_DATE, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.USER_ID.ToString, Send_Delv_Details_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.SIGNATURE_ID.ToString, Send_Delv_Details_Enum.SIGNATURE_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.PICK_ITEM.ToString, Send_Delv_Details_Enum.PICK_ITEM, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.NONPO_ITEM.ToString, Send_Delv_Details_Enum.NONPO_ITEM, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.LOC_DESCR.ToString, Send_Delv_Details_Enum.LOC_DESCR, "System.String", "N", "Y", "N"}, _
               {Send_Delv_Details_Enum.NO_OF_PACKAGES.ToString, Send_Delv_Details_Enum.NO_OF_PACKAGES, "System.String", "N", "Y", "N"}}
    Public Shared Send_Delv_ERP_Dtls_Defns(,) As String = _
              {{Send_Delv_Details_Enum.TRANSACTION_ID.ToString, Send_Delv_Details_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.BUSINESS_UNIT.ToString, Send_Delv_ERP_Dtls_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.RECEIVER_ID.ToString, Send_Delv_ERP_Dtls_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.RECV_LN_NBR.ToString, Send_Delv_ERP_Dtls_Enum.RECV_LN_NBR, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.RECV_SHIP_SEQ_NBR.ToString, Send_Delv_ERP_Dtls_Enum.RECV_SHIP_SEQ_NBR, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.DISTRIB_LINE_NUM.ToString, Send_Delv_ERP_Dtls_Enum.DISTRIB_LINE_NUM, "System.String", "N", "Y", "N"}, _
               {Send_Delv_ERP_Dtls_Enum.DELIVERED_TO.ToString, Send_Delv_ERP_Dtls_Enum.DELIVERED_TO, "System.String", "N", "Y", "N"}}


    Public Shared Delv_HandOver_Dtls_Defns(,) As String = _
             {{Delv_HandOver_Dtls_Enum.FROM_USER.ToString, Delv_HandOver_Dtls_Enum.FROM_USER, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.TO_USER.ToString, Delv_HandOver_Dtls_Enum.TO_USER, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.HANDOVER_TO_LOC.ToString, Delv_HandOver_Dtls_Enum.HANDOVER_TO_LOC, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.PO_ID.ToString, Delv_HandOver_Dtls_Enum.PO_ID, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.LOCATION.ToString, Delv_HandOver_Dtls_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.LOCATION_DESCR.ToString, Delv_HandOver_Dtls_Enum.LOCATION_DESCR, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.TRACKING_NO.ToString, Delv_HandOver_Dtls_Enum.TRACKING_NO, "System.String", "N", "Y", "N"}, _
              {Delv_HandOver_Dtls_Enum.TRANSACTION_ID.ToString, Delv_HandOver_Dtls_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}
#End Region

#Region "Pharmacy"



    Public Shared Get_Pharmacy_Delv_Header_Input_Defns(,) As String = _
                {{Get_Pharmacy_Delv_Header_Input_Enum.ORDERNO.ToString, Get_Pharmacy_Delv_Header_Input_Enum.ORDERNO, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.DELVUSER.ToString, Get_Pharmacy_Delv_Header_Input_Enum.DELVUSER, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.FROM_DATE.ToString, Get_Pharmacy_Delv_Header_Input_Enum.FROM_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.TO_DATE.ToString, Get_Pharmacy_Delv_Header_Input_Enum.TO_DATE, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.ORG_GROUP_ID.ToString, Get_Pharmacy_Delv_Header_Input_Enum.ORG_GROUP_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.REDELIVER.ToString, Get_Pharmacy_Delv_Header_Input_Enum.REDELIVER, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Header_Input_Enum.REDELIVERPOPUP.ToString, Get_Pharmacy_Delv_Header_Input_Enum.REDELIVERPOPUP, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pharmacy_Delv_PreReqData_Defns(,) As String = _
            {{Get_Pharmacy_Delv_PreReqData_Enum.DELV_RCPT_PRINT_NT_PRINTER.ToString, Get_Pharmacy_Delv_PreReqData_Enum.DELV_RCPT_PRINT_NT_PRINTER, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_PreReqData_Enum.DELV_RECEIPT_EMAIL.ToString, Get_Pharmacy_Delv_PreReqData_Enum.DELV_RECEIPT_EMAIL, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Pharmacy_Delv_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Pharmacy_Delv_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pharmacy_Delv_Detail_ListView_Reqparams_Defns(,) As String = _
            {{Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_1.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_1, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_2.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_2, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_3.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_4.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_4, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_5.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.KEY_5, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.INV_ITEM_ID.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.DESCR.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.DESCR, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.INFO_1.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.INFO_1, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.QTY.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.QTY, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.STATUS.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.STATUS, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.TRANSACTION_ID.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.UOM.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.UOM, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.UPC_ID.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.VENDOR_ITEM_ID.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_4.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_4, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_6.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_6, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_7.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.REPORT_DATA_7, "System.String", "N", "Y", "N"}, _
            {Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.PRICE.ToString, Get_Pharmacy_Delv_Detail_ListView_Reqparams_Enum.PRICE, "System.String", "N", "Y", "N"}}



    Public Shared Get_Pharmacy_Delv_Transactions_Defns(,) As String = _
         {{Get_Pharmacy_Delv_Header_Transactions_Enum.TRANSACTION_ID.ToString, Get_Pharmacy_Delv_Header_Transactions_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pharmacy_Delv_Header_Locations_Defns(,) As String = _
        {{Get_Pharmacy_Delv_Header_Locations_Enum.LOCATION.ToString, Get_Pharmacy_Delv_Header_Locations_Enum.LOCATION, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pharmacy_Delv_BusinessUnits_Defns(,) As String = _
         {{Get_Pharmacy_Delv_Header_BusinessUnits_Enum.BUSINESS_UNIT.ToString, Get_Pharmacy_Delv_Header_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Pharmacy_Delv_Header_Output_Defns(,) As String = _
              {{Get_Pharmacy_Delv_Header_Output_Enum.TRANSACTION_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ORDERED_UOM.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ORDERED_UOM, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.LOCATION.ToString, Get_Pharmacy_Delv_Header_Output_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.DESCR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.DESCR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS1.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS1, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS2.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS2, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS3.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS3, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS4.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ADDRESS4, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.CITY.ToString, Get_Pharmacy_Delv_Header_Output_Enum.CITY, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.STATE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.STATE, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.COUNTRY.ToString, Get_Pharmacy_Delv_Header_Output_Enum.COUNTRY, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.COUNTY.ToString, Get_Pharmacy_Delv_Header_Output_Enum.COUNTY, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ZIP_CODE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ZIP_CODE, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.BUILDING.ToString, Get_Pharmacy_Delv_Header_Output_Enum.BUILDING, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.FLOOR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.FLOOR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.PHONE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.PHONE, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.EXTENSION.ToString, Get_Pharmacy_Delv_Header_Output_Enum.EXTENSION, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.COMMENTS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ATTN_TO.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ATTN_TO, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.BUSINESS_UNIT.ToString, Get_Pharmacy_Delv_Header_Output_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ILOCATION.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ILOCATION, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECEIVER_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECEIVER_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECV_LN_NBR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECV_LN_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECV_SHIP_SEQ_NBR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECV_SHIP_SEQ_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.DISTRIB_LINE_NUM.ToString, Get_Pharmacy_Delv_Header_Output_Enum.DISTRIB_LINE_NUM, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.LINE_NBR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.LINE_NBR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.DEPTID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.DEPTID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.INV_ITEM_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.QTY.ToString, Get_Pharmacy_Delv_Header_Output_Enum.QTY, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.IDESCR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.IDESCR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.UPC_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.UPC_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_ITEM_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.MFG_ITEM_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.MFG_ITEM_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECEIVE_UOM.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECEIVE_UOM, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ORDERNO.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ORDERNO, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.SHIPTO_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECV_STATUS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECV_STATUS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_NAME.ToString, Get_Pharmacy_Delv_Header_Output_Enum.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.RECEIPT_DT.ToString, Get_Pharmacy_Delv_Header_Output_Enum.RECEIPT_DT, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.BILL_OF_LADING.ToString, Get_Pharmacy_Delv_Header_Output_Enum.BILL_OF_LADING, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.DUE_DT.ToString, Get_Pharmacy_Delv_Header_Output_Enum.DUE_DT, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.STMT_COMMENTS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.STMT_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.REQUESTOR_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.REQUESTOR_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.LINE_COMMENTS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.LINE_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.FAX.ToString, Get_Pharmacy_Delv_Header_Output_Enum.FAX, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.ZIP.ToString, Get_Pharmacy_Delv_Header_Output_Enum.ZIP, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.UOM.ToString, Get_Pharmacy_Delv_Header_Output_Enum.UOM, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.STATUS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.STATUS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.TRKNBR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.TRKNBR, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.AUTH_PERSONS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.AUTH_PERSONS, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.AUTH_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.AUTH_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.AUTH_NAME.ToString, Get_Pharmacy_Delv_Header_Output_Enum.AUTH_NAME, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.EMAIL.ToString, Get_Pharmacy_Delv_Header_Output_Enum.EMAIL, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.CARRIERID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.CARRIERID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.DLVDTO.ToString, Get_Pharmacy_Delv_Header_Output_Enum.DLVDTO, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.USER_ID.ToString, Get_Pharmacy_Delv_Header_Output_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.STATUS_CODE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
               {Get_Pharmacy_Delv_Header_Output_Enum.CANCELLED_STATUS.ToString, Get_Pharmacy_Delv_Header_Output_Enum.CANCELLED_STATUS, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.TYPE_OF_PACKAGE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.TYPE_OF_PACKAGE, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.PRICE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.PRICE, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.PALLETNO.ToString, Get_Pharmacy_Delv_Header_Output_Enum.PALLETNO, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.SECTOR.ToString, Get_Pharmacy_Delv_Header_Output_Enum.SECTOR, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.EVERIFY_FLAG.ToString, Get_Pharmacy_Delv_Header_Output_Enum.EVERIFY_FLAG, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.EXPIRY_DATE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}, _
              {Get_Pharmacy_Delv_Header_Output_Enum.MEDICINE.ToString, Get_Pharmacy_Delv_Header_Output_Enum.MEDICINE, "System.String", "N", "Y", "N"}}


    Public Shared Get_Pharmacy_Delv_Output_Status_Defns(,) As String = _
           {{Get_Pharmacy_Delv_Output_Status_Enum.STATUS_CODE.ToString, Get_Pharmacy_Delv_Output_Status_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
           {Get_Pharmacy_Delv_Output_Status_Enum.STATUS_DESCR.ToString, Get_Pharmacy_Delv_Output_Status_Enum.STATUS_DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Pharmacy_Delv_Output_Status_Enum.MULTIPLE_LOCATIONS.ToString, Get_Pharmacy_Delv_Output_Status_Enum.MULTIPLE_LOCATIONS, "System.String", "N", "Y", "N"}, _
           {Get_Pharmacy_Delv_Output_Status_Enum.TRANSACTION_ID.ToString, Get_Pharmacy_Delv_Output_Status_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
           {Get_Pharmacy_Delv_Output_Status_Enum.OLD_TRANSACTION_ID.ToString, Get_Pharmacy_Delv_Output_Status_Enum.OLD_TRANSACTION_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_Pharmacy_Delv_Details_Defns(,) As String = _
              {{Send_Pharmacy_Delv_Details_Enum.TRANSACTION_ID.ToString, Send_Pharmacy_Delv_Details_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.PRINTER_ADDRESS.ToString, Send_Pharmacy_Delv_Details_Enum.PRINTER_ADDRESS, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.EMAIL_FLAG.ToString, Send_Pharmacy_Delv_Details_Enum.EMAIL_FLAG, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.ATTEMPT_DATE.ToString, Send_Pharmacy_Delv_Details_Enum.ATTEMPT_DATE, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.ATTEMPT_COMMENTS.ToString, Send_Pharmacy_Delv_Details_Enum.ATTEMPT_COMMENTS, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.TRACKING_NBR.ToString, Send_Pharmacy_Delv_Details_Enum.TRACKING_NBR, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.CARRIER_ID.ToString, Send_Pharmacy_Delv_Details_Enum.CARRIER_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.LOCATION.ToString, Send_Pharmacy_Delv_Details_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.DELIVER_TO.ToString, Send_Pharmacy_Delv_Details_Enum.DELIVER_TO, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.DELIVERY_LOCATION.ToString, Send_Pharmacy_Delv_Details_Enum.DELIVERY_LOCATION, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.RECEIVER.ToString, Send_Pharmacy_Delv_Details_Enum.RECEIVER, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.VENDOR_NAME.ToString, Send_Pharmacy_Delv_Details_Enum.VENDOR_NAME, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.DESCR.ToString, Send_Pharmacy_Delv_Details_Enum.DESCR, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.DEPT_ID.ToString, Send_Pharmacy_Delv_Details_Enum.DEPT_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.KEY_3.ToString, Send_Pharmacy_Delv_Details_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.LINE_NO.ToString, Send_Pharmacy_Delv_Details_Enum.LINE_NO, "System.String", "N", "Y", "N"}, _
                {Send_Pharmacy_Delv_Details_Enum.SHIPTO_ID.ToString, Send_Pharmacy_Delv_Details_Enum.SHIPTO_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.TYPE_OF_PACKAGE.ToString, Send_Pharmacy_Delv_Details_Enum.TYPE_OF_PACKAGE, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.COMMENTS.ToString, Send_Pharmacy_Delv_Details_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.EVENT_ID.ToString, Send_Pharmacy_Delv_Details_Enum.EVENT_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.UPDATE_DATE.ToString, Send_Pharmacy_Delv_Details_Enum.UPDATE_DATE, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.USER_ID.ToString, Send_Pharmacy_Delv_Details_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.SIGNATURE_ID.ToString, Send_Pharmacy_Delv_Details_Enum.SIGNATURE_ID, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.PICK_ITEM.ToString, Send_Pharmacy_Delv_Details_Enum.PICK_ITEM, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.NONPO_ITEM.ToString, Send_Pharmacy_Delv_Details_Enum.NONPO_ITEM, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.LOC_DESCR.ToString, Send_Pharmacy_Delv_Details_Enum.LOC_DESCR, "System.String", "N", "Y", "N"}, _
               {Send_Pharmacy_Delv_Details_Enum.EXPIRY_DATE.ToString, Send_Pharmacy_Delv_Details_Enum.EXPIRY_DATE, "System.String", "N", "Y", "N"}}


    Public Shared Pharmacy_Delv_HandOver_Dtls_Defns(,) As String = _
             {{Pharmacy_Delv_HandOver_Dtls_Enum.FROM_USER.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.FROM_USER, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.TO_USER.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.TO_USER, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.HANDOVER_TO_LOC.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.HANDOVER_TO_LOC, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.ORDERNO.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.ORDERNO, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.LOCATION.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.LOCATION_DESCR.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.LOCATION_DESCR, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.TRACKING_NO.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.TRACKING_NO, "System.String", "N", "Y", "N"}, _
              {Pharmacy_Delv_HandOver_Dtls_Enum.TRANSACTION_ID.ToString, Pharmacy_Delv_HandOver_Dtls_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}}
#End Region

#Region "AssetManagement"
    Public Shared Get_Asmt_Params_Defns(,) As String = _
     {{Get_Asmt_Header_PreReqData_Enum.LOCATION_ALLOCATION.ToString, Get_Asmt_Header_PreReqData_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
       {Get_Asmt_Header_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Cart_Header_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
       {Get_Asmt_Header_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Cart_Header_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}}

    Public Shared Get_Asmt_BusinessUnits_Defns(,) As String = _
     {{Get_Asmt_Header_BusinessUnits_Enum.BUSINESS_UNIT.ToString, Get_Asmt_Header_BusinessUnits_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}}

    Public Shared Get_Asmt_Header_Output_Locations(,) As String = _
        {{Get_Asmt_Header_Output.LOCATION.ToString, Get_Asmt_Header_Output.LOCATION, "System.String", "N", "Y", "N"}, _
         {Get_Asmt_Header_Output.SETID.ToString, Get_Asmt_Header_Output.SETID, "System.String", "N", "Y", "N"}, _
		 {Get_Asmt_Header_Output.BUSINESS_UNIT.ToString, Get_Asmt_Header_Output.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
         {Get_Asmt_Header_Output.DESCR.ToString, Get_Asmt_Header_Output.DESCR, "System.String", "N", "Y", "N"}}

	Public Shared Get_Asmt_PreReqData_Defns(,) As String = _
		{{Get_Asmt_PreReqData_Enum.LOCATION_ALLOCATION.ToString, Get_Asmt_PreReqData_Enum.LOCATION_ALLOCATION, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_PreReqData_Enum.REMOTE_SCHEMA.ToString, Get_Asmt_PreReqData_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_PreReqData_Enum.REMOTE_DB_TYPE.ToString, Get_Asmt_PreReqData_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_PreReqData_Enum.BUSINESS_UNIT.ToString, Get_Asmt_PreReqData_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_PreReqData_Enum.LOCATION.ToString, Get_Asmt_PreReqData_Enum.LOCATION, "System.String", "N", "Y", "N"}}

    Public Shared Get_Asmt_Detail_Defns(,) As String = _
     {{Get_Asmt_Detail_Defns_Enum.USER_ID.ToString, Get_Asmt_Detail_Defns_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
     {Get_Asmt_Detail_Defns_Enum.BUSINESS_UNIT.ToString, Get_Asmt_Detail_Defns_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
     {Get_Asmt_Detail_Defns_Enum.LOCATION.ToString, Get_Asmt_Detail_Defns_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
     {Get_Asmt_Detail_Defns_Enum.SETID.ToString, Get_Asmt_Detail_Defns_Enum.SETID, "System.String", "N", "Y", "N"}, _
     {Get_Asmt_Detail_Defns_Enum.TRANSACTION_ID.ToString, Get_Asmt_Detail_Defns_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}, _
     {Get_Asmt_Detail_Defns_Enum.DESCR.ToString, Get_Asmt_Detail_Defns_Enum.DESCR, "System.String", "N", "Y", "N"}}

	Public Shared Get_Asmt_Detail_ListView_RequiredParams(,) As String = _
		{{Get_Asmt_Detail_ListView_Reqparams_Enum.TRANSACTION_ID.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_1.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_1, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_2.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_2, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_3.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_3, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_4.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.KEY_4, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_1_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_1_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_2_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_2_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_3_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_3_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_4_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_4_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_5.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_5, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_6_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_6_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_7_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_7_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_8_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_8_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_9_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_9_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_10_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.REPORT_DATA_10_NEW, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.COMMENTS.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
		{Get_Asmt_Detail_ListView_Reqparams_Enum.AREA_ID_NEW.ToString, Get_Asmt_Detail_ListView_Reqparams_Enum.AREA_ID_NEW, "System.String", "N", "Y", "N"}}

    Public Shared Get_Asmt_DetailOutput_Header_Defns(,) As String = _
          {{Get_Asmt_Detail_Output_Header_Enum.USER_ID.ToString, Get_Asmt_Detail_Output_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Output_Header_Enum.BUSINESS_UNIT.ToString, Get_Asmt_Detail_Output_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Output_Header_Enum.LOCATION.ToString, Get_Asmt_Detail_Output_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Output_Header_Enum.SETID.ToString, Get_Asmt_Detail_Output_Header_Enum.SETID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Output_Header_Enum.TRANSACTION_ID.ToString, Get_Asmt_Detail_Output_Header_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}}

    Public Shared Get_Asmt_DetailOutput_Details_Defns(,) As String = _
           {{Get_Asmt_Detail_Enum.PI_ID.ToString, Get_Asmt_Detail_Enum.PI_ID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.PI_LINE_NUM.ToString, Get_Asmt_Detail_Enum.PI_LINE_NUM, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.ASSET_ID.ToString, Get_Asmt_Detail_Enum.ASSET_ID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.CUSTODIAN.ToString, Get_Asmt_Detail_Enum.CUSTODIAN, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.DEPTID.ToString, Get_Asmt_Detail_Enum.DEPTID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.TAG_NUMBER.ToString, Get_Asmt_Detail_Enum.TAG_NUMBER, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.SERIAL_ID.ToString, Get_Asmt_Detail_Enum.SERIAL_ID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.LOCATION.ToString, Get_Asmt_Detail_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.EMPLID.ToString, Get_Asmt_Detail_Enum.EMPLID, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.DESCR.ToString, Get_Asmt_Detail_Enum.DESCR, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.MANUFACTURER.ToString, Get_Asmt_Detail_Enum.MANUFACTURER, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.MODEL.ToString, Get_Asmt_Detail_Enum.MODEL, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.TRANSACTION_ID.ToString, Get_Asmt_Detail_Enum.TRANSACTION_ID, "System.Int64", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.COMMENTS.ToString, Get_Asmt_Detail_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
           {Get_Asmt_Detail_Enum.AREA_ID.ToString, Get_Asmt_Detail_Enum.AREA_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_Asmt_Header_Defns(,) As String = _
             {{Send_Asmt_Header_Enum.TRANSACTION_ID.ToString, Send_Asmt_Header_Enum.TRANSACTION_ID, "System.String", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.LOCATION.ToString, Send_Asmt_Header_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.START_DATETIME.ToString, Send_Asmt_Header_Enum.START_DATETIME, "System.String", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.END_DATETIME.ToString, Send_Asmt_Header_Enum.END_DATETIME, "System.String", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.USER_ID.ToString, Send_Asmt_Header_Enum.USER_ID, "System.String", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.TOTAL_RECORDS.ToString, Send_Asmt_Header_Enum.TOTAL_RECORDS, "System.Int32", "N", "Y", "N"}, _
             {Send_Asmt_Header_Enum.NO_OF_REVISED.ToString, Send_Asmt_Header_Enum.NO_OF_REVISED, "System.Int32", "N", "Y", "N"}}


    Public Shared Send_Asmt_Details_Defns(,) As String = _
            {{Send_Asmt_Details_Enum.KEY_1.ToString, Send_Asmt_Details_Enum.KEY_1, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.KEY_2.ToString, Send_Asmt_Details_Enum.KEY_2, "System.Int64", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_1.ToString, Send_Asmt_Details_Enum.REPORT_DATA_1, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_1_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_1_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_2.ToString, Send_Asmt_Details_Enum.REPORT_DATA_2, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_2_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_2_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_3.ToString, Send_Asmt_Details_Enum.REPORT_DATA_3, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_3_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_3_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_4.ToString, Send_Asmt_Details_Enum.REPORT_DATA_4, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_4_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_4_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_5.ToString, Send_Asmt_Details_Enum.REPORT_DATA_5, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_6.ToString, Send_Asmt_Details_Enum.REPORT_DATA_6, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_6_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_6_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_7.ToString, Send_Asmt_Details_Enum.REPORT_DATA_7, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_7_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_7_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_8.ToString, Send_Asmt_Details_Enum.REPORT_DATA_8, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_8_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_8_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_9.ToString, Send_Asmt_Details_Enum.REPORT_DATA_9, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_9_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_9_NEW, "System.String", "N", "Y", "N"}, _
            {Send_Asmt_Details_Enum.REPORT_DATA_10.ToString, Send_Asmt_Details_Enum.REPORT_DATA_10, "System.String", "N", "Y", "N"}, _
     {Send_Asmt_Details_Enum.REPORT_DATA_10_NEW.ToString, Send_Asmt_Details_Enum.REPORT_DATA_10_NEW, "System.String", "N", "Y", "N"}, _
     {Send_Asmt_Details_Enum.COMMENTS.ToString, Send_Asmt_Details_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
     {Send_Asmt_Details_Enum.AREA_ID.ToString, Send_Asmt_Details_Enum.AREA_ID, "System.String", "N", "Y", "N"}, _
     {Send_Asmt_Details_Enum.AREA_ID_NEW.ToString, Send_Asmt_Details_Enum.AREA_ID_NEW, "System.String", "N", "Y", "N"}, _
	 {Send_Asmt_Details_Enum.TRANSACTION_ID_OLD.ToString, Send_Asmt_Details_Enum.TRANSACTION_ID_OLD, "System.String", "N", "Y", "N"}}


    Public Shared Send_Asmt_Output_Defns(,) As String = _
        {{Send_Asmt_Output_Enum.STATUS_CODE.ToString, Send_Asmt_Output_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Send_Asmt_Output_Enum.STATUS_DESCR.ToString, Send_Asmt_Output_Enum.STATUS_DESCR, "System.String", "N", "Y", "N"}}

	Public Shared Send_Asmt_BusinessRules_Defns(,) As String = _
        {{Send_Asmt_BusinessRules_Enum.REMOTE_SCHEMA.ToString, Send_Asmt_BusinessRules_Enum.REMOTE_SCHEMA, "System.String", "N", "Y", "N"}, _
        {Send_Asmt_BusinessRules_Enum.REMOTE_DB_TYPE.ToString, Send_Asmt_BusinessRules_Enum.REMOTE_DB_TYPE, "System.String", "N", "Y", "N"}, _
		{Send_Asmt_BusinessRules_Enum.TRANSACTION_STATUS.ToString, Send_Asmt_BusinessRules_Enum.TRANSACTION_STATUS, "System.String", "N", "Y", "N"}, _
        {Send_Asmt_BusinessRules_Enum.STATUS_CODE.ToString, Send_Asmt_BusinessRules_Enum.STATUS_CODE, "System.String", "N", "Y", "N"}, _
        {Send_Asmt_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_Asmt_BusinessRules_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {Send_Asmt_BusinessRules_Enum.ENTERPRISE_VERSION.ToString, Send_Asmt_BusinessRules_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}}
#End Region

#Region "Helper functions"
    ''' <summary>
    ''' Create a Table definition for transporting data between client and server, typically HEADERS/OUTPUT/PREREQ etc
    ''' </summary>
    ''' <param name="pTableDefn">A 2-D string array defining the rules for the table (e.g. SendPO_Receive_Header_Defns) </param>
    ''' <param name="pTableType">Name of the datatable (Should be DataTypes_Enum.tablename.Tostring)</param>
    ''' <returns>A new DataTable</returns>
    ''' <example>
    ''' <code>
    ''' Dim receive_header_dt As DataTable
    ''' Try
    ''' receive_header_dt = CreateAtParTableDefn(SendPO_Receive_Header_Defns, DataSet_Type.HEADERS.ToString)
    ''' Catch ex As Exception
    ''' Fatal Log Message
    ''' if log.IsFataEnabled then log.Fatal("Failed to Create Header Ds")
    ''' Return E_SERVERERROR
    ''' End Try
    ''' </code>
    ''' </example>
    ''' <remarks></remarks>
    Public Shared Function CreateAtParTableDefn(ByVal pTableDefn As String(,), _
                                                ByVal pTableType As String) As DataTable
        Try

            Dim _dt As DataTable = New DataTable(pTableType)
            Dim k As Short = 1

            For i As Integer = 0 To pTableDefn.GetLength(0) - 1
                If pTableDefn(i, TableCols.PRIMARY_KEY) = "Y" Then
                    k += 1
                End If
            Next

            Dim _dC(k) As DataColumn
            k = 0
            For i As Integer = 0 To pTableDefn.GetLength(0) - 1

                _dt.Columns.Add(AddDataColumn(pTableDefn(i, TableCols.FRIENDLY_NAME), _
                                              pTableDefn(i, TableCols.XML_TAG_ID), _
                                              pTableDefn(i, TableCols.DATA_TYPE), _
                                              pTableDefn(i, TableCols.UNIQUE), _
                                              pTableDefn(i, TableCols.ALLOW_NULL)))
                If pTableDefn(i, TableCols.PRIMARY_KEY) = "Y" Then
                    _dC(k) = _dt.Columns(i)
                    k += 1
                End If
            Next

            _dt.PrimaryKey = _dC

            Return _dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    ''' <summary>
    ''' Create a new data column based on the given inputs
    ''' </summary>
    ''' <param name="FriendlyName">Sets Friendly Name to the Caption Property of the Column</param>
    ''' <param name="XMLTagID">Column name (referenced by the enum variable)</param>
    ''' <param name="DataType"></param>
    ''' <param name="Unique">Unique - "Y", Not unique - "N" - stored internally as a bool</param>
    ''' <param name="AllowNull">AllowNull - "Y", don't allow null - "N" - stored internally as a bool</param>
    ''' <returns>a new Datacolumn</returns>
    ''' <remarks>This function should be called by CreateAtParTableDefn</remarks>
    Private Shared Function AddDataColumn(ByVal FriendlyName As String, _
                                     ByVal XMLTagID As String, _
                                     ByVal DataType As String, _
                                     ByVal Unique As String, _
                                     ByVal AllowNull As String) As DataColumn
        Try

            Dim column As DataColumn
            column = New DataColumn()
            column.Caption = FriendlyName
            column.DataType = System.Type.GetType(DataType)
            column.ColumnName = XMLTagID
            column.AllowDBNull = IIf(AllowNull = "Y", True, False)
            column.Unique = IIf(Unique = "Y", True, False)

            AddDataColumn = column
        Catch ex As Exception
            Throw ex
        End Try

    End Function

#End Region

#Region "NiceLabel Printing"

    Public Shared Print_Receive_Header_Defns(,) As String = _
    {{PrintLabel_Receive_HEADER.BUSINESS_UNIT.ToString, PrintLabel_Receive_HEADER.BUSINESS_UNIT.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.TRACKING_NO.ToString, PrintLabel_Receive_HEADER.TRACKING_NO.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.LOCATION_ID.ToString, PrintLabel_Receive_HEADER.LOCATION_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.LOCATION_DESCR.ToString, PrintLabel_Receive_HEADER.LOCATION_DESCR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.DELIVER_TO_NAME.ToString, PrintLabel_Receive_HEADER.DELIVER_TO_NAME.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.PO_ID.ToString, PrintLabel_Receive_HEADER.PO_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.SHIPTO_ID.ToString, PrintLabel_Receive_HEADER.SHIPTO_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.INSPECTION_FLAG.ToString, PrintLabel_Receive_HEADER.INSPECTION_FLAG.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.DROP_SHIP_FLAG.ToString, PrintLabel_Receive_HEADER.DROP_SHIP_FLAG.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.NO_OF_BOXES.ToString, PrintLabel_Receive_HEADER.NO_OF_BOXES.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.USER_ID.ToString, PrintLabel_Receive_HEADER.USER_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.ADDRESS1.ToString, PrintLabel_Receive_HEADER.ADDRESS1.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.ADDRESS2.ToString, PrintLabel_Receive_HEADER.ADDRESS2.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.ADDRESS3.ToString, PrintLabel_Receive_HEADER.ADDRESS3.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.PHONE.ToString, PrintLabel_Receive_HEADER.PHONE.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.COMMENTS.ToString, PrintLabel_Receive_HEADER.COMMENTS.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.REQ_NUM.ToString, PrintLabel_Receive_HEADER.REQ_NUM.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.BUILDING.ToString, PrintLabel_Receive_HEADER.BUILDING.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.FLOOR.ToString, PrintLabel_Receive_HEADER.FLOOR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.SECTOR.ToString, PrintLabel_Receive_HEADER.SECTOR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.REQUISITION_NAME.ToString, PrintLabel_Receive_HEADER.REQUISITION_NAME.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_HEADER.BUYER_NAME.ToString, PrintLabel_Receive_HEADER.BUYER_NAME.ToString, "System.String", "N", "Y", "N"}}

    Public Shared Print_Receive_Header_Stock_Defns(,) As String = _
   {{PrintLabel_Receive_HEADER_STOCK.BUSINESS_UNIT.ToString, PrintLabel_Receive_HEADER_STOCK.BUSINESS_UNIT.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.TRACKING_NO.ToString, PrintLabel_Receive_HEADER_STOCK.TRACKING_NO.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.DELIVER_TO_NAME.ToString, PrintLabel_Receive_HEADER_STOCK.DELIVER_TO_NAME.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.PO_ID.ToString, PrintLabel_Receive_HEADER_STOCK.PO_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.SHIPTO_ID.ToString, PrintLabel_Receive_HEADER_STOCK.SHIPTO_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.INSPECTION_FLAG.ToString, PrintLabel_Receive_HEADER_STOCK.INSPECTION_FLAG.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.DROP_SHIP_FLAG.ToString, PrintLabel_Receive_HEADER_STOCK.DROP_SHIP_FLAG.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.NO_OF_BOXES.ToString, PrintLabel_Receive_HEADER_STOCK.NO_OF_BOXES.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.USER_ID.ToString, PrintLabel_Receive_HEADER_STOCK.USER_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.BUSINESS_UNIT_IN.ToString, PrintLabel_Receive_HEADER_STOCK.BUSINESS_UNIT_IN.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.REQ_NUM.ToString, PrintLabel_Receive_HEADER_STOCK.REQ_NUM.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.LOCATION_ID.ToString, PrintLabel_Receive_HEADER_STOCK.LOCATION_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_HEADER_STOCK.LOCATION_DESCR.ToString, PrintLabel_Receive_HEADER_STOCK.LOCATION_DESCR.ToString, "System.String", "N", "Y", "N"}}


    Public Shared PrintLabel_Receive_NONPO_Defns(,) As String = _
    {{PrintLabel_Receive_NONPO.BUSINESS_UNIT.ToString, PrintLabel_Receive_NONPO.BUSINESS_UNIT.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.TRACKING_NO.ToString, PrintLabel_Receive_NONPO.TRACKING_NO.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.LOCATION_ID.ToString, PrintLabel_Receive_NONPO.LOCATION_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.LOCATION_DESCR.ToString, PrintLabel_Receive_NONPO.LOCATION_DESCR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.DELIVER_TO_NAME.ToString, PrintLabel_Receive_NONPO.DELIVER_TO_NAME.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.PO_ID.ToString, PrintLabel_Receive_NONPO.PO_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.SHIPTO_ID.ToString, PrintLabel_Receive_NONPO.SHIPTO_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.DEPT_ID.ToString, PrintLabel_Receive_NONPO.DEPT_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.VENDOR.ToString, PrintLabel_Receive_NONPO.VENDOR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.PKG_TYPE.ToString, PrintLabel_Receive_NONPO.PKG_TYPE.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.CARRIER.ToString, PrintLabel_Receive_NONPO.CARRIER.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.LINE_NO.ToString, PrintLabel_Receive_NONPO.LINE_NO.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.ITEM_ID.ToString, PrintLabel_Receive_NONPO.ITEM_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.ITEM_DESCR.ToString, PrintLabel_Receive_NONPO.ITEM_DESCR.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.USER_ID.ToString, PrintLabel_Receive_NONPO.USER_ID.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.NO_OF_BOXES.ToString, PrintLabel_Receive_NONPO.NO_OF_BOXES.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.PHONE_NO.ToString, PrintLabel_Receive_NONPO.PHONE_NO.ToString, "System.String", "N", "Y", "N"}, _
    {PrintLabel_Receive_NONPO.COMMENTS.ToString, PrintLabel_Receive_NONPO.COMMENTS.ToString, "System.String", "N", "Y", "N"}}


    Public Shared PrintLabel_Receive_DETAIL_Defns(,) As String = _
   {{PrintLabel_Receive_DETAIL.BUSINESS_UNIT.ToString, PrintLabel_Receive_DETAIL.BUSINESS_UNIT.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.TRACKING_NO.ToString, PrintLabel_Receive_DETAIL.TRACKING_NO.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.LOCATION_ID.ToString, PrintLabel_Receive_DETAIL.LOCATION_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.LOCATION_DESCR.ToString, PrintLabel_Receive_DETAIL.LOCATION_DESCR.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.DELIVER_TO_NAME.ToString, PrintLabel_Receive_DETAIL.DELIVER_TO_NAME.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.PO_ID.ToString, PrintLabel_Receive_DETAIL.PO_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.SHIPTO_ID.ToString, PrintLabel_Receive_DETAIL.SHIPTO_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.ITEM_ID.ToString, PrintLabel_Receive_DETAIL.ITEM_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.MANF_ITEM_ID.ToString, PrintLabel_Receive_DETAIL.MANF_ITEM_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.VENDOR_ITEM_ID.ToString, PrintLabel_Receive_DETAIL.VENDOR_ITEM_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.UPC_ID.ToString, PrintLabel_Receive_DETAIL.UPC_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.CUST_ITEM_NO.ToString, PrintLabel_Receive_DETAIL.CUST_ITEM_NO.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.GTIN.ToString, PrintLabel_Receive_DETAIL.GTIN.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.ITEM_DESCR.ToString, PrintLabel_Receive_DETAIL.ITEM_DESCR.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.INSPECTION_FLAG.ToString, PrintLabel_Receive_DETAIL.INSPECTION_FLAG.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.DROP_SHIP_FLAG.ToString, PrintLabel_Receive_DETAIL.DROP_SHIP_FLAG.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.RECEIVED_QTY.ToString, PrintLabel_Receive_DETAIL.RECEIVED_QTY.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.RECEIVE_UOM.ToString, PrintLabel_Receive_DETAIL.RECEIVE_UOM.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.CONVERSION_RATE.ToString, PrintLabel_Receive_DETAIL.CONVERSION_RATE.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.NO_OF_BOXES.ToString, PrintLabel_Receive_DETAIL.NO_OF_BOXES.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.USER_ID.ToString, PrintLabel_Receive_DETAIL.USER_ID.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.ADDRESS1.ToString, PrintLabel_Receive_DETAIL.ADDRESS1.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.ADDRESS2.ToString, PrintLabel_Receive_DETAIL.ADDRESS2.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.ADDRESS3.ToString, PrintLabel_Receive_DETAIL.ADDRESS3.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.BUSINESS_UNIT_IN.ToString, PrintLabel_Receive_DETAIL.BUSINESS_UNIT_IN.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.RECEIPT_DT.ToString, PrintLabel_Receive_DETAIL.RECEIPT_DT.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.REQ_NUM.ToString, PrintLabel_Receive_DETAIL.REQ_NUM.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.COMMENTS.ToString, PrintLabel_Receive_DETAIL.COMMENTS.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.PACKAGING_STRING.ToString, PrintLabel_Receive_DETAIL.PACKAGING_STRING.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.REQUISITION_NAME.ToString, PrintLabel_Receive_DETAIL.REQUISITION_NAME.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.BUYER_NAME.ToString, PrintLabel_Receive_DETAIL.BUYER_NAME.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.BUILDING.ToString, PrintLabel_Receive_DETAIL.BUILDING.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.FLOOR.ToString, PrintLabel_Receive_DETAIL.FLOOR.ToString, "System.String", "N", "Y", "N"}, _
   {PrintLabel_Receive_DETAIL.SECTOR.ToString, PrintLabel_Receive_DETAIL.SECTOR.ToString, "System.String", "N", "Y", "N"}}

#End Region

#Region "CI_Send"
    Public Shared Send_CI_PreReq_Defns(,) As String = _
        {{Send_CI_PreReq_Enum.ENTERPRISE_SYSTEM_NAME.ToString, Send_CI_PreReq_Enum.ENTERPRISE_SYSTEM_NAME, "System.String", "N", "Y", "N"}, _
        {Send_CI_PreReq_Enum.ENTERPRISE_VERSION.ToString, Send_CI_PreReq_Enum.ENTERPRISE_VERSION, "System.String", "N", "Y", "N"}, _
        {Send_CI_PreReq_Enum.CATEGORY_CD.ToString, Send_CI_PreReq_Enum.CATEGORY_CD, "System.String", "N", "Y", "N"}, _
        {Send_CI_PreReq_Enum.LOCATION.ToString, Send_CI_PreReq_Enum.LOCATION, "System.String", "N", "Y", "N"}, _
        {Send_CI_PreReq_Enum.COMPONENT_NAME.ToString, Send_CI_PreReq_Enum.COMPONENT_NAME, "System.String", "N", "Y", "N"}, _
         {Send_CI_PreReq_Enum.BUYER_ID.ToString, Send_CI_PreReq_Enum.BUYER_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_CI_Header_Defns(,) As String = _
        {{Send_CI_Header_Enum.BUSINESS_UNIT.ToString, Send_CI_Header_Enum.BUSINESS_UNIT, "System.String", "N", "Y", "N"}, _
        {Send_CI_Header_Enum.PO_REF.ToString, Send_CI_Header_Enum.PO_REF, "System.String", "N", "Y", "N"}, _
        {Send_CI_Header_Enum.VENDOR_ID.ToString, Send_CI_Header_Enum.VENDOR_ID, "System.String", "N", "Y", "N"}}

    Public Shared Send_CI_Detail_Defns(,) As String = _
        {{Send_CI_Detail_Enum.INV_ITEM_ID.ToString, Send_CI_Detail_Enum.INV_ITEM_ID, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.QTY_PO.ToString, Send_CI_Detail_Enum.QTY_PO, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.UOM.ToString, Send_CI_Detail_Enum.UOM, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.DESCR.ToString, Send_CI_Detail_Enum.DESCR, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.PRICE.ToString, Send_CI_Detail_Enum.PRICE, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.PROCESS_TYPE.ToString, Send_CI_Detail_Enum.PROCESS_TYPE, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.LINE_NBR.ToString, Send_CI_Detail_Enum.LINE_NBR, "System.Int32", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.COMMENTS.ToString, Send_CI_Detail_Enum.COMMENTS, "System.String", "N", "Y", "N"}, _
        {Send_CI_Detail_Enum.DEPT_ID.ToString, Send_CI_Detail_Enum.DEPT_ID, "System.String", "N", "Y", "N"}}

#End Region
End Class
