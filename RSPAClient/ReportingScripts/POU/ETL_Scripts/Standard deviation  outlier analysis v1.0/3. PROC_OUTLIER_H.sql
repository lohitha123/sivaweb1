
-- alter table CASEOUTLIERS add PROC_OUTLIER_H varchar(1)

--- Create Stored procedure for Standard deviation outlier logic

create procedure PROC_OUTLIER_H as 
begin
DECLARE @Specialty NVARCHAR(50)
DECLARE @Procedure NVARCHAR(50)
declare @meanX as float
declare @standardDeviationX as float
declare @newmeanX as float
declare @newstandardDeviationX as float

--ALTER TABLE [CASEOUTLIERS] ADD outlier_flag NVARCHAR(10)

Declare SpecialtyCursor cursor for 

select [SPECIALTY_CODE],[PROCEDURE_CODE] FROM [CASEOUTLIERS] where SINGLE_PROC_OUTLIER_H = 'N'

open SpecialtyCursor

Fetch Next from SpecialtyCursor into @Specialty,@Procedure

while (@@Fetch_status = 0)

Begin

--select @Specialty = select [SPECIALTY_CODE] FROM [CASEOUTLIERS]

--select @Procedure = [PROCEDURE_CODE] FROM [CASEOUTLIERS]

set @meanX=(select avg([TOTAL_USAGE]) FROM [CASEOUTLIERS] where [SPECIALTY_CODE] = @Specialty and [PROCEDURE_CODE] = @procedure)

set @standardDeviationX=(select stdev([TOTAL_USAGE]) FROM [CASEOUTLIERS] where [SPECIALTY_CODE] = @Specialty and [PROCEDURE_CODE] = @procedure)

set @newmeanX= (select avg([TOTAL_USAGE]) FROM [CASEOUTLIERS] where 
[TOTAL_USAGE] < ABS((CASE WHEN ROUND(@meanX/@standardDeviationX,0) <= 2 THEN 2 ELSE (ROUND((@meanX/@standardDeviationX)/2,0)) END)* @standardDeviationX) + @meanX and [SPECIALTY_CODE] = @Specialty and [PROCEDURE_CODE] = @procedure) 

set @newstandardDeviationX=(select stdev([TOTAL_USAGE]) FROM [CASEOUTLIERS] where 
[TOTAL_USAGE] < ABS((CASE WHEN ROUND(@meanX/@standardDeviationX,0) <= 2 THEN 2 ELSE (ROUND((@meanX/@standardDeviationX)/2,0)) END)* @standardDeviationX) + @meanX and [SPECIALTY_CODE] = @Specialty and [PROCEDURE_CODE] = @procedure)

--PRINT(@meanX)
--PRINT(@standardDeviationX)
--PRINT(@newmeanX)
--PRINT(@newstandardDeviationX)
update CASEOUTLIERS SET PROC_OUTLIER_H = CASE WHEN ([TOTAL_USAGE] < ABS((CASE WHEN ROUND(@newmeanX/@newstandardDeviationX,0) <= 2 THEN 2 ELSE 3 END)* @newstandardDeviationX) - @newmeanX) THEN 'Y' ELSE 'N' END FROM [CASEOUTLIERS] where [SPECIALTY_CODE] = @Specialty and [PROCEDURE_CODE] = @procedure
Fetch Next from SpecialtyCursor into @Specialty,@Procedure
end
close SpecialtyCursor
deallocate SpecialtyCursor
end

-- Execute Store procedure

exec PROC_OUTLIER_H

-- Drop stored procedure

drop proc PROC_OUTLIER_H

