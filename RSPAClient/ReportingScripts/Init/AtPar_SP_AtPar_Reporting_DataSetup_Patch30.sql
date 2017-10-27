/*  --------------------------------------------------------------------------------------------
	AUTHOR  : AJAY.S
	DATE    : 07/08/2017
	Purpose :
 	Script which creates the ATPAR_REPORTING_DATASETUP_PATCH30 Stored Procedure and executes it
	System_DataSetup Stored Procedure in turn executes the stored procedure for
	creating tables
	
--------------------------------------------------------------------------------------------------	
*/	

IF OBJECT_ID('ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30') IS NOT NULL
DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
GO

CREATE PROCEDURE  ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
AS 
BEGIN

		IF OBJECT_ID('ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30') IS NOT NULL
		DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30
						 
		IF OBJECT_ID('ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30') IS NOT NULL
		DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30


	/* POU */	 			 		 
		 
	
		IF OBJECT_ID('ATPAR_SP_POU_RPT_TABLES_PATCH30') IS NOT NULL
		DROP PROCEDURE ATPAR_SP_POU_RPT_TABLES_PATCH30	
		
END
GO

IF OBJECT_ID('ATPAR_SP_ATPAR_REPORTING_DATASETUP_PATCH30') IS NOT NULL
DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_DATASETUP_PATCH30
GO

CREATE PROCEDURE ATPAR_SP_ATPAR_REPORTING_DATASETUP_PATCH30
AS
BEGIN
	DECLARE @intReturn INT

	SET @intReturn = 0
	
BEGIN TRANSACTION SYSTEM_DATA

	/* Reporting  */	
	PRINT 'Executing ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30 Stored Procedure'
	EXECUTE @intReturn = ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30
	
	IF @intReturn <> 0
	BEGIN
	 PRINT 'Return value from ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30' + str(@intReturn) + ''
	 PRINT 'Failed to execute Stored Procedure ATPAR_SP_ATPAR_REPORTING_TABLES_PATCH30'
	 GOTO ERR_HANDLER
	END
	
	PRINT 'Executing ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30 Stored Procedure'
	EXECUTE @intReturn = ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30
	
	IF @intReturn <> 0
	BEGIN
	 PRINT 'Return value from ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30' + str(@intReturn) + ''
	 PRINT 'Failed to execute Stored Procedure ATPAR_SP_ATPAR_REPORTING_DEFAULTS_PATCH30'
	 GOTO ERR_HANDLER
	END

	/*POU*/

	PRINT 'Executing ATPAR_SP_POU_RPT_TABLES_PATCH30 Stored Procedure'
	EXECUTE @intReturn = ATPAR_SP_POU_RPT_TABLES_PATCH30
	
	IF @intReturn <> 0
	BEGIN
	 PRINT 'Return value from ATPAR_SP_POU_RPT_TABLES_PATCH30' + str(@intReturn) + ''
	 PRINT 'Failed to execute Stored Procedure ATPAR_SP_POU_RPT_TABLES_PATCH30'
	 GOTO ERR_HANDLER
	END
	
			
	/* 	IF ALL THE ABOVE STORE PROCEDURE EXECUTES SUCCESSFULLY 
		COMMIT THE TRANSACTION */
		
	PRINT 'COMMITTING THE TRANSACTION'
	
	COMMIT TRANSACTION SYSTEM_DATA
	 
	PRINT 'EXECUTING ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30'
	EXECUTE ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
	PRINT 'DROPPING ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30'
	DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
		
	RETURN

ERR_HANDLER:

	/* IF THERE IS ERROR IN EXECUTING ANY OF THE STORE PROCEDURE IT WILL ROLLBACK THE
		TRANSACTION AND DROP ALL THE DATA SETUP OBJECT(STORE PROCEDURE FOR DATA CREATION)
		DROPPING ALL THE TABLES CREATED AND DROPPING ALL THE STORE PROCEDURE OF THE 
		APPLICATION */
		
	PRINT 'FAILED IN ATPAR_SP_ATPAR_REPORTING_DATASETUP_PATCH30 STORED PROCEDURE ROLLING BACK TRANSACTION...'
	ROLLBACK TRANSACTION SYSTEM_DATA
		
	PRINT 'RETURN VALUE ' + STR(@intReturn)
	
	IF @intReturn = 1
		BEGIN
		
		/* DROPPING ALL ATPAR TABLES, SPS AND DEFAULTS */
		PRINT 'DROPPING ALL TABLES, SPS, DEFAULTS AS PART OF ROLLBACK.....'
		EXECUTE ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
		 DROP PROCEDURE ATPAR_SP_ATPAR_REPORTING_DROP_DATA_SETUP_OBJECTS_PATCH30
		END 
		
		
	ELSE
		BEGIN
			PRINT 'SYSTEM ALREADY EXISTS............SKIPPING CREATING DATABASE RELATED OBJECTS'
		END
	
--RETURN
END
GO


