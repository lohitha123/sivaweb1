/*  --------------------------------------------------------------------------------------------
	
	Author  : Ajay.S
	Date    : 07/08/2017
	Purpose :
 	Script which creates the ATPAR_SP_POU_REPORTING_DEFAULTS_PATCH30_LAWSON 

--------------------------------------------------------------------------------------------------	
*/



IF object_id('ATPAR_SP_POU_REPORTING_DEFAULTS_PATCH30_LAWSON') IS NOT NULL
DROP PROCEDURE ATPAR_SP_POU_REPORTING_DEFAULTS_PATCH30_LAWSON
GO

CREATE PROCEDURE ATPAR_SP_POU_REPORTING_DEFAULTS_PATCH30_LAWSON
AS
BEGIN
 

	DECLARE @intReturn int
	SET @intReturn =0
IF NOT EXISTS(SELECT MENU_ID FROM MT_ATPAR_MENUS WHERE  APP_ID = 15 AND MENU_ID = 'pou_Preference_Card_Optimization.aspx' AND ENTERPRISE_SYSTEM = 'LAWSON') 
BEGIN
	
	INSERT [MT_ATPAR_MENUS] ([APP_ID], [MENU_ID], [MENU_CODE], [MENU_SUB_GROUP], [ENTERPRISE_SYSTEM], [MENU_NAME], [MENU_SEQ_NO], [AUDIT], 
	[LAST_UPDATE_DATE], [LAST_UPDATE_USER], [LAST_CLIENT_ADDRESS], [ROUTE], [GROUP_ID], [MENUS_FRIENDLYNAME]) 
	VALUES
	(15, N'pou_Preference_Card_Optimization.aspx', N'pou_Preference_Card_Optimization.aspx', N'Reports', N'LAWSON', N'Preference Card Optimization', 46, N'I',
	NULL, NULL, NULL, N'pointofuse/preferencecardoptimization', 4, N'Preference Card Optimization')
END 

IF NOT EXISTS(SELECT MENU_ID FROM MT_ATPAR_MENUS WHERE  APP_ID = 15 AND MENU_ID = 'pou_cost_variance_report.aspx' AND ENTERPRISE_SYSTEM = 'LAWSON') 
BEGIN
	
	INSERT [MT_ATPAR_MENUS] ([APP_ID], [MENU_ID], [MENU_CODE], [MENU_SUB_GROUP], [ENTERPRISE_SYSTEM], [MENU_NAME], [MENU_SEQ_NO], [AUDIT], 
	[LAST_UPDATE_DATE], [LAST_UPDATE_USER], [LAST_CLIENT_ADDRESS], [ROUTE], [GROUP_ID], [MENUS_FRIENDLYNAME]) 
	VALUES
	(15, N'pou_cost_variance_report.aspx', N'pou_cost_variance_report.aspx', N'Reports', N'LAWSON', N'Cost Variance Analysis', 47, N'I',
	NULL, NULL, NULL, N'pointofuse/costvarianceanalysis', 4, N'Cost Variance Analysis')
END 

IF NOT EXISTS(SELECT MENU_ID FROM MT_ATPAR_MENUS WHERE  APP_ID = 15 AND MENU_ID = 'Physician_Bench_Marking.aspx' AND ENTERPRISE_SYSTEM = 'LAWSON') 
BEGIN
	
	INSERT [MT_ATPAR_MENUS] ([APP_ID], [MENU_ID], [MENU_CODE], [MENU_SUB_GROUP], [ENTERPRISE_SYSTEM], [MENU_NAME], [MENU_SEQ_NO], [AUDIT], 
	[LAST_UPDATE_DATE], [LAST_UPDATE_USER], [LAST_CLIENT_ADDRESS], [ROUTE], [GROUP_ID], [MENUS_FRIENDLYNAME]) 
	VALUES
	(15, N'Physician_Bench_Marking.aspx', N'Physician_Bench_Marking.aspx', N'Reports', N'LAWSON', N'Physician Benchmarking', 48, N'I',
	NULL, NULL, NULL, N'pointofuse/physicianbenchmarking', 4, N'Physician Benchmarking')
END 

RETURN @intReturn
ERR_HANDLER:
	SET @intReturn = 1
	PRINT 'Failed in ATPAR_SP_POU_REPORTING_DEFAULTS_PATCH30_LAWSON store procedure returning non zero value ' 
	RETURN @intReturn

END
GO	
