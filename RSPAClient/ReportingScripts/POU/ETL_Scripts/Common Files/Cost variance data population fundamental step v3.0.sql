-- First export excel file data (ICD,CPT as inpatient,outpatient tables..Then run the following script


alter table RPT_CASE_DATA_12072017 add ICD10 varchar(50)
alter table RPT_CASE_DATA_12072017 add CPT1 varchar(50)
alter table RPT_CASE_DATA_12072017 add CPT2 varchar(50)
alter table RPT_CASE_DATA_12072017 add CPT3 varchar(50)



update RPT_CASE_DATA_12072017 set ICD10=inpatient.[Primary ICD10 Procedure Code]
from RPT_CASE_DATA_12072017,inpatient
where RPT_CASE_DATA_12072017.ENCOUNTER_ID=inpatient.ECD
--and RPT_CASE_DATA_12072017.PERFORM_DATE=inpatient.PERFORM_DATE
and datepart(yyyy,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(yyyy,Inpatient.PERFORM_DATE)
and datepart(MM,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(MM,Inpatient.PERFORM_DATE)
and datepart(DD,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(DD,Inpatient.PERFORM_DATE)



update RPT_CASE_DATA_12072017 set cpt1=outpatient.[cpt1],cpt2=outpatient.[cpt2],cpt3=outpatient.[cpt3] from RPT_CASE_DATA_12072017,outpatient
where RPT_CASE_DATA_12072017.ENCOUNTER_ID=outpatient.ECD
--and RPT_CASE_DATA_12072017.PERFORM_DATE=inpatient.PERFORM_DATE
and datepart(yyyy,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(yyyy,outpatient.PERFORM_DATE)
and datepart(MM,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(MM,outpatient.PERFORM_DATE)
and datepart(DD,[RPT_CASE_DATA_12072017].PERFORM_DATE)=datepart(DD,outpatient.PERFORM_DATE)

drop table [Item_details]

CREATE TABLE Item_details(
	[EXCLUDE MARKER] [nvarchar](255) NULL,
	[Group] [nvarchar](255) NULL,
	[Group MW] [nvarchar](255) NULL,
	[Generic Combined] [nvarchar](255) NULL,
	[Generic Code Item] [nvarchar](255) NULL,
	[PHYSICIAN] [nvarchar](255) NULL,
	[SURGE_DESCIPTION] [nvarchar](255) NULL,
	[SURGE_DESCIPTION_orig] [nvarchar](255) NULL,
	[SURG_LASTNAME] [nvarchar](255) NULL,
	[PROCEDURE_CODE] [nvarchar](255) NULL,
	[PREF_LIST_ID] [nvarchar](255) NULL,
	[SERVICE_CODE] [nvarchar](255) NULL,
	[proc_descr] [nvarchar](255) NULL,
	[POU ITEM] [nvarchar](255) NULL,
	[Item Number Type] [nvarchar](255) NULL,
	[OriginalPOUItemNum] [nvarchar](255) NULL,
	[POU DESCRIPTION] [nvarchar](255) NULL,
	[CURRENTITEMCOST] [money] NULL,
	[TOTALCASES] [float] NULL,
	[PREFCARDOPENQTY] [float] NULL,
	[PREFCARDHOLDQTY] [float] NULL,
	[TOTAL CASE QTY] [float] NULL,
	[TOTALCASEPICKQTY] [float] NULL,
	[TOTAL IN ROOM QTY] [float] NULL,
	[TOTALRETURNED] [float] NULL,
	[TOTAL WASTED] [float] NULL,
	[AVGCASEPICKQTY] [float] NULL,
	[AVG_INROOM_QTY] [float] NULL,
	[AVGQTYRETURNED] [float] NULL,
	[AVGQTYWASTED] [float] NULL,
	[AVGQTYUSED] [float] NULL,
	[AVGUSEDCOST] [float] NULL,
	[ITEM#] [nvarchar](255) NULL,
	[DESCRIPTION] [nvarchar](255) NULL,
	[UNSPC Description] [nvarchar](255) NULL,
	[MHS MFG] [nvarchar](255) NULL,
	[MHS MFGID] [nvarchar](255) NULL,
	[Unit LUM Cost-AMC] [money] NULL,
	[Consignment] [nvarchar](255) NULL,
	[Alt Match] [nvarchar](255) NULL,
	[ECD] [nvarchar](255) NULL,
	[Encounter Type] [nvarchar](255) NULL,
	[CASEID] [nvarchar](255) NULL,
	[PERFORMDATE] [datetime] NULL,
	[performdatewtime] [nvarchar](255) NULL,
	[ICD10] [nvarchar](255) NULL,
	[APR-DRG] [nvarchar](255) NULL,
	[MS-DRG] [nvarchar](255) NULL,
	[MS-DRG orig] [nvarchar](255) NULL,
	[CPT MARKER] [nvarchar](255) NULL,
	[CPT] [nvarchar](255) NULL,
	[CPT1] [nvarchar](255) NULL,
	[CPT2] [nvarchar](255) NULL,
	[CPT3] [nvarchar](255) NULL,
	[CPT4] [nvarchar](255) NULL,
	[CPT5] [nvarchar](255) NULL,
	[Total Net Cost] [money] NULL,
	[Total Net Usage] [float] NULL,
	[TARGETCODE] [nvarchar](255) NULL,
	[TARGETCODE TYPE] [nvarchar](255) NULL,
	[TRANSACTION_ID] [nvarchar](255) NULL,
	[LINE_NO] [nvarchar](255) NULL,
	[TEMPFIELD] [datetime] NULL,
	[Multi_Surgeon] [nvarchar](255) NULL,
	[MULTI_PROCEDURE] [nvarchar](255) NULL,
	[ICD10 DESCRIPTION] [nvarchar](255) NULL,
	[APR DRG DESCRIPTION] [nvarchar](255) NULL,
	[APR SEVERITY] [nvarchar](255) NULL,
	[MS DRG DESCRIPTION] [nvarchar](255) NULL,
	[CPD1 DESCRIPTION] [nvarchar](255) NULL,
	[CPT2 DESCRIPTION] [nvarchar](255) NULL,
	[CPT3 DESCRIPTION] [nvarchar](255) NULL,
	[MOD 1 CPT1] [nvarchar](255) NULL,
	[MOD 2 CPT1] [nvarchar](255) NULL,
	[MOD 1 CPT2] [nvarchar](255) NULL,
	[MOD 2 CPT2] [nvarchar](255) NULL,
	[MOD 1 CPT3] [nvarchar](255) NULL,
	[P-Card Status] [nvarchar](255) NULL,
	[PICK VALUE] [money] NULL,
	[ISSUE VALUE] [money] NULL,
	[RETURN VALUE] [money] NULL,
	[GROUPING] [nvarchar](255) NULL,
	[PATIENT_ID] [nvarchar](255) NULL,
	[LawsonItemNum] [nvarchar](255) NULL,
	[PrefCardItem] [nvarchar](255) NULL,
	[PrefCardMarker] [nvarchar](255) NULL,
	[EscludeMarkerOrig] [nvarchar](255) NULL,
	[PickMarker] [nvarchar](255) NULL,
	[ICD10-Normalized] [nvarchar](255) NULL,
	[DataSetMarker] [nvarchar](255) NULL,
	[PCSINPATIENTMATCH] [nvarchar](255) NULL,
	[PCSOUTPATIENTMATCH] [nvarchar](255) NULL,
	[PCS_ECD] [nvarchar](255) NULL,
	[PCS_PICISCaseRecordID] [nvarchar](255) NULL,
	[PCS_PERFORM_DATE] [datetime] NULL,
	[PCS_PhysicianNm] [nvarchar](255) NULL,
	[PCS_PHYSICIANLASTNAME] [nvarchar](255) NULL,
	[PCS] [nvarchar](255) NULL,
	[PCS1] [nvarchar](255) NULL,
	[PCS2] [nvarchar](255) NULL,
	[PCS3] [nvarchar](255) NULL,
	[PCS4] [nvarchar](255) NULL,
	[PCS5] [nvarchar](255) NULL,
	[PCS6] [nvarchar](255) NULL,
	[PCS7] [nvarchar](255) NULL,
	[PCS8] [nvarchar](255) NULL,
	[PCS9] [nvarchar](255) NULL,
	[PCS10] [nvarchar](255) NULL
) ON [PRIMARY]

GO

alter table Item_details add PROC_OUTLIER_Y CHAR(1)
alter table Item_details add PROC_OUTLIER_H CHAR(1)
alter table Item_details add PROC_OUTLIER_Q CHAR(1)
alter table Item_details add PROC_OUTLIER_M CHAR(1)

alter table Item_details add ICD_OUTLIER_Y CHAR(1)
alter table Item_details add ICD_OUTLIER_H CHAR(1)
alter table Item_details add ICD_OUTLIER_Q CHAR(1)
alter table Item_details add ICD_OUTLIER_M CHAR(1)

alter table Item_details add CPT_OUTLIER_Y CHAR(1)
alter table Item_details add CPT_OUTLIER_H CHAR(1)
alter table Item_details add CPT_OUTLIER_Q CHAR(1)
alter table Item_details add CPT_OUTLIER_M CHAR(1)


--select count(*) from [Item_details]


--truncate table [Item_details]


insert into Item_details(PROCEDURE_CODE,SERVICE_CODE,PHYSICIAN,TOTALCASEPICKQTY,[TOTAL IN ROOM QTY],[TOTAL WASTED],
TOTALRETURNED,CURRENTITEMCOST,performdatewtime,CASEID,[Group],[POU ITEM],[POU DESCRIPTION],[MHS MFGID],ICD10,[ICD10 DESCRIPTION],CPT1,CPT2,CPT3
,PROC_OUTLIER_Y, PROC_OUTLIER_H, PROC_OUTLIER_Q, PROC_OUTLIER_M
,ICD_OUTLIER_Y, ICD_OUTLIER_H, ICD_OUTLIER_Q, ICD_OUTLIER_M
,CPT_OUTLIER_Y, CPT_OUTLIER_H, CPT_OUTLIER_Q, CPT_OUTLIER_M)
--PROCEDURE_CODE,SERVICE_CODE,PHYSICIAN_ID,TOTALCASEPICKQTY,[TOTAL IN ROOM QTY],[TOTAL WASTED],TOTALRETURNED,
select PROCEDURE_CODE,SERVICE_CODE,PHY_ID,ITEM_COUNT,ISSUE_QTY,WASTAGE_QTY,RETURN_QTY,ITEM_PRICE,PERFORM_DATE,CASE_ID,
item_group,ITEM_ID,ITEM_DESCRIPTION,MFG_ITEM_ID,ICD10,ICD10,CPT1,CPT2,CPT3
,PROC_OUTLIER_Y, PROC_OUTLIER_H, PROC_OUTLIER_Q, PROC_OUTLIER_M
,ICD_OUTLIER_Y, ICD_OUTLIER_H, ICD_OUTLIER_Q, ICD_OUTLIER_M
,CPT_OUTLIER_Y, CPT_OUTLIER_H, CPT_OUTLIER_Q, CPT_OUTLIER_M 
from [dbo].[RPT_CASE_DATA_12072017] 
where 
--outlier_flag='N' and 
(datastatus='' or datastatus is null)

--spcialty description null update

--Mark cases as outliered if, count(*)=1 group by SERVICE_CODE, PROCEDURE_CODE, PHYSICIAN, YEAR
 
 update Item_details set [ICD10 DESCRIPTION]=inpatient.ICD10PX_PCS_DSC from Item_details,inpatient
where Item_details.ICD10=inpatient.[Primary ICD10 Procedure Code]

--update Item_details set [ICD10 DESCRIPTION]=inpatient.ICD10PX_PCS_DSC from Item_details,inpatient
--where Item_details.ICD10=inpatient.ICD10
-- SELECT * FROM Item_details WHERE proc_descr IS NULL OR proc_descr = ''
update Item_details set proc_descr=ATPAR_MT.MT_POU_PROCEDURE_CODE.DESCRIPTION from Item_details,ATPAR_MT.MT_POU_PROCEDURE_CODE
where Item_details.PROCEDURE_CODE=ATPAR_MT.MT_POU_PROCEDURE_CODE.PROCEDURE_CODE and 
Item_details.SERVICE_CODE=ATPAR_MT.MT_POU_PROCEDURE_CODE.SPECIALTY_CODE

-- SELECT TOP 10 * FROM Item_details WHERE SURGE_DESCIPTION_orig IS NULL OR SURGE_DESCIPTION_orig = ''
update Item_details set SURGE_DESCIPTION_orig=[ATPAR_MT].[MT_POU_PHYSICIAN].FIRST_NAME
+' ' + [ATPAR_MT].[MT_POU_PHYSICIAN].MIDDLE_INITIAL + ' '+[ATPAR_MT].[MT_POU_PHYSICIAN].LAST_NAME
from Item_details,[ATPAR_MT].[MT_POU_PHYSICIAN]
where Item_details.PHYSICIAN=[ATPAR_MT].[MT_POU_PHYSICIAN].PHYSICIAN_ID

alter table Item_details add CPT_CODE varchar(200)
alter table Item_details add CPT_DESCRIPTION varchar(2000)

update Item_details set CPT_CODE=CPT1 where CPT1 is not null 

--- (589934 row(s) affected)

update Item_details set CPT_CODE=isnull(CPT_CODE,'')+CPT2 where CPT_CODE is null and CPT2 is not null

update Item_details set CPT_CODE=isnull(CPT_CODE,'')+' | '+CPT2 where CPT_CODE is not null and CPT2 is not null

update Item_details set CPT_CODE=isnull(CPT_CODE,'')+CPT3 where CPT_CODE is null and CPT3 is not null

update Item_details set CPT_CODE=isnull(CPT_CODE,'')+' | '+CPT3 where CPT_CODE is not null and CPT3 is not null


--select CPT_CODE from Item_details where CPT_CODE is not null