
--By ICD:


IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PHYSICIAN_AVERAGE')
BEGIN
drop table TEMP_PHYSICIAN_AVERAGE
END

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PROCEDURES_COUNT_Y')
BEGIN
drop table TEMP_PROCEDURES_COUNT_Y
END

--DROP TABLE TEMP_PHYSICIAN_AVERAGE
--DROP TABLE TEMP_PROCEDURES_COUNT_Y


 DELETE FROM MT_POU_RPT_SPEND_BY_GROUP_Y
--BY ICD
--MT_POU_RPT_SPEND_BY_GROUP

-------------------------------------------------------------------------------------

ALTER TABLE [Item_details]
ALTER COLUMN [ICD10] [nvarchar](255) NULL
-------
ALTER TABLE [Item_details]
ALTER COLUMN [ICD10] [nvarchar](255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL

--UPDATE MT_POU_RPT_SPEND_BY_GROUP_M
--SET [PROCEDURE_CODE] = [Item_details].ICD10,
--ICD_DESCR = ISNULL([Item_details].[ICD10 DESCRIPTION],' '),
--PROCEDURE_DESCRIPTION = ISNULL([Item_details].[ICD10 DESCRIPTION],' ')
--FROM MT_POU_RPT_SPEND_BY_GROUP_M,[Item_details]
--WHERE MT_POU_RPT_SPEND_BY_GROUP_M.ICD_CODE = [Item_details].ICD10

--UPDATE MT_POU_RPT_SPEND_BY_GROUP_Q
--SET [PROCEDURE_CODE] = [Item_details].ICD10,
--ICD_DESCR = ISNULL([Item_details].[ICD10 DESCRIPTION],' '),
--PROCEDURE_DESCRIPTION = ISNULL([Item_details].[ICD10 DESCRIPTION],' ')
--FROM MT_POU_RPT_SPEND_BY_GROUP_Q,[Item_details]
--WHERE MT_POU_RPT_SPEND_BY_GROUP_Q.ICD_CODE = [Item_details].ICD10

--UPDATE MT_POU_RPT_SPEND_BY_GROUP_H
--SET [PROCEDURE_CODE] = [Item_details].ICD10,
--ICD_DESCR = ISNULL([Item_details].[ICD10 DESCRIPTION],' '),
--PROCEDURE_DESCRIPTION = ISNULL([Item_details].[ICD10 DESCRIPTION],' ')
--FROM MT_POU_RPT_SPEND_BY_GROUP_H,[Item_details]
--WHERE MT_POU_RPT_SPEND_BY_GROUP_H.ICD_CODE = [Item_details].ICD10

-- SELECT * FROM MT_POU_RPT_SPEND_BY_GROUP_Y WHERE ICD_CODE=' '

--select * from [Item_details]

	--UPDATE MT_POU_RPT_SPEND_BY_GROUP_Y
	--SET [PROCEDURE_CODE] = [Item_details].ICD10,
	--ICD_DESCR = ISNULL([Item_details].[ICD10 DESCRIPTION],' '),
	--PROCEDURE_DESCRIPTION = ISNULL([Item_details].[ICD10 DESCRIPTION],' ')
	--FROM MT_POU_RPT_SPEND_BY_GROUP_Y,[Item_details]
	--WHERE MT_POU_RPT_SPEND_BY_GROUP_Y.ICD_CODE = [Item_details].ICD10

---------------------------------------------------------------------------------------------------------------------


--TEMP_ALL_PHYSICIANS_1 TABLE:contains min max average usage among all physicians

--SELECT  SERVICE_CODE, ICD10, MIN(TOTAL_SPEND) MIN_AVG, AVG(TOTAL_SPEND) AVERAGE, MAX(TOTAL_SPEND) MAX_AVG,  [YEAR] INTO TEMP_ALL_PHYSICIANS_1
--FROM (SELECT SUM(C.TOTAL_SPEND) TOTAL_SPEND,  SERVICE_CODE, ICD10,  C.PHYSICIAN, C.CASEID , [YEAR]
--FROM (SELECT SERVICE_CODE, ICD10,  PHYSICIAN, CASEID, SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY]) - (([TOTALRETURNED] + [TOTAL WASTED]))) * [CURRENTITEMCOST])) TOTAL_SPEND, 
--			 DATEPART(YYYY,[performdatewtime]) [YEAR]
--			  FROM [Item_details] where ICD10 is not null
--			  GROUP BY  SERVICE_CODE, ICD10,  PHYSICIAN, CASEID , DATEPART(YYYY,[performdatewtime])) C
--GROUP BY  CASEID, SERVICE_CODE, ICD10,  PHYSICIAN, [YEAR]) A
--GROUP BY ICD10, SERVICE_CODE, [YEAR]

-------------------------PROCEDURES COUNT--------------------

SELECT COUNT(DISTINCT(CASEID)) NO_OF_PROCEDURES, SERVICE_CODE, PHYSICIAN, ICD10,
 DATEPART(YYYY,[performdatewtime]) [YEAR] INTO TEMP_PROCEDURES_COUNT_Y
FROM [Item_details] where ICD10 is not null	AND ICD_OUTLIER_Y = 'N'
 --WHERE SERVICE_CODE='ORTHOPEDICS' AND ICD10 IS NOT NULL AND ICD10='C79.51'
--WHERE SERVICE_CODE = 'GYNECOLOGY' AND ICD10='C54.1'	
GROUP BY  SERVICE_CODE, PHYSICIAN, ICD10,
DATEPART(YYYY,[performdatewtime])

-------------------------
--TEMP_PHYSICIAN_AVERAGE TABLE:contains min max average usage by physician and item group

SELECT DISTINCT([Group]) [Group], C.SERVICE_CODE, PHYSICIAN, ICD10, [ICD10 DESCRIPTION], SUM(TOTAL_ITEM_QTY) TOTAL_ITEM_QTY, SUM(TOTAL_SPEND) TOTAL_SPEND, 
				 [YEAR]  INTO TEMP_PHYSICIAN_AVERAGE
FROM (SELECT SERVICE_CODE, ICD10, [ICD10 DESCRIPTION], PHYSICIAN, CASEID, [Group] , SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED]))  TOTAL_ITEM_QTY, 
			 SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED])) * [CURRENTITEMCOST]) TOTAL_SPEND, 
			 DATEPART(YYYY,[performdatewtime]) [YEAR]
			 FROM [Item_details] where ICD10 is not null AND ICD_OUTLIER_Y = 'N'
			 --WHERE ICD10 IS NOT NULL
			 --WHERE SERVICE_CODE='ORTHOPEDICS' AND ICD10 IS NOT NULL AND ICD10='C79.51'			  
GROUP BY SERVICE_CODE, ICD10, [ICD10 DESCRIPTION], PHYSICIAN, CASEID, DATEPART(YYYY,[performdatewtime]), [Group] ) C
GROUP BY SERVICE_CODE, PHYSICIAN, ICD10, [ICD10 DESCRIPTION], [YEAR], [Group]

------------------------------------------------
 

ALTER TABLE TEMP_PHYSICIAN_AVERAGE ADD NO_OF_CASES INT


UPDATE TEMP_PHYSICIAN_AVERAGE SET TEMP_PHYSICIAN_AVERAGE.NO_OF_CASES = TEMP_PROCEDURES_COUNT_Y.NO_OF_PROCEDURES
--SELECT TEMP_PROCEDURES_COUNT_Y.NO_OF_PROCEDURES
FROM TEMP_PHYSICIAN_AVERAGE, TEMP_PROCEDURES_COUNT_Y
WHERE TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE = TEMP_PROCEDURES_COUNT_Y.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE.PHYSICIAN = TEMP_PROCEDURES_COUNT_Y.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE.[YEAR] = TEMP_PROCEDURES_COUNT_Y.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE.ICD10 = TEMP_PROCEDURES_COUNT_Y.ICD10
--AND  TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE='ORTHOPEDICS' 
--AND TEMP_PHYSICIAN_AVERAGE.ICD10 IS NOT NULL 
--AND TEMP_PHYSICIAN_AVERAGE.ICD10='C79.51'

--SELECT * FROM TEMP_PHYSICIAN_AVERAGE

---INSERT INTO MT_POU_RPT_SPEND_BY_GROUP

--BY YEAR
--alter table MT_POU_RPT_SPEND_BY_GROUP_Y
--alter column [TOTAL_COST_ITEM_GROUP] [FLOAT] NULL

INSERT INTO [MT_POU_RPT_SPEND_BY_GROUP_Y]
 ([SPECIALTY_CODE]
,DIAGNOSIS_CODE
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[NO_OF_ITEMS_BY_ITEM_GROUP]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[TOTAL_NO_OF_CASES_PHYSICIAN]
,[TOTAL_COST_ITEM_GROUP]
,[YEAR])
SELECT TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE, ISNULL(TEMP_PHYSICIAN_AVERAGE.ICD10, ' ') ICD10,  
--ISNULL(TEMP_PHYSICIAN_AVERAGE.ICD10, ' ') PROCEDURE_CODE, 
ISNULL(TEMP_PHYSICIAN_AVERAGE.[ICD10 DESCRIPTION], ' ') PROCEDURE_DESCR,
 1 AS 'DIAGNOSIS_CODE_TYPE',
 --ISNULL(TEMP_PHYSICIAN_AVERAGE.[ICD10 DESCRIPTION], ' ') ICD10_DESCR ,' ', 
 ISNULL(TEMP_PHYSICIAN_AVERAGE.PHYSICIAN,' ') PHYSICIAN, 
 '' PHYSICIAN_NAME,  
SUM(TOTAL_ITEM_QTY) TOTAL_ITEM_QTY,ISNULL([Group],''),ISNULL([Group],''), AVG(ISNULL(TEMP_PROCEDURES_COUNT_Y.NO_OF_PROCEDURES,0)) NO_OF_PROCEDURES,  
ROUND(SUM(ISNULL(TOTAL_SPEND,0)),2) TOTAL_SPEND,
TEMP_PHYSICIAN_AVERAGE.[YEAR] FROM TEMP_PHYSICIAN_AVERAGE, TEMP_PROCEDURES_COUNT_Y
WHERE TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE = TEMP_PROCEDURES_COUNT_Y.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE.PHYSICIAN = TEMP_PROCEDURES_COUNT_Y.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE.[YEAR] = TEMP_PROCEDURES_COUNT_Y.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE.ICD10 = TEMP_PROCEDURES_COUNT_Y.ICD10
--AND  TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE='ORTHOPEDICS' AND TEMP_PHYSICIAN_AVERAGE.ICD10='M17.12'
GROUP BY TEMP_PHYSICIAN_AVERAGE.SERVICE_CODE,TEMP_PHYSICIAN_AVERAGE.ICD10,TEMP_PHYSICIAN_AVERAGE.[ICD10 DESCRIPTION],
TEMP_PHYSICIAN_AVERAGE.PHYSICIAN,[Group],TEMP_PHYSICIAN_AVERAGE.[YEAR]
ORDER BY TEMP_PHYSICIAN_AVERAGE.[Group]

--select * from [MT_POU_RPT_SPEND_BY_GROUP_Y]

-----------------------------

update [MT_POU_RPT_SPEND_BY_GROUP_Y] set PHYSICIAN_NAME=[ATPAR_MT].[MT_POU_PHYSICIAN].FIRST_NAME
+' ' + [ATPAR_MT].[MT_POU_PHYSICIAN].MIDDLE_INITIAL + ' '+[ATPAR_MT].[MT_POU_PHYSICIAN].LAST_NAME
from [MT_POU_RPT_SPEND_BY_GROUP_Y],[ATPAR_MT].[MT_POU_PHYSICIAN]
where [MT_POU_RPT_SPEND_BY_GROUP_Y].PHYSICIAN_ID=[ATPAR_MT].[MT_POU_PHYSICIAN].PHYSICIAN_ID



--------------------------------
--SELECT ITEM_GROUP, SUM([TOTAL_COST_ITEM_GROUP]) FROM MT_POU_RPT_SPEND_BY_GROUP_Y WHERE SPECIALTY_CODE='ORTHOPEDICS' AND ICD_CODE='M17.12' GROUP BY ITEM_GROUP




--By Procedure:


IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PHYSICIAN_AVERAGE_PROC')
BEGIN
drop table TEMP_PHYSICIAN_AVERAGE_PROC
END

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PROCEDURES_COUNT_Y_PROC')
BEGIN
drop table TEMP_PROCEDURES_COUNT_Y_PROC
END


--DROP TABLE TEMP_PHYSICIAN_AVERAGE_PROC
--DROP TABLE TEMP_PROCEDURES_COUNT_Y_PROC


  
--BY ICD
--MT_POU_RPT_SPEND_BY_GROUP

-------------------------------------------------------------------------------------

ALTER TABLE [Item_details]
ALTER COLUMN [PROCEDURE_CODE] [nvarchar](255) NULL
-------
ALTER TABLE [Item_details]
ALTER COLUMN [PROCEDURE_CODE] [nvarchar](255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL



---------------------------------------------------------------------------------------------------------------------


--TEMP_ALL_PHYSICIANS_1 TABLE:contains min max average usage among all physicians

--SELECT  SERVICE_CODE, PROCEDURE_CODE, MIN(TOTAL_SPEND) MIN_AVG, AVG(TOTAL_SPEND) AVERAGE, MAX(TOTAL_SPEND) MAX_AVG,  [YEAR] INTO TEMP_ALL_PHYSICIANS_1
--FROM (SELECT SUM(C.TOTAL_SPEND) TOTAL_SPEND,  SERVICE_CODE, PROCEDURE_CODE,  C.PHYSICIAN, C.CASEID , [YEAR]
--FROM (SELECT SERVICE_CODE, PROCEDURE_CODE,  PHYSICIAN, CASEID, SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY]) - (([TOTALRETURNED] + [TOTAL WASTED]))) * [CURRENTITEMCOST])) TOTAL_SPEND, 
--			 DATEPART(YYYY,[performdatewtime]) [YEAR]
--			  FROM [Item_details] 
--			  GROUP BY  SERVICE_CODE, PROCEDURE_CODE,  PHYSICIAN, CASEID , DATEPART(YYYY,[performdatewtime])) C
--GROUP BY  CASEID, SERVICE_CODE, PROCEDURE_CODE,  PHYSICIAN, [YEAR]) A
--GROUP BY PROCEDURE_CODE, SERVICE_CODE, [YEAR]

-------------------------PROCEDURES COUNT--------------------

SELECT COUNT(DISTINCT(CASEID)) NO_OF_PROCEDURES, SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE,
 DATEPART(YYYY,[performdatewtime]) [YEAR] INTO TEMP_PROCEDURES_COUNT_Y_PROC
FROM [Item_details]	WHERE PROC_OUTLIER_Y = 'N'
 --WHERE SERVICE_CODE='ORTHOPEDICS' AND PROCEDURE_CODE IS NOT NULL AND PROCEDURE_CODE='C79.51'
--WHERE SERVICE_CODE = 'GYNECOLOGY' AND PROCEDURE_CODE='C54.1'	
GROUP BY  SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE,
DATEPART(YYYY,[performdatewtime])

-------------------------
--TEMP_PHYSICIAN_AVERAGE_PROC TABLE:contains min max average usage by physician and item group

SELECT DISTINCT([Group]) [Group], C.SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE, proc_descr, SUM(TOTAL_ITEM_QTY) TOTAL_ITEM_QTY, SUM(TOTAL_SPEND) TOTAL_SPEND, 
				 [YEAR]  INTO TEMP_PHYSICIAN_AVERAGE_PROC
FROM (SELECT SERVICE_CODE, PROCEDURE_CODE, proc_descr, PHYSICIAN, CASEID, [Group] ,  SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED]))  TOTAL_ITEM_QTY, 
			 SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY]) - (([TOTALRETURNED] + [TOTAL WASTED]))) * [CURRENTITEMCOST])) TOTAL_SPEND, 
			 DATEPART(YYYY,[performdatewtime]) [YEAR]
			 FROM [Item_details]
			 WHERE PROC_OUTLIER_Y = 'N'
			 --WHERE PROCEDURE_CODE IS NOT NULL
			 --WHERE SERVICE_CODE='ORTHOPEDICS' AND PROCEDURE_CODE IS NOT NULL AND PROCEDURE_CODE='C79.51'			  
GROUP BY SERVICE_CODE, PROCEDURE_CODE, proc_descr, PHYSICIAN, CASEID, DATEPART(YYYY,[performdatewtime]), [Group] ) C
GROUP BY SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE, proc_descr, [YEAR], [Group]

------------------------------------------------
 

ALTER TABLE TEMP_PHYSICIAN_AVERAGE_PROC ADD NO_OF_CASES INT


UPDATE TEMP_PHYSICIAN_AVERAGE_PROC SET TEMP_PHYSICIAN_AVERAGE_PROC.NO_OF_CASES = TEMP_PROCEDURES_COUNT_Y_PROC.NO_OF_PROCEDURES
--SELECT TEMP_PROCEDURES_COUNT_Y_PROC.NO_OF_PROCEDURES
FROM TEMP_PHYSICIAN_AVERAGE_PROC, TEMP_PROCEDURES_COUNT_Y_PROC
WHERE TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE = TEMP_PROCEDURES_COUNT_Y_PROC.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_PROC.PHYSICIAN = TEMP_PROCEDURES_COUNT_Y_PROC.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_PROC.[YEAR] = TEMP_PROCEDURES_COUNT_Y_PROC.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE = TEMP_PROCEDURES_COUNT_Y_PROC.PROCEDURE_CODE
--AND  TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE='ORTHOPEDICS' 
--AND TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE IS NOT NULL 
--AND TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE='C79.51'

--SELECT * FROM TEMP_PHYSICIAN_AVERAGE_PROC

---INSERT INTO MT_POU_RPT_SPEND_BY_GROUP

--BY YEAR
--alter table MT_POU_RPT_SPEND_BY_GROUP_Y
--alter column [TOTAL_COST_ITEM_GROUP] [FLOAT] NULL

-- delete from MT_POU_RPT_SPEND_BY_GROUP_Y (10923)
INSERT INTO [MT_POU_RPT_SPEND_BY_GROUP_Y]
 ([SPECIALTY_CODE]
,DIAGNOSIS_CODE
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[NO_OF_ITEMS_BY_ITEM_GROUP]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[TOTAL_NO_OF_CASES_PHYSICIAN]
,[TOTAL_COST_ITEM_GROUP]
,[YEAR])
SELECT TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE, ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE, ' ') DIAGNOSIS_CODE, 
ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC.proc_descr, ' ') DIAGNOSIS_DESCR,
 3 AS 'DIAGNOSIS_CODE_TYPE',
 --  ' ' ICD10_DESCR ,' ', 
 ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC.PHYSICIAN,' ') PHYSICIAN, 
 '' PHYSICIAN_NAME,  
SUM(TOTAL_ITEM_QTY) TOTAL_ITEM_QTY,ISNULL([Group],''),ISNULL([Group],''), AVG(ISNULL(TEMP_PROCEDURES_COUNT_Y_PROC.NO_OF_PROCEDURES,0)) NO_OF_PROCEDURES,  
ROUND(SUM(ISNULL(TOTAL_SPEND,0)),2) TOTAL_SPEND,
TEMP_PHYSICIAN_AVERAGE_PROC.[YEAR] FROM TEMP_PHYSICIAN_AVERAGE_PROC, TEMP_PROCEDURES_COUNT_Y_PROC
WHERE TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE = TEMP_PROCEDURES_COUNT_Y_PROC.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_PROC.PHYSICIAN = TEMP_PROCEDURES_COUNT_Y_PROC.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_PROC.[YEAR] = TEMP_PROCEDURES_COUNT_Y_PROC.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE = TEMP_PROCEDURES_COUNT_Y_PROC.PROCEDURE_CODE
--AND  TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE='ORTHOPEDICS' AND TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE='M17.12'
GROUP BY TEMP_PHYSICIAN_AVERAGE_PROC.SERVICE_CODE,TEMP_PHYSICIAN_AVERAGE_PROC.PROCEDURE_CODE,TEMP_PHYSICIAN_AVERAGE_PROC.proc_descr,
TEMP_PHYSICIAN_AVERAGE_PROC.PHYSICIAN,[Group],TEMP_PHYSICIAN_AVERAGE_PROC.[YEAR]
ORDER BY TEMP_PHYSICIAN_AVERAGE_PROC.[Group]

--UPDATE MT_POU_RPT_SPEND_BY_GROUP_Y SET DIAGNOSIS_CODE_TYPE=3 WHERE ICD_CODE=' ' AND PROCEDURE_CODE IS NOT NULL
--SELECT COUNT(*) FROM MT_POU_RPT_SPEND_BY_GROUP_Y WHERE ICD_CODE=' ' AND PROCEDURE_CODE IS NOT NULL

-----------------------------
update [MT_POU_RPT_SPEND_BY_GROUP_Y] set PHYSICIAN_NAME=[ATPAR_MT].[MT_POU_PHYSICIAN].FIRST_NAME
+' ' + [ATPAR_MT].[MT_POU_PHYSICIAN].MIDDLE_INITIAL + ' '+[ATPAR_MT].[MT_POU_PHYSICIAN].LAST_NAME
from [MT_POU_RPT_SPEND_BY_GROUP_Y],[ATPAR_MT].[MT_POU_PHYSICIAN]
where [MT_POU_RPT_SPEND_BY_GROUP_Y].PHYSICIAN_ID=[ATPAR_MT].[MT_POU_PHYSICIAN].PHYSICIAN_ID and [MT_POU_RPT_SPEND_BY_GROUP_Y].DIAGNOSIS_CODE_TYPE=3

UPDATE [MT_POU_RPT_SPEND_BY_GROUP_Y] 
SET DIAGNOSIS_DESCRIPTION = ATPAR_MT.MT_POU_PROCEDURE_CODE.DESCRIPTION
FROM [MT_POU_RPT_SPEND_BY_GROUP_Y],ATPAR_MT.MT_POU_PROCEDURE_CODE
WHERE [MT_POU_RPT_SPEND_BY_GROUP_Y].[DIAGNOSIS_CODE]=ATPAR_MT.MT_POU_PROCEDURE_CODE.PROCEDURE_CODE
AND ([MT_POU_RPT_SPEND_BY_GROUP_Y].DIAGNOSIS_DESCRIPTION IS NULL OR [MT_POU_RPT_SPEND_BY_GROUP_Y].DIAGNOSIS_DESCRIPTION = ''
OR [MT_POU_RPT_SPEND_BY_GROUP_Y].DIAGNOSIS_DESCRIPTION=' ') and [MT_POU_RPT_SPEND_BY_GROUP_Y].DIAGNOSIS_CODE_TYPE=3

UPDATE MT_POU_RPT_SPEND_BY_GROUP_Y SET ITEM_GROUP = 'UNKNOWN' WHERE ITEM_GROUP IS NULL OR ITEM_GROUP = '' OR ITEM_GROUP = ' '

update MT_POU_RPT_SPEND_BY_GROUP_Y set DIAGNOSIS_DESCRIPTION=[DIAGNOSIS_CODE] where DIAGNOSIS_DESCRIPTION=''

update MT_POU_RPT_SPEND_BY_GROUP_Y set SPECIALTY_CODE='OTHERS' where SPECIALTY_CODE=''
--update [MT_POU_RPT_OPT_BY_SPECIALTY_Y] set SPECIALTY_DESCRIPTION=SPECIALTY_CODE where SPECIALTY_DESCRIPTION=''




--------------------------------
--SELECT ITEM_GROUP, SUM([TOTAL_COST_ITEM_GROUP]) FROM MT_POU_RPT_SPEND_BY_GROUP_Y WHERE SPECIALTY_CODE='ORTHOPEDICS' AND ICD_CODE='M17.12' GROUP BY ITEM_GROUP

