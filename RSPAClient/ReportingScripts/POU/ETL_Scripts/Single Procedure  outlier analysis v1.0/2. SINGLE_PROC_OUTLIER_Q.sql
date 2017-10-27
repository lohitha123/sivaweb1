--Single Procedure outliers quaterly by procedure

-- Before running ---

-- Uncomment the INTO statement and run the entire procedure.

--Anesthesia	NRSPSTIM	BHULLAR	2016	3	2 

select SERVICE_CODE, PROCEDURE_CODE, PHY_ID, 
DATEPART(YYYY,[PERFORM_DATE]) PERIOD,
DATEPART(QUARTER,[PERFORM_DATE]) [QTR]
--,COUNT(PROCEDURE_CODE) 
,COUNT(DISTINCT(CASE_ID)) NO_OF_PROCEDURES 
--INTO SINGLE_PROC_CASES_Q
from [dbo].[RPT_CASE_DATA_12072017]
-- WHERE SERVICE_CODE = 'Anesthesia' AND PROCEDURE_CODE= 'NRSPSTIM' AND PHY_ID = 'BHULLAR'
group by SERVICE_CODE, PROCEDURE_CODE, PHY_ID,
DATEPART(YYYY,[PERFORM_DATE]) , DATEPART(QUARTER,[PERFORM_DATE]) 
--HAVING COUNT(DISTINCT(CASE_ID)) = 1
order by SERVICE_CODE, PROCEDURE_CODE, PHY_ID, 
DATEPART(YYYY,[PERFORM_DATE]), DATEPART(QUARTER,[PERFORM_DATE])

---- VALIDATION FROM TABLE

--select DISTINCT(CASE_ID),SERVICE_CODE,PROCEDURE_CODE,PHY_ID,DATEPART(YYYY,[PERFORM_DATE]) PERIOD,
--DATEPART(QUARTER,[PERFORM_DATE]) [QTR]
-- from [dbo].[RPT_CASE_DATA_12072017]
--WHERE SERVICE_CODE = 'Anesthesia' AND PROCEDURE_CODE= 'NRSPSTIM' AND PHY_ID = 'BHULLAR'

---- Update the Single Procedure outliers QUATERLY by procedure

UPDATE RPT_CASE_DATA_12072017 SET SINGLE_PROC_OUTLIER_Q = 'Y' FROM SINGLE_PROC_CASES_Q
WHERE RPT_CASE_DATA_12072017.SERVICE_CODE = SINGLE_PROC_CASES_Q.SERVICE_CODE
AND RPT_CASE_DATA_12072017.PROCEDURE_CODE = SINGLE_PROC_CASES_Q.PROCEDURE_CODE
AND RPT_CASE_DATA_12072017.PHY_ID=SINGLE_PROC_CASES_Q.PHY_ID
AND DATEPART(YYYY,RPT_CASE_DATA_12072017.PERFORM_DATE) = SINGLE_PROC_CASES_Q.PERIOD

