--By ICD:

IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PHYSICIAN_AVERAGE_ICD_M')
BEGIN
DROP TABLE TEMP_PHYSICIAN_AVERAGE_ICD_M
END
IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PROCEDURES_COUNT_M_ICD')
BEGIN
DROP TABLE TEMP_PROCEDURES_COUNT_M_ICD
END


  --DELETE FROM MT_POU_RPT_SPEND_BY_GROUP_M  WHERE [DIAGNOSIS_CODE_TYPE]=1
--BY ICD
--MT_POU_RPT_SPEND_BY_GROUP

-------------------------------------------------------------------------------------

-------------------------PROCEDURES COUNT--------------------

SELECT COUNT(DISTINCT(CASEID)) NO_OF_PROCEDURES, SERVICE_CODE, PHYSICIAN, ICD10,
 DATEPART(YYYY,[performdatewtime]) [YEAR], DATEPART(mm,[performdatewtime]) [MONTH] INTO TEMP_PROCEDURES_COUNT_M_ICD
FROM [Item_details] 
GROUP BY  SERVICE_CODE, PHYSICIAN, ICD10,
DATEPART(YYYY,[performdatewtime]),DATEPART(mm,[performdatewtime])

-------------------------
--TEMP_PHYSICIAN_AVERAGE_ICD_M TABLE:contains min max average usage by physician and item group

SELECT DISTINCT([Group]) [Group], C.SERVICE_CODE, PHYSICIAN, ICD10, [ICD10 DESCRIPTION], SUM(TOTAL_ITEM_MTY) TOTAL_ITEM_MTY, SUM(TOTAL_SPEND) TOTAL_SPEND, 
				 [YEAR], [MONTH] INTO TEMP_PHYSICIAN_AVERAGE_ICD_M
FROM (SELECT SERVICE_CODE, ICD10, [ICD10 DESCRIPTION], PHYSICIAN, CASEID, [Group] ,  SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED]))  TOTAL_ITEM_MTY, 
			 SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY]) - (([TOTALRETURNED] + [TOTAL WASTED]))) * [CURRENTITEMCOST])) TOTAL_SPEND, 
			 DATEPART(YYYY,[performdatewtime]) [YEAR], DATEPART(mm,[performdatewtime]) [MONTH]
			 FROM [Item_details]
			 WHERE ICD10 IS NOT NULL				  
GROUP BY SERVICE_CODE, ICD10, [ICD10 DESCRIPTION], PHYSICIAN, CASEID, DATEPART(YYYY,[performdatewtime]), [Group], DATEPART(mm,[performdatewtime])) C
GROUP BY SERVICE_CODE, PHYSICIAN, ICD10, [ICD10 DESCRIPTION], [YEAR], [Group], [MONTH]

------------------------------------------------
 

ALTER TABLE TEMP_PHYSICIAN_AVERAGE_ICD_M ADD NO_OF_CASES INT


UPDATE TEMP_PHYSICIAN_AVERAGE_ICD_M SET TEMP_PHYSICIAN_AVERAGE_ICD_M.NO_OF_CASES = TEMP_PROCEDURES_COUNT_M_ICD.NO_OF_PROCEDURES
FROM TEMP_PHYSICIAN_AVERAGE_ICD_M, TEMP_PROCEDURES_COUNT_M_ICD
WHERE TEMP_PHYSICIAN_AVERAGE_ICD_M.SERVICE_CODE = TEMP_PROCEDURES_COUNT_M_ICD.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.PHYSICIAN = TEMP_PROCEDURES_COUNT_M_ICD.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.[YEAR] = TEMP_PROCEDURES_COUNT_M_ICD.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.ICD10 = TEMP_PROCEDURES_COUNT_M_ICD.ICD10
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.[MONTH] = TEMP_PROCEDURES_COUNT_M_ICD.[MONTH]

--BY YEAR
--alter table MT_POU_RPT_SPEND_BY_GROUP_M
--alter column [TOTAL_COST_ITEM_GROUP] [FLOAT] NULL

-- delete from MT_POU_RPT_SPEND_BY_GROUP_M  WHERE [DIAGNOSIS_CODE_TYPE]=1 (10923)
INSERT INTO MT_POU_RPT_SPEND_BY_GROUP_M
 ([SPECIALTY_CODE]
,[DIAGNOSIS_CODE]
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[NO_OF_ITEMS_BY_ITEM_GROUP]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[TOTAL_NO_OF_CASES_PHYSICIAN]
,[TOTAL_COST_ITEM_GROUP]
,[MONTH]
,[YEAR])
SELECT TEMP_PHYSICIAN_AVERAGE_ICD_M.SERVICE_CODE, ISNULL(TEMP_PHYSICIAN_AVERAGE_ICD_M.ICD10, ' '),
-- ' ',  ISNULL(TEMP_PHYSICIAN_AVERAGE_ICD_M.ICD10, ' ') ICD10, 
ISNULL(TEMP_PHYSICIAN_AVERAGE_ICD_M.[ICD10 DESCRIPTION], ' ') PROCEDURE_DESCR,
 1 AS 'DIAGNOSIS_CODE_TYPE', 
--ISNULL(TEMP_PHYSICIAN_AVERAGE_ICD_M.[ICD10 DESCRIPTION], ' ') ICD10_DESCR ,' ', 
ISNULL(TEMP_PHYSICIAN_AVERAGE_ICD_M.PHYSICIAN,' ') PHYSICIAN, 
 '' PHYSICIAN_NAME,  
SUM(TOTAL_ITEM_MTY) TOTAL_ITEM_MTY,[Group],[Group], AVG(ISNULL(TEMP_PROCEDURES_COUNT_M_ICD.NO_OF_PROCEDURES,0)) NO_OF_PROCEDURES,  
ROUND(SUM(ISNULL(TOTAL_SPEND,0)),2) TOTAL_SPEND,
TEMP_PHYSICIAN_AVERAGE_ICD_M.[MONTH],
TEMP_PHYSICIAN_AVERAGE_ICD_M.[YEAR] 
FROM TEMP_PHYSICIAN_AVERAGE_ICD_M, TEMP_PROCEDURES_COUNT_M_ICD
WHERE TEMP_PHYSICIAN_AVERAGE_ICD_M.SERVICE_CODE = TEMP_PROCEDURES_COUNT_M_ICD.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.PHYSICIAN = TEMP_PROCEDURES_COUNT_M_ICD.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.[YEAR] = TEMP_PROCEDURES_COUNT_M_ICD.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_ICD_M.ICD10 = TEMP_PROCEDURES_COUNT_M_ICD.ICD10
GROUP BY TEMP_PHYSICIAN_AVERAGE_ICD_M.SERVICE_CODE,TEMP_PHYSICIAN_AVERAGE_ICD_M.ICD10,TEMP_PHYSICIAN_AVERAGE_ICD_M.[ICD10 DESCRIPTION],
TEMP_PHYSICIAN_AVERAGE_ICD_M.PHYSICIAN,[Group],TEMP_PHYSICIAN_AVERAGE_ICD_M.[YEAR], TEMP_PHYSICIAN_AVERAGE_ICD_M.[MONTH]
ORDER BY TEMP_PHYSICIAN_AVERAGE_ICD_M.[Group]


-----------------------------
UPDATE MT_POU_RPT_SPEND_BY_GROUP_M SET [PHYSICIAN_NAME] = ISNULL([Item_details].SURGE_DESCIPTION_orig,'') 
FROM MT_POU_RPT_SPEND_BY_GROUP_M,[Item_details]
WHERE MT_POU_RPT_SPEND_BY_GROUP_M.PHYSICIAN_ID=[Item_details].PHYSICIAN



--By PROCEDURE:


IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PHYSICIAN_AVERAGE_PROC_M')
BEGIN
DROP TABLE TEMP_PHYSICIAN_AVERAGE_PROC_M
END
IF EXISTS (SELECT * FROM sys.objects WHERE name = 'TEMP_PROCEDURES_COUNT_M_PROC')
BEGIN
DROP TABLE TEMP_PROCEDURES_COUNT_M_PROC
END


  --DELETE FROM MT_POU_RPT_SPEND_BY_GROUP_M
--BY ICD
--MT_POU_RPT_SPEND_BY_GROUP

-------------------------------------------------------------------------------------

ALTER TABLE [Item_details]
ALTER COLUMN [PROCEDURE_CODE] [nvarchar](255) NULL
-------
ALTER TABLE [Item_details]
ALTER COLUMN [PROCEDURE_CODE] [nvarchar](255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL

---------------------------------------------------------------------------------------------------------------------

-------------------------PROCEDURES COUNT--------------------

SELECT COUNT(DISTINCT(CASEID)) NO_OF_PROCEDURES, SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE,
 DATEPART(YYYY,[performdatewtime]) [YEAR], DATEPART(mm,[performdatewtime]) [MONTH] INTO TEMP_PROCEDURES_COUNT_M_PROC
FROM [Item_details] 
 --WHERE SERVICE_CODE='ORTHOPEDICS' AND PROCEDURE_CODE IS NOT NULL AND PROCEDURE_CODE='C79.51'
--WHERE SERVICE_CODE = 'GYNECOLOGY' AND PROCEDURE_CODE='C54.1'	
GROUP BY  SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE,
DATEPART(YYYY,[performdatewtime]),DATEPART(mm,[performdatewtime])

-------------------------
--TEMP_PHYSICIAN_AVERAGE_PROC_M TABLE:contains min max average usage by physician and item group

SELECT DISTINCT([Group]) [Group], C.SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE, proc_descr, SUM(TOTAL_ITEM_MTY) TOTAL_ITEM_MTY, SUM(TOTAL_SPEND) TOTAL_SPEND, 
				 [YEAR], [MONTH] INTO TEMP_PHYSICIAN_AVERAGE_PROC_M
FROM (SELECT SERVICE_CODE, PROCEDURE_CODE, proc_descr, PHYSICIAN, CASEID, [Group] ,  SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED]))  TOTAL_ITEM_MTY, 
			 SUM(((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY]) - (([TOTALRETURNED] + [TOTAL WASTED]))) * [CURRENTITEMCOST])) TOTAL_SPEND, 
			 DATEPART(YYYY,[performdatewtime]) [YEAR], DATEPART(mm,[performdatewtime]) [MONTH]
			 FROM [Item_details]
			-- WHERE PROCEDURE_CODE IS NOT NULL
			 --WHERE SERVICE_CODE='ORTHOPEDICS' AND PROCEDURE_CODE IS NOT NULL AND PROCEDURE_CODE='C79.51'			  
GROUP BY SERVICE_CODE, PROCEDURE_CODE, proc_descr, PHYSICIAN, CASEID, DATEPART(YYYY,[performdatewtime]), [Group], DATEPART(mm,[performdatewtime])) C
GROUP BY SERVICE_CODE, PHYSICIAN, PROCEDURE_CODE, proc_descr, [YEAR], [Group], [MONTH]

------------------------------------------------
 

ALTER TABLE TEMP_PHYSICIAN_AVERAGE_PROC_M ADD NO_OF_CASES INT


UPDATE TEMP_PHYSICIAN_AVERAGE_PROC_M SET TEMP_PHYSICIAN_AVERAGE_PROC_M.NO_OF_CASES = TEMP_PROCEDURES_COUNT_M_PROC.NO_OF_PROCEDURES
--SELECT TEMP_PROCEDURES_COUNT_M_PROC.NO_OF_PROCEDURES
FROM TEMP_PHYSICIAN_AVERAGE_PROC_M, TEMP_PROCEDURES_COUNT_M_PROC
WHERE TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE = TEMP_PROCEDURES_COUNT_M_PROC.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PHYSICIAN = TEMP_PROCEDURES_COUNT_M_PROC.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.[YEAR] = TEMP_PROCEDURES_COUNT_M_PROC.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE = TEMP_PROCEDURES_COUNT_M_PROC.PROCEDURE_CODE
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.[MONTH] = TEMP_PROCEDURES_COUNT_M_PROC.[MONTH]
--AND  TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE='ORTHOPEDICS' 
--AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE IS NOT NULL 
--AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE='C79.51'

--SELECT * FROM TEMP_PHYSICIAN_AVERAGE_PROC_M

---INSERT INTO MT_POU_RPT_SPEND_BY_GROUP

--BY YEAR
--alter table MT_POU_RPT_SPEND_BY_GROUP_M
--alter column [TOTAL_COST_ITEM_GROUP] [FLOAT] NULL

-- delete from MT_POU_RPT_SPEND_BY_GROUP_M (10923)
INSERT INTO MT_POU_RPT_SPEND_BY_GROUP_M
 ([SPECIALTY_CODE]
,[DIAGNOSIS_CODE]
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[NO_OF_ITEMS_BY_ITEM_GROUP]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[TOTAL_NO_OF_CASES_PHYSICIAN]
,[TOTAL_COST_ITEM_GROUP]
,[MONTH]
,[YEAR])
SELECT TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE,
-- ' ', ' ', 
ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE, ' ') PROCEDURE_CODE, 
ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC_M.proc_descr, ' ') PROCEDURE_DESCR,
 3 AS 'DIAGNOSIS_CODE_TYPE',
-- ' ' ICD10_DESCR ,' ', 
ISNULL(TEMP_PHYSICIAN_AVERAGE_PROC_M.PHYSICIAN,' ') PHYSICIAN, 
 '' PHYSICIAN_NAME,  
SUM(TOTAL_ITEM_MTY) TOTAL_ITEM_MTY,[Group],[Group], AVG(ISNULL(TEMP_PROCEDURES_COUNT_M_PROC.NO_OF_PROCEDURES,0)) NO_OF_PROCEDURES,  
ROUND(SUM(ISNULL(TOTAL_SPEND,0)),2) TOTAL_SPEND,
TEMP_PHYSICIAN_AVERAGE_PROC_M.[MONTH],
TEMP_PHYSICIAN_AVERAGE_PROC_M.[YEAR] 
FROM TEMP_PHYSICIAN_AVERAGE_PROC_M, TEMP_PROCEDURES_COUNT_M_PROC
WHERE TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE = TEMP_PROCEDURES_COUNT_M_PROC.SERVICE_CODE
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PHYSICIAN = TEMP_PROCEDURES_COUNT_M_PROC.PHYSICIAN
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.[YEAR] = TEMP_PROCEDURES_COUNT_M_PROC.[YEAR]
AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE = TEMP_PROCEDURES_COUNT_M_PROC.PROCEDURE_CODE
--AND  TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE='ORTHOPEDICS' AND TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE='M17.12'
GROUP BY TEMP_PHYSICIAN_AVERAGE_PROC_M.SERVICE_CODE,TEMP_PHYSICIAN_AVERAGE_PROC_M.PROCEDURE_CODE,TEMP_PHYSICIAN_AVERAGE_PROC_M.proc_descr,
TEMP_PHYSICIAN_AVERAGE_PROC_M.PHYSICIAN,[Group],TEMP_PHYSICIAN_AVERAGE_PROC_M.[YEAR], TEMP_PHYSICIAN_AVERAGE_PROC_M.[MONTH]
ORDER BY TEMP_PHYSICIAN_AVERAGE_PROC_M.[Group]

--UPDATE MT_POU_RPT_SPEND_BY_GROUP_M SET DIAGNOSIS_CODE_TYPE=3 WHERE ICD_CODE=' ' AND PROCEDURE_CODE IS NOT NULL
--SELECT COUNT(*) FROM MT_POU_RPT_SPEND_BY_GROUP_M WHERE ICD_CODE=' ' AND PROCEDURE_CODE IS NOT NULL

-----------------------------
UPDATE MT_POU_RPT_SPEND_BY_GROUP_M SET [PHYSICIAN_NAME]=ISNULL([Item_details].SURGE_DESCIPTION_orig,'') FROM MT_POU_RPT_SPEND_BY_GROUP_M,[Item_details]
WHERE MT_POU_RPT_SPEND_BY_GROUP_M.PHYSICIAN_ID=[Item_details].PHYSICIAN


--------------------------------
--SELECT ITEM_GROUP, SUM([TOTAL_COST_ITEM_GROUP]) FROM MT_POU_RPT_SPEND_BY_GROUP_M WHERE SPECIALTY_CODE='ORTHOPEDICS' AND ICD_CODE='M17.12' GROUP BY ITEM_GROUP


