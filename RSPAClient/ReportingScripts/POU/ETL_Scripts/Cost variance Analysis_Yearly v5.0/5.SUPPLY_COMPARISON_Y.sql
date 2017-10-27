--By ICD:
-- SHOULD NOT BE USED IF PROCEDURE & ICD are run separately
--DELETE FROM MT_POU_RPT_SUPPLY_COMPARISON_Y WHERE DIAGNOSIS_CODE_TYPE = 1
-- WHERE [DIAGNOSIS_CODE_TYPE]=1 (297404)

INSERT INTO MT_POU_RPT_SUPPLY_COMPARISON_Y
 ([SPECIALTY_CODE]
,[DIAGNOSIS_CODE]
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[ITEM_ID]
,[ITEM_DESCRIPTION]
,[MFR_CATALOG_NO]
,[UNIT_COST]
,[NO_OF_TIMES_ITEM_USED_BY_PHY]
,[YEAR])
SELECT SERVICE_CODE,ISNULL(ICD10, ' ') DIAGNOSIS_CODE,
--' ' [CPT_CODE], ISNULL(ICD10, ' ') PROCEDURE_CODE,
ISNULL([ICD10 DESCRIPTION],' ') DIAGNOSIS_DESCRIPTION, 
1 AS 'DIAGNOSIS_CODE_TYPE',
--ISNULL([ICD10 DESCRIPTION],' ') ICD10_DESCR,' ' [CPT_DESCR], 
ISNULL(PHYSICIAN,' ') PHYSICIAN, ' ' PHYSICIAN_NAME,  
ISNULL([Group],''),ISNULL([Group],''), [POU ITEM], [POU DESCRIPTION], [MHS MFGID], AVG(ISNULL([CURRENTITEMCOST],0)) [CURRENTITEMCOST], 
ISNULL(SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED])),0) [TOTALRETURNED],  
DATEPART(YYYY,[performdatewtime]) [YEAR] 
FROM [Item_details] 
WHERE [POU ITEM] IS NOT NULL 
AND ICD10 IS NOT NULL
AND ICD_OUTLIER_Y = 'N'
--AND SERVICE_CODE = 'UROLOGY' AND ICD10 = 'Z43.6' AND PHYSICIAN = 'KOGAN' AND [POU ITEM] = '10884521007819'
GROUP BY SERVICE_CODE, ICD10,[ICD10 DESCRIPTION], PHYSICIAN, [Group], [POU ITEM], [POU DESCRIPTION], [MHS MFGID], DATEPART(YYYY,[performdatewtime])
ORDER BY [POU ITEM]

-------------
update MT_POU_RPT_SUPPLY_COMPARISON_Y set PHYSICIAN_NAME=[ATPAR_MT].[MT_POU_PHYSICIAN].FIRST_NAME
+' ' + [ATPAR_MT].[MT_POU_PHYSICIAN].MIDDLE_INITIAL + ' '+[ATPAR_MT].[MT_POU_PHYSICIAN].LAST_NAME
from MT_POU_RPT_SUPPLY_COMPARISON_Y,[ATPAR_MT].[MT_POU_PHYSICIAN]
where MT_POU_RPT_SUPPLY_COMPARISON_Y.PHYSICIAN_ID=[ATPAR_MT].[MT_POU_PHYSICIAN].PHYSICIAN_ID



----------------------------------By PROCEDURE:---------------------------------------------------------


-------------------------
--ALTER TABLE [Item_details]
--ALTER COLUMN [ICD10] [nvarchar](255) NULL
---------------------


-- BY YEAR (176582) 
-- DELETE FROM MT_POU_RPT_SUPPLY_COMPARISON_Y WHERE DIAGNOSIS_CODE_TYPE = 3 --(297404)
INSERT INTO MT_POU_RPT_SUPPLY_COMPARISON_Y
 ([SPECIALTY_CODE]
,[DIAGNOSIS_CODE]
,[DIAGNOSIS_DESCRIPTION]
,[DIAGNOSIS_CODE_TYPE]
,[PHYSICIAN_ID]
,[PHYSICIAN_NAME]
,[ITEM_GROUP]
,[ITEM_GROUP_DESCRIPTION]
,[ITEM_ID]
,[ITEM_DESCRIPTION]
,[MFR_CATALOG_NO]
,[UNIT_COST]
,[NO_OF_TIMES_ITEM_USED_BY_PHY]
,[YEAR])
SELECT SERVICE_CODE,
-- ' ' ICD10,' ' [CPT_CODE],
ISNULL(PROCEDURE_CODE, ' ') PROCEDURE_CODE, ISNULL(proc_descr,' ') PROCEDURE_DESCR , 3 AS 'DIAGNOSIS_CODE_TYPE',
--' ' ICD10_DESCR,' ' [CPT_DESCR], 
ISNULL(PHYSICIAN,' ') PHYSICIAN, ' ' PHYSICIAN_NAME,  
ISNULL([Group],''),ISNULL([Group],''), [POU ITEM], [POU DESCRIPTION], [MHS MFGID], AVG(ISNULL([CURRENTITEMCOST],0)) [CURRENTITEMCOST], 
ISNULL(SUM((([TOTALCASEPICKQTY] + [TOTAL IN ROOM QTY] + [TOTAL WASTED])) - ([TOTALRETURNED])),0)  TOTAL_ITEM_QTY ,  
DATEPART(YYYY,[performdatewtime]) [YEAR] FROM [Item_details] 
WHERE [POU ITEM] IS NOT NULL 
AND PROC_OUTLIER_Y = 'N'
--AND SERVICE_CODE = 'UROLOGY' AND ICD10 = 'Z43.6' AND PHYSICIAN = 'KOGAN' AND [POU ITEM] = '10884521007819'
GROUP BY SERVICE_CODE, PROCEDURE_CODE,[proc_descr], PHYSICIAN, [Group], [POU ITEM], [POU DESCRIPTION], [MHS MFGID], DATEPART(YYYY,[performdatewtime])
ORDER BY [POU ITEM]

-------------

update MT_POU_RPT_SUPPLY_COMPARISON_Y set PHYSICIAN_NAME=[ATPAR_MT].[MT_POU_PHYSICIAN].FIRST_NAME
+' ' + [ATPAR_MT].[MT_POU_PHYSICIAN].MIDDLE_INITIAL + ' '+[ATPAR_MT].[MT_POU_PHYSICIAN].LAST_NAME
from MT_POU_RPT_SUPPLY_COMPARISON_Y,[ATPAR_MT].[MT_POU_PHYSICIAN]
where MT_POU_RPT_SUPPLY_COMPARISON_Y.PHYSICIAN_ID=[ATPAR_MT].[MT_POU_PHYSICIAN].PHYSICIAN_ID and MT_POU_RPT_SUPPLY_COMPARISON_Y.DIAGNOSIS_CODE_TYPE=3


-- TODO (SR) - need to update Denormalized table 
UPDATE MT_POU_RPT_SUPPLY_COMPARISON_Y 
SET ITEM_GROUP = 'UNKNOWN', 
ITEM_GROUP_DESCRIPTION = 'Unknown' 
WHERE ITEM_GROUP IS NULL OR ITEM_GROUP = '' OR ITEM_GROUP = ' '
--------------------------------



