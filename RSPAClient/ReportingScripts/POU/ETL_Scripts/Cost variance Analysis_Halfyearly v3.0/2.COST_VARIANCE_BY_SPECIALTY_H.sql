------------------COST VARIANCE BY SPECIALTY---------------------------

--By ICD

--INSERT INTO MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H

--BY QUARTER

-- SELECT * FROM MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
-- DELETE FROM MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H where [DIAGNOSIS_CODE_TYPE]=1
INSERT INTO MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
		    ([SPECIALTY_CODE]
           ,[SPECIALTY_DESCRIPTION]
           ,[NO_OF_PROCEDURES]
           ,[NO_OF_PHYSICIANS]
           ,[TOTAL_SPEND]
           ,[TOTAL_VARIANCE]
		   ,[DIAGNOSIS_CODE_TYPE]
		   ,[PERIOD]
           ,[YEAR])
SELECT SPECIALTY_CODE,SPECIALTY_DESCRIPTION, SUM(NO_OF_PROCEDURES), SUM(NO_OF_PHYSICIANS) , SUM([TOTAL_SPEND]), 
SUM([TOTAL_VARIANCE]),[DIAGNOSIS_CODE_TYPE],[PERIOD], [YEAR] 
FROM MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H
WHERE DIAGNOSIS_CODE_TYPE = 1
GROUP BY SPECIALTY_CODE,SPECIALTY_DESCRIPTION,[DIAGNOSIS_CODE_TYPE],[PERIOD],[YEAR]



--By PROCEDURE

------------------COST VARIANCE BY SPECIALTY---------------------------



--INSERT INTO MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H

--BY QUARTER
								--ALTER TABLE TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H1_PROC
								--ALTER COLUMN SERVICE_CODE [nvarchar](255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL

								--ALTER TABLE TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H2_PROC
								--ALTER COLUMN SERVICE_CODE [nvarchar](255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL

								---- SELECT * FROM MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
								---- DELETE FROM MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H WHERE [DIAGNOSIS_CODE_TYPE] = 3
								--INSERT INTO MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
								--			([SPECIALTY_CODE]
								--		   ,[SPECIALTY_DESCRIPTION]
								--		   ,[NO_OF_PROCEDURES]
								--		   ,[NO_OF_PHYSICIANS]
								--		   ,[TOTAL_SPEND]
								--		   ,[TOTAL_VARIANCE]
								--		   ,[DIAGNOSIS_CODE_TYPE]
								--		   ,[PERIOD]
								--		   ,[YEAR])
								--SELECT SPECIALTY_CODE,SPECIALTY_DESCRIPTION, SUM(NO_OF_PROCEDURES), AVG(TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H1_PROC.NO_OF_PHYSICIANS) , SUM([TOTAL_SPEND]), 
								--SUM([TOTAL_VARIANCE]),[DIAGNOSIS_CODE_TYPE],[PERIOD], MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR] 
								--FROM MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H,TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H1_PROC 
								--WHERE DIAGNOSIS_CODE_TYPE = 3
								--AND [PERIOD] <= 6
								--AND MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.SPECIALTY_CODE= TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H1_PROC.SERVICE_CODE
								--AND MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR]= TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H1_PROC.[YEAR]
								--GROUP BY SPECIALTY_CODE,SPECIALTY_DESCRIPTION,[DIAGNOSIS_CODE_TYPE],MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR],[PERIOD]
								--UNION
								--SELECT SPECIALTY_CODE,SPECIALTY_DESCRIPTION, SUM(NO_OF_PROCEDURES), AVG(TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H2_PROC.NO_OF_PHYSICIANS) , SUM([TOTAL_SPEND]), 
								--SUM([TOTAL_VARIANCE]),[DIAGNOSIS_CODE_TYPE],[PERIOD], MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR] 
								--FROM MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H,TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H2_PROC 
								--WHERE DIAGNOSIS_CODE_TYPE = 3
								--AND [PERIOD] >= 7
								--AND MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.SPECIALTY_CODE= TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H2_PROC.SERVICE_CODE
								--AND MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR]= TEMP_PHYSICIAN_COUNT_TAB2_SUMMARY_H2_PROC.[YEAR]
								--GROUP BY SPECIALTY_CODE,SPECIALTY_DESCRIPTION,[DIAGNOSIS_CODE_TYPE],MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H.[YEAR],[PERIOD]




INSERT INTO MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H
		    ([SPECIALTY_CODE]
           ,[SPECIALTY_DESCRIPTION]
           ,[NO_OF_PROCEDURES]
           ,[NO_OF_PHYSICIANS]
           ,[TOTAL_SPEND]
           ,[TOTAL_VARIANCE]
		   ,[DIAGNOSIS_CODE_TYPE]
		   ,[PERIOD]
           ,[YEAR])
SELECT SPECIALTY_CODE,SPECIALTY_DESCRIPTION, SUM(NO_OF_PROCEDURES), SUM(NO_OF_PHYSICIANS) , SUM([TOTAL_SPEND]), 
SUM([TOTAL_VARIANCE]),[DIAGNOSIS_CODE_TYPE],[PERIOD], [YEAR] 
FROM MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H
WHERE DIAGNOSIS_CODE_TYPE = 3
GROUP BY SPECIALTY_CODE,SPECIALTY_DESCRIPTION,[DIAGNOSIS_CODE_TYPE],[PERIOD],[YEAR]