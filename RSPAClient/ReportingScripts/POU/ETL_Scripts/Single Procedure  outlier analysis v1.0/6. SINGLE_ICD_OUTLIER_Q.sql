--Single Procedure outliers Quaterly by ICD

-- Before running ---

-- Uncomment the INTO statement and run the entire procedure.

select SERVICE_CODE, [ICD10], PHY_ID, 
DATEPART(YYYY,[PERFORM_DATE]) PERIOD
--,COUNT([ICD10]) 
,COUNT(DISTINCT(CASE_ID)) NO_OF_PROCEDURES 
-- INTO SINGLE_ICD_CASES_Q
from [dbo].[RPT_CASE_DATA_12072017]
-- WHERE SERVICE_CODE = 'Cardiac' AND [ICD10]= 'CTAODI' AND PHY_ID = 'SAMYS'
group by SERVICE_CODE, [ICD10], PHY_ID,
DATEPART(YYYY,[PERFORM_DATE]) 
--HAVING COUNT(DISTINCT(CASE_ID)) = 1
order by SERVICE_CODE, [ICD10], PHY_ID, 
DATEPART(YYYY,[PERFORM_DATE])

---- VALIDATION FROM TABLE

--select DISTINCT(CASE_ID),SERVICE_CODE,[ICD10],PHY_ID,DATEPART(YYYY,[PERFORM_DATE]) PERIOD
-- from [dbo].[RPT_CASE_DATA_12072017]
--WHERE SERVICE_CODE = 'Cardiac' AND [ICD10]= 'CTAODI' AND PHY_ID = 'SAMYS'

---- Update the Single Procedure outliers yearly by procedure

UPDATE RPT_CASE_DATA_12072017 SET SINGLE_ICD_OUTLIER_Q = 'Y' FROM SINGLE_ICD_CASES_Q
WHERE RPT_CASE_DATA_12072017.SERVICE_CODE = SINGLE_ICD_CASES_Q.SERVICE_CODE
AND RPT_CASE_DATA_12072017.[ICD10] = SINGLE_ICD_CASES_Q.[ICD10]
AND RPT_CASE_DATA_12072017.PHY_ID=SINGLE_ICD_CASES_Q.PHY_ID
AND DATEPART(YYYY,RPT_CASE_DATA_12072017.PERFORM_DATE) = SINGLE_ICD_CASES_Q.PERIOD



