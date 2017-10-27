/*  --------------------------------------------------------------------------------------------
	
	Author  : Kranthi Varma P
	Date    : 4/4/2017
	Purpose : Creating tables for Izenda Config.
 	
--------------------------------------------------------------------------------------------------	
*/	


IF object_id('ATPAR_REP_CONFIG_SP_TABLES_PATCH30') IS NOT NULL
DROP PROCEDURE ATPAR_REP_CONFIG_SP_TABLES_PATCH30
GO

CREATE PROCEDURE ATPAR_REP_CONFIG_SP_TABLES_PATCH30
AS 

BEGIN

	DECLARE @intReturn int
	SET @intReturn =0
	
	
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaAccessRight') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaAccessRight](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Type] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaAdvancedSetting') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaAdvancedSetting](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Value] [nvarchar](2048) NULL,
	[DefaultValue] [nvarchar](256) NULL,
	[Type] [nvarchar](50) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING OFF


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaCity') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaCity](
	[GeonameId] [varchar](10) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[AsciiName] [nvarchar](255) NULL,
	[AlternateNames] [nvarchar](255) NULL,
	[Latitude] [varchar](15) NULL,
	[Longitude] [varchar](15) NULL,
	[FeatureClasss] [nvarchar](255) NULL,
	[FeatureCode] [nvarchar](255) NULL,
	[CountryCode] [nvarchar](255) NULL,
	[Cc2] [nvarchar](255) NULL,
	[Admin1Code] [varchar](10) NULL,
	[Admin2Code] [nvarchar](255) NULL,
	[Admin3Code] [nvarchar](255) NULL,
	[Admin4Code] [nvarchar](255) NULL,
	[Population] [varchar](10) NULL,
	[Elevation] [varchar](10) NULL,
	[Dem] [varchar](10) NULL,
	[Timezone] [nvarchar](255) NULL,
	[ModificationDate] [datetime] NULL
) ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING OFF


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaCommonFilterField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaCommonFilterField](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](1000) NULL,
	[DisplayName] [varchar](256) NULL,
	[Value] [varchar](max) NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[OperatorSetting] [nvarchar](100) NULL,
	[DataType] [nvarchar](50) NULL,
	[DashboardId] [uniqueidentifier] NULL,
	[Position] [int] NULL,
	[FilterFieldContent] [varchar](max) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaConnection') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaConnection](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[ServerTypeId] [uniqueidentifier] NOT NULL,
	[ConnectionString] [nvarchar](500) NULL,
	[Visible] [bit] NULL,
	[Deleted] [bit] NULL,
	[RelateToConnectionId] [uniqueidentifier] NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Color] [nvarchar](10) NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_Connection] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDashboard') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDashboard](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[SubCategoryId] [uniqueidentifier] NULL,
	[TenantId] [uniqueidentifier] NULL,
	[ImageUrl] [nvarchar](2048) NULL,
	[StretchImage] [bit] NULL,
	[BackgroundColor] [nvarchar](50) NULL,
	[ShowFilterDescription] [bit] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[Owner] [nvarchar](256) NULL,
	[LastViewed] [datetime] NULL,
	[NumberOfView] [bigint] NULL,
	[RenderingTime] [float] NULL,
	[OwnerId] [uniqueidentifier] NULL,
	[CreatedById] [uniqueidentifier] NULL,
	[ModifiedById] [uniqueidentifier] NULL,
	[SourceId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDashboardPart') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDashboardPart](
	[Id] [uniqueidentifier] NOT NULL,
	[DashboardId] [uniqueidentifier] NULL,
	[Type] [nvarchar](50) NULL,
	[Title] [nvarchar](256) NULL,
	[ReportId] [uniqueidentifier] NULL,
	[ReportPartId] [uniqueidentifier] NULL,
	[NumberOfRecord] [int] NULL,
	[FilterDescription] [nvarchar](max) NULL,
	[Content] [nvarchar](max) NULL,
	[PositionX] [int] NULL,
	[PositionY] [int] NULL,
	[Width] [int] NULL,
	[Height] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[SourceId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDashboardPartFilterField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDashboardPartFilterField](
	[Id] [uniqueidentifier] NOT NULL,
	[FilterFieldId] [uniqueidentifier] NULL,
	[Value] [nvarchar](max) NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[OperatorSetting] [nvarchar](100) NULL,
	[DashboardPartId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDataFormat') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDataFormat](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Format] [nvarchar](100) NULL,
	[Description] [nvarchar](256) NULL,
	[Category] [nvarchar](100) NULL,
	[SubCategory] [nvarchar](100) NULL,
	[DataType] [nvarchar](50) NULL,
	[AllowFilter] [bit] NULL,
	[AllowFieldProperty] [bit] NULL,
	[GroupBy] [nvarchar](50) NULL,
	[FormatDataType] [nvarchar](50) NULL,
	[Position] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaDataFormat] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDataSourceCategory') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDataSourceCategory](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Deleted] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaDataSourceCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDataTypeFunctionMapping') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDataTypeFunctionMapping](
	[Id] [uniqueidentifier] NOT NULL,
	[DataType] [nvarchar](50) NOT NULL,
	[FunctionId] [uniqueidentifier] NOT NULL,
	[FormatDataType] [nvarchar](50) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaDataTypeFunctionMapping] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaDBVersion') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaDBVersion](
	[Version] [nvarchar](16) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Version] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaEmailSetting') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaEmailSetting](
	[Id] [uniqueidentifier] NOT NULL,
	[DisplayName] [nvarchar](256) NULL,
	[EmailFromAddress] [nvarchar](256) NULL,
	[UseSystemConfiguration] [bit] NULL,
	[Server] [nvarchar](256) NULL,
	[Port] [int] NULL,
	[SecureConnection] [bit] NULL,
	[Login] [nvarchar](256) NULL,
	[Password] [nvarchar](500) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaExportMarginDefaultValue') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaExportMarginDefaultValue](
	[Id] [uniqueidentifier] NOT NULL,
	[Type] [int] NOT NULL,
	[TopValue] [float] NULL,
	[BottomValue] [float] NULL,
	[LeftValue] [float] NULL,
	[RightValue] [float] NULL,
	[HeaderValue] [float] NULL,
	[FooterValue] [float] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaFilterField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaFilterField](
	[Id] [uniqueidentifier] NOT NULL,
	[FilterId] [uniqueidentifier] NULL,
	[QuerySourceFieldId] [uniqueidentifier] NULL,
	[QuerySourceId] [uniqueidentifier] NULL,
	[QuerySourceType] [nvarchar](50) NULL,
	[RelationshipId] [uniqueidentifier] NULL,
	[Position] [int] NULL,
	[Alias] [nvarchar](256) NULL,
	[ReportFieldAlias] [nvarchar](256) NULL,
	[ReportPartTitle] [nvarchar](256) NULL,
	[Visible] [bit] NULL,
	[Required] [bit] NULL,
	[Cascading] [bit] NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[OperatorSetting] [nvarchar](100) NULL,
	[Value] [nvarchar](max) NULL,
	[DataFormatId] [uniqueidentifier] NULL,
	[FontFamily] [nvarchar](50) NULL,
	[FontSize] [int] NULL,
	[TextColor] [nvarchar](10) NULL,
	[BackgroundColor] [nvarchar](10) NULL,
	[FontBold] [bit] NULL,
	[FontItalic] [bit] NULL,
	[FontUnderline] [bit] NULL,
	[SortType] [nvarchar](10) NULL,
	[Deleted] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaFilterField] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaFilterOperator') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaFilterOperator](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Label] [nvarchar](256) NULL,
	[OperatorGroupId] [uniqueidentifier] NULL,
	[AllowParameter] [bit] NULL,
	[Position] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaFilterOperator] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaFilterOperatorGroup') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaFilterOperatorGroup](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaFilterOperatorGroup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaFilterOperatorRule') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaFilterOperatorRule](
	[Id] [uniqueidentifier] NOT NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[AllowNull] [bit] NULL,
	[IsPairedValues] [bit] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaFilterOperatorRule] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaFunction') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaFunction](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](256) NOT NULL,
	[Expression] [nvarchar](256) NULL,
	[SubTotal] [bit] NULL,
	[GrandTotal] [bit] NULL,
	[FieldProperty] [bit] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaFunction] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaLanguage') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaLanguage](
	[Id] [uniqueidentifier] NULL,
	[Language] [nvarchar](150) NULL,
	[CultureName] [nvarchar](20) NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](150) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](150) NULL,
	[Deleted] [bit] NULL
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaLicenseSetting') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaLicenseSetting](
	[Id] [uniqueidentifier] NOT NULL,
	[Online] [bit] NULL,
	[LicenseKey] [nvarchar](max) NULL,
	[Token] [nvarchar](max) NULL,
	[LastRefresh] [datetime] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_License] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaPasswordHistory') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaPasswordHistory](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NULL,
	[PasswordHash] [nvarchar](256) NULL,
	[PasswordSalt] [nvarchar](256) NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Deleted] [bit] NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaPerformanceStatsTrend') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaPerformanceStatsTrend](
	[Id] [uniqueidentifier] NOT NULL,
	[NumberOfCore] [int] NULL,
	[NumberOfServer] [int] NULL,
	[NumberOfReport] [bigint] NULL,
	[NumberOfReportCreator] [bigint] NULL,
	[NumberOfDashboard] [bigint] NULL,
	[NumberOfDashboardCreator] [bigint] NULL,
	[NumberOfReportView] [bigint] NULL,
	[NumberOfDashboardView] [bigint] NULL,
	[NumberOfActiveTenant] [bigint] NULL,
	[NumberOfInactiveTenant] [bigint] NULL,
	[NumberOfActiveUser] [bigint] NULL,
	[NumberOfInactiveUser] [bigint] NULL,
	[NumberOfCreateReportUser] [bigint] NULL,
	[NumberOfCreateDashboardUser] [bigint] NULL,
	[IzendaVersion] [nvarchar](100) NULL,
	[IzendaConfigurationDatabase] [nvarchar](256) NULL,
	[DatabaseTypesInUse] [nvarchar](max) NULL,
	[ClientLicenseKey] [nvarchar](max) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING OFF


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaPostalCode') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaPostalCode](
	[PostalCode] [varchar](10) NOT NULL,
	[PlaceName] [nvarchar](255) NULL,
	[Province] [nvarchar](255) NULL,
	[Latitude] [varchar](15) NULL,
	[Longitude] [varchar](15) NULL
) ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaQuerySource') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaQuerySource](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Type] [nvarchar](50) NULL,
	[Selected] [bit] NULL,
	[Deleted] [bit] NULL,
	[ParentQuerySourceId] [uniqueidentifier] NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[DataSourceCategoryId] [uniqueidentifier] NULL,
	[Alias] [nvarchar](256) NULL,
	[ExtendedProperties] [nvarchar](4000) NULL,
	[PhysicalChange] [int] NULL,
	[Approval] [int] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_QuerySource] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaQuerySourceCategory') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaQuerySourceCategory](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[ParentCategoryId] [uniqueidentifier] NULL,
	[ConnectionId] [uniqueidentifier] NOT NULL,
	[Deleted] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_QuerySourceCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaQuerySourceField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaQuerySourceField](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[DataType] [nvarchar](50) NULL,
	[IzendaDataType] [nvarchar](50) NULL,
	[AllowDistinct] [bit] NULL,
	[Alias] [nvarchar](256) NULL,
	[Visible] [bit] NULL,
	[Filterable] [bit] NULL,
	[QuerySourceId] [uniqueidentifier] NULL,
	[Deleted] [bit] NULL,
	[ParentId] [uniqueidentifier] NULL,
	[Type] [int] NULL,
	[GroupPosition] [int] NULL,
	[Position] [int] NULL,
	[FilteredValue] [nvarchar](max) NULL,
	[ExtendedProperties] [nvarchar](max) NULL,
	[MatchedTenant] [bit] NULL,
	[PhysicalChange] [int] NULL,
	[Approval] [int] NULL,
	[FunctionName] [nvarchar](256) NULL,
	[Expression] [nvarchar](500) NULL,
	[ReportId] [uniqueidentifier] NULL,
	[IsCalculated] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaQuerySourceField] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaRelationship') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaRelationship](
	[Id] [uniqueidentifier] NOT NULL,
	[JoinQuerySourceId] [uniqueidentifier] NOT NULL,
	[ForeignQuerySourceId] [uniqueidentifier] NOT NULL,
	[JoinFieldId] [uniqueidentifier] NULL,
	[ForeignFieldId] [uniqueidentifier] NULL,
	[Alias] [nvarchar](256) NULL,
	[SystemRelationship] [bit] NULL,
	[JoinType] [nvarchar](50) NULL,
	[ParentRelationshipId] [uniqueidentifier] NULL,
	[ReportId] [uniqueidentifier] NULL,
	[ForeignAlias] [nvarchar](256) NULL,
	[RelationshipPosition] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaRelationship] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaRelationshipKeyJoin') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaRelationshipKeyJoin](
	[Id] [uniqueidentifier] NOT NULL,
	[RelationshipId] [uniqueidentifier] NOT NULL,
	[JoinQuerySourceId] [uniqueidentifier] NOT NULL,
	[ForeignQuerySourceId] [uniqueidentifier] NOT NULL,
	[JoinFieldId] [uniqueidentifier] NOT NULL,
	[ForeignFieldId] [uniqueidentifier] NOT NULL,
	[Operator] [nvarchar](50) NOT NULL,
	[JoinSourceAlias] [nvarchar](256) NULL,
	[ForeignSourceAlias] [nvarchar](256) NULL,
	[Position] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaRelationshipKeyJoin] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReport') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReport](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Type] [int] NOT NULL,
	[PreviewRecord] [int] NOT NULL,
	[AdvancedMode] [bit] NOT NULL,
	[AllowNulls] [bit] NOT NULL,
	[IsDistinct] [bit] NOT NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[SubCategoryId] [uniqueidentifier] NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Description] [nvarchar](max) NULL,
	[HeaderContent] [nvarchar](max) NULL,
	[FooterContent] [nvarchar](max) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[LastViewed] [datetime] NULL,
	[Owner] [nvarchar](256) NULL,
	[OwnerId] [uniqueidentifier] NULL,
	[Title] [nvarchar](256) NULL,
	[TitleDescriptionContent] [nvarchar](max) NULL,
	[ExcludedRelationships] [nvarchar](max) NULL,
	[NumberOfView] [bigint] NULL,
	[RenderingTime] [float] NULL,
	[CreatedById] [uniqueidentifier] NULL,
	[ModifiedById] [uniqueidentifier] NULL,
	[ExportFormatSettingData] [nvarchar](max) NULL,
	[SnapToGrid] [bit] NULL,
	[UsingFields] [nvarchar](max) NULL,
	[SourceId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportCategory') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportCategory](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Type] [int] NOT NULL,
	[ParentId] [uniqueidentifier] NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportDataSource') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportDataSource](
	[Id] [uniqueidentifier] NOT NULL,
	[QuerySourceId] [uniqueidentifier] NOT NULL,
	[ReportId] [uniqueidentifier] NOT NULL,
	[Deleted] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportFilter') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportFilter](
	[Id] [uniqueidentifier] NOT NULL,
	[Logic] [nvarchar](2000) NULL,
	[Visible] [bit] NULL,
	[ReportId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaReportFilter] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportHistory') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportHistory](
	[Id] [uniqueidentifier] NOT NULL,
	[ReportId] [uniqueidentifier] NOT NULL,
	[ReportName] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Definition] [nvarchar](max) NOT NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportPart') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportPart](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](256) NOT NULL,
	[PositionX] [int] NULL,
	[PositionY] [int] NULL,
	[Width] [int] NULL,
	[Height] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[NumberOfRecord] [int] NULL,
	[ReportId] [uniqueidentifier] NOT NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[SourceId] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaReportSetting') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaReportSetting](
	[Id] [uniqueidentifier] NOT NULL,
	[EnforceVersionHistory] [bit] NULL,
	[NumOfArchivedVersionToKeep] [int] NULL,
	[RemoveArchivedVersions] [bit] NULL,
	[RecurrentReportSettingData] [nvarchar](max) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[IsScheduled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaRole') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaRole](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[PermissionData] [nvarchar](max) NULL,
	[QuerySources] [nvarchar](max) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Active] [bit] NULL,
	[Deleted] [bit] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSecurityPolicy') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSecurityPolicy](
	[Id] [uniqueidentifier] NOT NULL,
	[MinNumberOfPasswordLenght] [int] NULL,
	[MaxNumberOfPasswordLenght] [int] NULL,
	[MinNumberOfSpecialCharacter] [int] NULL,
	[MaxNumberOfSpecialCharacter] [int] NULL,
	[MinNumberOfUppercaseCharacter] [int] NULL,
	[MaxNumberOfUppercaseCharacter] [int] NULL,
	[MinNumberOfLowercaseCharacter] [int] NULL,
	[MaxNumberOfLowercaseCharacter] [int] NULL,
	[MinNumberOfNumericCharacter] [int] NULL,
	[MaxNumberOfNumericCharacter] [int] NULL,
	[MaxNumberOfRepeatSequential] [int] NULL,
	[MinNumberOfPasswordAge] [int] NULL,
	[MaxNumberOfPasswordAge] [int] NULL,
	[NotifyUseDuring] [int] NULL,
	[NumberOfPasswordToKeep] [int] NULL,
	[PasswordLinkValidity] [int] NULL,
	[NumberOfQuestionProfile] [int] NULL,
	[NumberOfQuestionResetPassword] [int] NULL,
	[NumberOfFailedLogonAllowed] [int] NULL,
	[NumberOfFailedAnswerAllowed] [int] NULL,
	[LockoutPeriod] [int] NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSecurityQuestion') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSecurityQuestion](
	[Id] [uniqueidentifier] NOT NULL,
	[Question] [nvarchar](max) NOT NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[OrderNumber] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaServer') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaServer](
	[Id] [uniqueidentifier] NOT NULL,
	[ServerName] [nvarchar](1000) NULL,
	[ServerCore] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSubsCommonFilterField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSubsCommonFilterField](
	[Id] [uniqueidentifier] NOT NULL,
	[CommonFilterFieldId] [uniqueidentifier] NULL,
	[Value] [nvarchar](max) NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[OperatorSetting] [nvarchar](100) NULL,
	[SubscriptionId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSubscription') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSubscription](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Schedule] [nvarchar](max) NULL,
	[FilterValueSelection] [nvarchar](max) NULL,
	[Type] [nvarchar](100) NULL,
	[TimeZoneName] [nvarchar](256) NULL,
	[TimeZoneValue] [nvarchar](256) NULL,
	[StartDate] [datetime] NULL,
	[StartDateUtc] [datetime] NULL,
	[StartTime] [datetime] NULL,
	[RecurrenceType] [int] NULL,
	[RecurrencePattern] [int] NULL,
	[RecurrencePatternValue] [nvarchar](max) NULL,
	[IsEndless] [bit] NULL,
	[IsScheduled] [bit] NULL,
	[Occurrence] [int] NULL,
	[EndDate] [datetime] NULL,
	[EndDateUtc] [datetime] NULL,
	[DeliveryType] [nvarchar](100) NULL,
	[DeliveryMethod] [nvarchar](100) NULL,
	[ExportFileType] [nvarchar](50) NULL,
	[ExportAttachmentType] [nvarchar](50) NULL,
	[EmailSubject] [nvarchar](256) NULL,
	[EmailBody] [nvarchar](max) NULL,
	[ReportId] [uniqueidentifier] NULL,
	[DashboardId] [uniqueidentifier] NULL,
	[Recipients] [nvarchar](max) NULL,
	[LastSuccessfulRun] [nvarchar](500) NULL,
	[NextScheduledRun] [nvarchar](500) NULL,
	[LastSuccessfulRunDate] [datetime] NULL,
	[NextScheduledRunDate] [datetime] NULL,
	[IsSubscription] [bit] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[CreatedById] [uniqueidentifier] NULL,
 CONSTRAINT [PK_IzendaReportSubscription] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSubscriptionFilterField') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSubscriptionFilterField](
	[Id] [uniqueidentifier] NOT NULL,
	[FilterFieldId] [uniqueidentifier] NULL,
	[Value] [nvarchar](max) NULL,
	[OperatorId] [uniqueidentifier] NULL,
	[OperatorSetting] [nvarchar](100) NULL,
	[SubscriptionId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaSubscriptionFilterField] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSystemSetting') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSystemSetting](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [varchar](256) NOT NULL,
	[Value] [nvarchar](256) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaSystemVariable') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaSystemVariable](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[DataType] [nvarchar](50) NULL,
	[Description] [nvarchar](2000) NULL,
	[Scope] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaTemporaryData') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaTemporaryData](
	[Id] [uniqueidentifier] NOT NULL,
	[ObjectId] [uniqueidentifier] NULL,
	[ObjectData] [nvarchar](max) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaTemporaryData] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING OFF


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaTenant') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaTenant](
	[Id] [uniqueidentifier] NOT NULL,
	[TenantID] [varchar](256) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](256) NULL,
	[Active] [bit] NULL,
	[Deleted] [bit] NULL,
	[Modules] [nvarchar](500) NULL,
	[PermissionData] [nvarchar](max) NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaTenant] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaTimePeriod') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaTimePeriod](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Type] [nvarchar](100) NULL,
	[Value] [nvarchar](256) NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
 CONSTRAINT [PK_IzendaTimePeriod] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

SET ANSI_PADDING OFF


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaUser') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaUser](
	[Id] [uniqueidentifier] NOT NULL,
	[UserName] [nvarchar](256) NOT NULL,
	[FirstName] [nvarchar](256) NULL,
	[LastName] [nvarchar](256) NULL,
	[PasswordHash] [nvarchar](256) NULL,
	[PasswordSalt] [nvarchar](256) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
	[EmailAddress] [varchar](256) NULL,
	[CurrentTokenHash] [nvarchar](256) NULL,
	[Active] [bit] NULL,
	[Deleted] [bit] NULL,
	[DataOffset] [int] NULL,
	[TimestampOffset] [int] NULL,
	[InitPassword] [bit] NULL,
	[RetryLoginTime] [smallint] NULL,
	[LastTimeAccessed] [datetime] NULL,
	[PasswordLastChanged] [datetime] NULL,
	[Locked] [bit] NULL,
	[LockedDate] [datetime] NULL,
	[CultureName] [nvarchar](20) NULL,
	[DateFormat] [nvarchar](20) NULL,
	[SystemAdmin] [bit] NULL,
	[SecurityQuestionLastChanged] [datetime] NULL,
	[NumberOfFailedSecurityQuestion] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]END

SET ANSI_PADDING OFF


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaUserPermission') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaUserPermission](
	[Id] [uniqueidentifier] NOT NULL,
	[ReportId] [uniqueidentifier] NULL,
	[DashboardId] [uniqueidentifier] NULL,
	[AssignedTo] [nvarchar](4000) NULL,
	[AssignedType] [int] NULL,
	[AccessRightId] [uniqueidentifier] NULL,
	[Position] [int] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaUserRole') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaUserRole](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NULL,
	[RoleId] [uniqueidentifier] NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaUserSecurityQuestion') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaUserSecurityQuestion](
	[Id] [uniqueidentifier] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[SecurityQuestionId] [uniqueidentifier] NOT NULL,
	[Answer] [nvarchar](max) NOT NULL,
	[Version] [int] NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaWorkspace') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaWorkspace](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](256) NULL,
	[Description] [nvarchar](max) NULL,
	[TenantId] [uniqueidentifier] NULL,
	[OwnerId] [uniqueidentifier] NULL,
	[CreatedBy] [nvarchar](256) NULL,
	[Deleted] [bit] NULL,
	[Created] [datetime] NULL,
	[Modified] [datetime] NULL,
	[CopyRoles] [bit] NULL,
	[CopyReport] [bit] NULL,
	[CopyRolePermission] [bit] NULL,
	[CopyAdvancedSettings] [bit] NULL,
	[CopyDataModel] [bit] NULL,
	[CopyTenantPermissions] [bit] NULL,
	[SourceId] [uniqueidentifier] NULL,
	[SelectAllTenants] [bit] NULL,
	[SourceDataModel] [nvarchar](max) NULL,
	[SourceHashCode] [nvarchar](500) NULL,
	[CopiedRolesData] [nvarchar](max) NULL,
	[CopiedRolePermissionData] [nvarchar](max) NULL,
	[TotalHashCode] [nvarchar](500) NULL,
	[SourceReportModel] [nvarchar](max) NULL,
	[SourceTemplateModel] [nvarchar](max) NULL,
	[SourceDashboardModel] [nvarchar](max) NULL,
	[CopyDashboard] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaWorkspaceMapping') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaWorkspaceMapping](
	[Id] [uniqueidentifier] NOT NULL,
	[WorkspaceId] [uniqueidentifier] NULL,
	[FromDatabaseName] [nvarchar](256) NULL,
	[Type] [int] NULL,
	[FromObject] [nvarchar](256) NULL,
	[ToDatabaseName] [nvarchar](256) NULL,
	[ToObject] [nvarchar](256) NULL,
	[IsGlobal] [bit] NULL,
	[FromServer] [nvarchar](256) NULL,
	[ToServer] [nvarchar](256) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaWorkspaceMappingTenant') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaWorkspaceMappingTenant](
	[WorkspaceMappingId] [uniqueidentifier] NULL,
	[TenantId] [uniqueidentifier] NULL
) ON [PRIMARY]
END


SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON


IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id(N'IzendaWorkspaceTenant') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
BEGIN
CREATE TABLE [IzendaWorkspaceTenant](
	[WorkspaceId] [uniqueidentifier] NOT NULL,
	[TenantId] [uniqueidentifier] NULL,
	[Status] [int] NULL,
	[SourceDataModel] [nvarchar](max) NULL,
	[PhysicalDataModel] [nvarchar](max) NULL,
	[DestinationHashCode] [nvarchar](500) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IzendaGlobalDatabaseMapping]') AND type in (N'U'))
BEGIN
	CREATE TABLE [dbo].[IzendaGlobalDatabaseMapping]
	(
		[Id] [uniqueidentifier] PRIMARY KEY,
		[FromServer] [nvarchar](256) NULL,
		[ToServer] [nvarchar](256) NULL,
		[FromDatabaseName] [nvarchar](256) NULL,
		[Type] [int] NULL,
		[FromObject] [nvarchar](256) NULL,
		[ToDatabaseName] [nvarchar](256) NULL,
		[ToObject] [nvarchar](256) NULL,
		[SelectAllTenants] [bit] NULL,		
		[TenantIds] [nvarchar](max) NULL,
		[Version] [int] NULL,
		[Deleted] [bit] NULL,
		[Created] [datetime] NULL,
		[CreatedBy] [nvarchar](256) NULL,
		[Modified] [datetime] NULL,
		[ModifiedBy] [nvarchar](256) NULL
	)
END



IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaFilterOperatorGroup' AND COLUMN_NAME='DefaultOperatorId')
BEGIN
	ALTER TABLE IzendaFilterOperatorGroup ADD DefaultOperatorId uniqueidentifier NULL
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaTimePeriod' AND COLUMN_NAME='IsCustomFilter')
BEGIN
	ALTER TABLE IzendaTimePeriod ADD IsCustomFilter bit NULL
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportSetting' AND COLUMN_NAME='DefaultImageUrl')
BEGIN
	ALTER TABLE IzendaReportSetting ADD DefaultImageUrl nvarchar(256) NULL
END

IF EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportSetting' AND COLUMN_NAME='DefaultImageUrl')
BEGIN
	ALTER TABLE IzendaReportSetting DROP COLUMN DefaultImageUrl
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaCity' AND COLUMN_NAME='CountryCode3')
BEGIN
	ALTER TABLE IzendaCity ADD CountryCode3 nvarchar(255) NULL
IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaCity' AND COLUMN_NAME='CountryName')
BEGIN
	ALTER TABLE IzendaCity ADD CountryName nvarchar(255) NULL
IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IzendaCountryCode]') AND type in (N'U'))
BEGIN
	CREATE TABLE [dbo].IzendaCountryCode(
		[Name] [nvarchar](256) NULL,
		[Code2] [varchar](10) NULL,
		[Code3] [varchar](10) NULL,
		[Continent] [nvarchar](256) NULL		
	)  ON [PRIMARY]
IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaRelationship' AND COLUMN_NAME='ComparisonOperator')
BEGIN
	ALTER TABLE IzendaRelationship ADD ComparisonOperator nvarchar(50) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaRelationshipKeyJoin' AND COLUMN_NAME='ComparisonOperator')

BEGIN
	ALTER TABLE IzendaRelationshipKeyJoin ADD ComparisonOperator nvarchar(50) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaRelationshipKeyJoin' AND COLUMN_NAME='ComparisonValue')
BEGIN
	ALTER TABLE IzendaRelationshipKeyJoin ADD ComparisonValue nvarchar(max) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReport' AND COLUMN_NAME='Params')
BEGIN
	ALTER TABLE IzendaReport ADD Params nvarchar (max) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReport' AND COLUMN_NAME='Relationships')
BEGIN
	ALTER TABLE IzendaReport ADD Relationships nvarchar (max) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReport' AND COLUMN_NAME='UsingFieldNames')
BEGIN
	ALTER TABLE IzendaReport ADD UsingFieldNames nvarchar (max) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportDataSource' AND COLUMN_NAME='QuerySourceUniqueName')
BEGIN
	ALTER TABLE IzendaReportDataSource ADD QuerySourceUniqueName nvarchar (256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaFilterField' AND COLUMN_NAME='QuerySourceUniqueName')
BEGIN
	ALTER TABLE IzendaFilterField ADD QuerySourceUniqueName nvarchar (256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaFilterField' AND COLUMN_NAME='QuerySourceFieldName')
BEGIN
	ALTER TABLE IzendaFilterField ADD QuerySourceFieldName nvarchar (256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaFilterField' AND COLUMN_NAME='ComparisonFieldUniqueName')
BEGIN
	ALTER TABLE IzendaFilterField ADD ComparisonFieldUniqueName nvarchar (256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReport' AND COLUMN_NAME='IsGlobal')
BEGIN
	ALTER TABLE IzendaReport ADD IsGlobal bit NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportCategory' AND COLUMN_NAME='IsGlobal')
BEGIN
	ALTER TABLE IzendaReportCategory ADD IsGlobal bit NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportSetting' AND COLUMN_NAME='LocalCategoryName')
BEGIN
	ALTER TABLE IzendaReportSetting ADD LocalCategoryName nvarchar(256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportSetting' AND COLUMN_NAME='GlobalCategoryName')
BEGIN
	ALTER TABLE IzendaReportSetting ADD GlobalCategoryName nvarchar(256) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaDashboard' AND COLUMN_NAME='IsGlobal')
BEGIN
	ALTER TABLE IzendaDashboard ADD IsGlobal bit NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaUserPermission' AND COLUMN_NAME='AssignedToNames')
BEGIN
	ALTER TABLE IzendaUserPermission ADD AssignedToNames nvarchar(max) NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaTemporaryData' AND COLUMN_NAME='TenantId')
BEGIN
	ALTER TABLE IzendaTemporaryData ADD TenantId uniqueidentifier NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaReportCategory' AND COLUMN_NAME='CreatedById')
BEGIN
	ALTER TABLE IzendaReportCategory ADD CreatedById uniqueidentifier NULL
END

BEGIN
ALTER TABLE IzendaRelationshipKeyJoin ALTER COLUMN ForeignQuerySourceId uniqueidentifier NULL;
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

BEGIN
ALTER TABLE IzendaRelationshipKeyJoin ALTER COLUMN ForeignFieldId uniqueidentifier NULL;
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

BEGIN
ALTER TABLE IzendaReportDataSource ALTER COLUMN QuerySourceId uniqueidentifier NULL
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='QuerySourceFieldIndex' AND object_id = OBJECT_ID('IzendaQuerySourceField'))
BEGIN
	CREATE INDEX QuerySourceFieldIndex ON IzendaQuerySourceField (Deleted, ReportId)
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END

ALTER TABLE [IzendaFilterField]  WITH CHECK ADD  CONSTRAINT [FK_IzendaFilterField_IzendaFilterOperator] FOREIGN KEY([OperatorId])
REFERENCES [IzendaFilterOperator] ([Id])

ALTER TABLE [IzendaFilterField] CHECK CONSTRAINT [FK_IzendaFilterField_IzendaFilterOperator]

ALTER TABLE [IzendaFilterField]  WITH CHECK ADD  CONSTRAINT [FK_IzendaFilterField_IzendaReportFilter] FOREIGN KEY([FilterId])
REFERENCES [IzendaReportFilter] ([Id])

ALTER TABLE [IzendaFilterField] CHECK CONSTRAINT [FK_IzendaFilterField_IzendaReportFilter]

ALTER TABLE [IzendaFilterOperator]  WITH CHECK ADD  CONSTRAINT [FK_IzendaFilterOperator_IzendaFilterOperatorGroup] FOREIGN KEY([OperatorGroupId])
REFERENCES [IzendaFilterOperatorGroup] ([Id])

ALTER TABLE [IzendaFilterOperator] CHECK CONSTRAINT [FK_IzendaFilterOperator_IzendaFilterOperatorGroup]

ALTER TABLE [IzendaQuerySource]  WITH CHECK ADD  CONSTRAINT [FK_IzendaQuerySource_IzendaDataSourceCategory] FOREIGN KEY([DataSourceCategoryId])
REFERENCES [IzendaDataSourceCategory] ([Id])

ALTER TABLE [IzendaQuerySource] CHECK CONSTRAINT [FK_IzendaQuerySource_IzendaDataSourceCategory]

ALTER TABLE [IzendaQuerySource]  WITH CHECK ADD  CONSTRAINT [FK_QuerySource_QuerySourceCategory] FOREIGN KEY([CategoryId])
REFERENCES [IzendaQuerySourceCategory] ([Id])

ALTER TABLE [IzendaQuerySource] CHECK CONSTRAINT [FK_QuerySource_QuerySourceCategory]

ALTER TABLE [IzendaQuerySourceCategory]  WITH CHECK ADD  CONSTRAINT [FK_QuerySourceCategory_Connection] FOREIGN KEY([ConnectionId])
REFERENCES [IzendaConnection] ([Id])

ALTER TABLE [IzendaQuerySourceCategory] CHECK CONSTRAINT [FK_QuerySourceCategory_Connection]

ALTER TABLE [IzendaReportFilter]  WITH CHECK ADD  CONSTRAINT [FK_IzendaReportFilter_IzendaReport] FOREIGN KEY([ReportId])
REFERENCES [IzendaReport] ([Id])

ALTER TABLE [IzendaReportFilter] CHECK CONSTRAINT [FK_IzendaReportFilter_IzendaReport]

ALTER TABLE [IzendaWorkspaceMapping]  WITH CHECK ADD  CONSTRAINT [FK_IzendaWorkspaceMapping_IzendaWorkspace] FOREIGN KEY([WorkspaceId])
REFERENCES [IzendaWorkspace] ([Id])

ALTER TABLE [IzendaWorkspaceMapping] CHECK CONSTRAINT [FK_IzendaWorkspaceMapping_IzendaWorkspace]

ALTER TABLE [IzendaWorkspaceMappingTenant]  WITH CHECK ADD  CONSTRAINT [FK_WorkspaceMappingTenant_IzendaWorkspaceMapping] FOREIGN KEY([WorkspaceMappingId])
REFERENCES [IzendaWorkspaceMapping] ([Id])

ALTER TABLE [IzendaWorkspaceMappingTenant] CHECK CONSTRAINT [FK_WorkspaceMappingTenant_IzendaWorkspaceMapping]

ALTER TABLE [IzendaWorkspaceTenant]  WITH CHECK ADD  CONSTRAINT [FK_IzendaWorkspaceTenant_IzendaWorkspace] FOREIGN KEY([WorkspaceId])
REFERENCES [IzendaWorkspace] ([Id])

ALTER TABLE [IzendaWorkspaceTenant] CHECK CONSTRAINT [FK_IzendaWorkspaceTenant_IzendaWorkspace]

IF EXISTS ( SELECT * FROM sys.key_constraints WHERE Type = 'PK' AND Name = 'PK_IzendaTemporaryData')
BEGIN
	ALTER TABLE IzendaTemporaryData DROP CONSTRAINT PK_IzendaTemporaryData
	IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END


IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_JointField_ForeignField' /* Index */
	)
	PRINT 'IX_Relationship_JointField_ForeignField exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_JointField_ForeignField] ON [dbo].[IzendaRelationship]
	(
		[JoinFieldId] ASC,
		[ForeignFieldId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_JQS_FQS_RPT_DEL_SR' /* Index */
	)
	PRINT 'IX_Relationship_JQS_FQS_RPT_DEL_SR exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_JQS_FQS_RPT_DEL_SR] ON [dbo].[IzendaRelationship]
	(
		[JoinQuerySourceId] ASC,
		[ForeignQuerySourceId] ASC,
		[SystemRelationship] ASC,
		[ReportId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_Report_DEL' /* Index */
	)
	PRINT 'IX_Relationship_Report_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_Report_DEL] ON [dbo].[IzendaRelationship]
	(
		[ReportId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Reletionship_Alias' /* Index */
	)
	PRINT 'IX_Reletionship_Alias exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Reletionship_Alias] ON [dbo].[IzendaRelationship]
	(
		[Alias] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Category_SUB_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Category_SUB_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Category_SUB_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Name_Category_SUB_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Name_Category_SUB_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Name_Category_SUB_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[Name] ASC,
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportHistory' /* Table */
        AND si.name='IX_ReportHistory_Modified_DEL' /* Index */
	)
	PRINT 'IX_ReportHistory_Modified_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_ReportHistory_Modified_DEL] ON [dbo].[IzendaReportHistory]
	(
		[Modified] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;


IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportPart' /* Table */
        AND si.name='IX_ReportPart_RPT' /* Index */
	)
	PRINT 'IX_ReportPart_RPT exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_ReportPart_RPT] ON [dbo].[IzendaReportPart]
	(
		[ReportId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;
IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_JointField_ForeignField' /* Index */
	)
	PRINT 'IX_Relationship_JointField_ForeignField exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_JointField_ForeignField] ON [dbo].[IzendaRelationship]
	(
		[JoinFieldId] ASC,
		[ForeignFieldId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_JQS_FQS_RPT_DEL_SR' /* Index */
	)
	PRINT 'IX_Relationship_JQS_FQS_RPT_DEL_SR exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_JQS_FQS_RPT_DEL_SR] ON [dbo].[IzendaRelationship]
	(
		[JoinQuerySourceId] ASC,
		[ForeignQuerySourceId] ASC,
		[SystemRelationship] ASC,
		[ReportId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Relationship_Report_DEL' /* Index */
	)
	PRINT 'IX_Relationship_Report_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Relationship_Report_DEL] ON [dbo].[IzendaRelationship]
	(
		[ReportId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaRelationship' /* Table */
        AND si.name='IX_Reletionship_Alias' /* Index */
	)
	PRINT 'IX_Reletionship_Alias exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Reletionship_Alias] ON [dbo].[IzendaRelationship]
	(
		[Alias] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Category_SUB_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Category_SUB_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Category_SUB_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Name_Category_SUB_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Name_Category_SUB_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Name_Category_SUB_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[Name] ASC,
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_Report_Tenant_Type_DEL' /* Index */
	)
	PRINT 'IX_Report_Tenant_Type_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Report_Tenant_Type_DEL] ON [dbo].[IzendaReport]
	(
		[TenantId] ASC,
		[Type] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportHistory' /* Table */
        AND si.name='IX_ReportHistory_Modified_DEL' /* Index */
	)
	PRINT 'IX_ReportHistory_Modified_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_ReportHistory_Modified_DEL] ON [dbo].[IzendaReportHistory]
	(
		[Modified] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportPart' /* Table */
        AND si.name='IX_ReportPart_RPT' /* Index */
	)
	PRINT 'IX_ReportPart_RPT exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_ReportPart_RPT] ON [dbo].[IzendaReportPart]
	(
		[ReportId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaQuerySourceField' /* Table */
        AND si.name='IX_QuerySourceField_DeletedAndQuerySourceId' /* Index */
	)
	PRINT 'IX_QuerySourceField_DeletedAndQuerySourceId exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_QuerySourceField_DeletedAndQuerySourceId] ON [dbo].[IzendaQuerySourceField]
	(
		[Deleted] ASC,
		QuerySourceId ASC		
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportHistory' /* Table */
        AND si.name='IX_IzendaReportHistory' /* Index */
	)
	PRINT 'IX_IzendaReportHistory exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_IzendaReportHistory] ON [dbo].[IzendaReportHistory]
	(
		[Deleted] ASC,
		[ReportId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReportDataSource' /* Table */
        AND si.name='IX_IzendaReportDataSource' /* Index */
	)
	PRINT 'IX_IzendaReportDataSource exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_IzendaReportDataSource] ON [dbo].[IzendaReportDataSource]
	(
		[Deleted] ASC,
		[ReportId] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaReport' /* Table */
        AND si.name='IX_IzendaReport' /* Index */
	)
	PRINT 'IX_IzendaReport exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_IzendaReport] ON [dbo].[IzendaReport]
	(
		[Deleted] ASC,
		[Id] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaUser' /* Table */
        AND si.name='IX_IzendaUser' /* Index */
	)
	PRINT 'IX_IzendaUser exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_IzendaUser] ON [dbo].[IzendaUser]
	(
		[Deleted] ASC,
		[UserName] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING= OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaDashboard' /* Table */
        AND si.name='IX_Dashboard_Category_SUB_Tenant_DEL' /* Index */
	)
	PRINT 'IX_Dashboard_Category_SUB_Tenant_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Dashboard_Category_SUB_Tenant_DEL] ON [dbo].[IzendaDashboard]
	(
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF EXISTS (
    SELECT 1
    FROM sys.indexes AS si
    JOIN sys.objects AS so on si.object_id=so.object_id
    JOIN sys.schemas AS sc on so.schema_id=sc.schema_id
    WHERE 
        so.name ='IzendaDashboard' /* Table */
        AND si.name='IX_Dashboard_Name_Category_SUB_Tenant_DEL' /* Index */
	)
	PRINT 'IX_Dashboard_Name_Category_SUB_Tenant_DEL exists!'
ELSE
	CREATE NONCLUSTERED INDEX [IX_Dashboard_Name_Category_SUB_Tenant_DEL] ON [dbo].[IzendaDashboard]
	(
		[Name] ASC,
		[CategoryId] ASC,
		[SubCategoryId] ASC,
		[TenantId] ASC,
		[Deleted] ASC
	)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
;

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaConnection' AND COLUMN_NAME='ServerTypeName')
BEGIN
	ALTER TABLE IzendaConnection ADD ServerTypeName nvarchar(256) NULL
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaConnection' AND COLUMN_NAME='DatabaseName')
BEGIN
	ALTER TABLE IzendaConnection ADD DatabaseName nvarchar(256) NULL
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaConnection' AND COLUMN_NAME='DatabaseServer')
BEGIN
	ALTER TABLE IzendaConnection ADD DatabaseServer nvarchar(256) NULL
END

IF NOT EXISTS ( SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME='IzendaFilterField' AND COLUMN_NAME='IsNegative')
BEGIN
	ALTER TABLE IzendaFilterField ADD IsNegative bit NULL
END

IF (OBJECT_ID('FK_IzendaFilterField_IzendaFilterOperator', 'F') IS NOT NULL)
BEGIN
    ALTER TABLE IzendaFilterField DROP CONSTRAINT FK_IzendaFilterField_IzendaFilterOperator
IF (@@ERROR <> 0)  GOTO ERR_HANDLER
END


RETURN @intReturn

ERR_HANDLER:
	SET @intReturn = 1
	PRINT 'Failed in ATPAR_REP_CONFIG_SP_TABLES_PATCH30 store procedure returning non zero value ' 
	RETURN @intReturn

END