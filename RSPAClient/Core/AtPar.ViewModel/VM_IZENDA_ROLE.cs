using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AtPar.ViewModel
{
   

    public class VM_IZENDA_ROLE
    {
        public bool systemAdmin { get; set; }
        public bool fullReportAndDashboardAccess { get; set; }
        public Systemconfiguration systemConfiguration { get; set; }
        public Datasetup dataSetup { get; set; }
        public Usersetup userSetup { get; set; }
        public Rolesetup roleSetup { get; set; }
        public Reports reports { get; set; }
        public Tenantsetup tenantSetup { get; set; }
        public Dashboards dashboards { get; set; }
        public Access access { get; set; }
        public Scheduling scheduling { get; set; }
        public Emailing emailing { get; set; }
        public Exporting exporting { get; set; }
        public Systemwide systemwide { get; set; }
    }

    public class Systemconfiguration
    {
        public Scheduledinstances scheduledInstances { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Scheduledinstances
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Datasetup
    {
        public Datamodel dataModel { get; set; }
        public Advancedsettings advancedSettings { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Datamodel
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Advancedsettings
    {
        public bool category { get; set; }
        public bool others { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Usersetup
    {
        public Userroleassociation userRoleAssociation { get; set; }
        public Actions actions { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Userroleassociation
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Actions
    {
        public bool create { get; set; }
        public bool edit { get; set; }
        public bool del { get; set; }
        public bool configureSecurityOptions { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Rolesetup
    {
        public Actions1 actions { get; set; }
        public Datamodelaccess dataModelAccess { get; set; }
        public Permissions permissions { get; set; }
        public Grantrolewithfullreportanddashboardaccess grantRoleWithFullReportAndDashboardAccess { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Actions1
    {
        public bool create { get; set; }
        public bool edit { get; set; }
        public bool del { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Datamodelaccess
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Permissions
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Grantrolewithfullreportanddashboardaccess
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Reports
    {
        public Cancreatenewreport canCreateNewReport { get; set; }
        public Datasources dataSources { get; set; }
        public Reportparttypes reportPartTypes { get; set; }
        public Reportcategoriessubcategories reportCategoriesSubcategories { get; set; }
        public Filterproperties filterProperties { get; set; }
        public Fieldproperties fieldProperties { get; set; }
        public Actions2 actions { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Cancreatenewreport
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Datasources
    {
        public bool simpleDataSources { get; set; }
        public bool advancedDataSources { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Reportparttypes
    {
        public bool chart { get; set; }
        public bool form { get; set; }
        public bool gauge { get; set; }
        public bool map { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Reportcategoriessubcategories
    {
        public Cancreatenewcategory canCreateNewCategory { get; set; }
        public Categoryaccessibility categoryAccessibility { get; set; }
    }

    public class Cancreatenewcategory
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Categoryaccessibility
    {
        public Category[] categories { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Category
    {
        public string name { get; set; }
        public int type { get; set; }
        public object parentId { get; set; }
        public object tenantId { get; set; }
        public bool isGlobal { get; set; }
        public bool canDelete { get; set; }
        public bool editable { get; set; }
        public bool savable { get; set; }
        public Subcategory[] subCategories { get; set; }
        public bool _checked { get; set; }
        public object reports { get; set; }
        public object dashboards { get; set; }
        public int numOfChilds { get; set; }
        public int numOfCheckedChilds { get; set; }
        public bool indeterminate { get; set; }
        public object fullPath { get; set; }
        public object computeNameSettings { get; set; }
        public string id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class Subcategory
    {
        public string name { get; set; }
        public int type { get; set; }
        public object parentId { get; set; }
        public string tenantId { get; set; }
        public bool isGlobal { get; set; }
        public bool canDelete { get; set; }
        public bool editable { get; set; }
        public bool savable { get; set; }
        public Subcategory1[] subCategories { get; set; }
        public bool _checked { get; set; }
        public object reports { get; set; }
        public object dashboards { get; set; }
        public int numOfChilds { get; set; }
        public int numOfCheckedChilds { get; set; }
        public bool indeterminate { get; set; }
        public object fullPath { get; set; }
        public object computeNameSettings { get; set; }
        public string id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class Subcategory1
    {
        public string name { get; set; }
        public int type { get; set; }
        public object parentId { get; set; }
        public string tenantId { get; set; }
        public bool isGlobal { get; set; }
        public bool canDelete { get; set; }
        public bool editable { get; set; }
        public bool savable { get; set; }
        public object[] subCategories { get; set; }
        public bool _checked { get; set; }
        public object reports { get; set; }
        public object dashboards { get; set; }
        public int numOfChilds { get; set; }
        public int numOfCheckedChilds { get; set; }
        public bool indeterminate { get; set; }
        public object fullPath { get; set; }
        public object computeNameSettings { get; set; }
        public string id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class Filterproperties
    {
        public bool filterLogic { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Fieldproperties
    {
        public bool customURL { get; set; }
        public bool embeddedJavaScript { get; set; }
        public bool subreport { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Actions2
    {
        public bool schedule { get; set; }
        public bool email { get; set; }
        public bool viewReportHistory { get; set; }
        public bool del { get; set; }
        public bool registerForAlerts { get; set; }
        public bool print { get; set; }
        public bool unarchiveReportVersions { get; set; }
        public bool overwriteExistingReport { get; set; }
        public bool subscribe { get; set; }
        public bool exporting { get; set; }
        public bool configureAccessRights { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Tenantsetup
    {
        public Actions3 actions { get; set; }
        public Permissions1 permissions { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Actions3
    {
        public bool create { get; set; }
        public bool edit { get; set; }
        public bool del { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Permissions1
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Dashboards
    {
        public Cancreatenewdashboard canCreateNewDashboard { get; set; }
        public Dashboardcategoriessubcategories dashboardCategoriesSubcategories { get; set; }
        public Actions4 actions { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Cancreatenewdashboard
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Dashboardcategoriessubcategories
    {
        public Cancreatenewcategory1 canCreateNewCategory { get; set; }
        public Categoryaccessibility1 categoryAccessibility { get; set; }
    }

    public class Cancreatenewcategory1
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Categoryaccessibility1
    {
        public object[] categories { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Actions4
    {
        public bool schedule { get; set; }
        public bool email { get; set; }
        public bool del { get; set; }
        public bool subscribe { get; set; }
        public bool print { get; set; }
        public bool overwriteExistingDashboard { get; set; }
        public bool configureAccessRights { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Access
    {
        public Accesslimits accessLimits { get; set; }
        public Accessdefaults accessDefaults { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Accesslimits
    {
        public Value[] value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Value
    {
        public User[] users { get; set; }
        public object tenantUniqueName { get; set; }
        public object permission { get; set; }
        public object visibleQuerySources { get; set; }
        public object name { get; set; }
        public object tenantId { get; set; }
        public bool active { get; set; }
        public bool notAllowSharing { get; set; }
        public string id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class User
    {
        public object password { get; set; }
        public object[] roles { get; set; }
        public object userRoles { get; set; }
        public object userSecurityQuestions { get; set; }
        public int status { get; set; }
        public DateTime issueDate { get; set; }
        public bool autoLogin { get; set; }
        public object newPassword { get; set; }
        public object userName { get; set; }
        public object emailAddress { get; set; }
        public object firstName { get; set; }
        public object lastName { get; set; }
        public object tenantId { get; set; }
        public object tenantDisplayId { get; set; }
        public object tenantName { get; set; }
        public object dataOffset { get; set; }
        public object timestampOffset { get; set; }
        public bool initPassword { get; set; }
        public bool active { get; set; }
        public object retryLoginTime { get; set; }
        public object lastTimeAccessed { get; set; }
        public object passwordLastChanged { get; set; }
        public object locked { get; set; }
        public object lockedDate { get; set; }
        public object cultureName { get; set; }
        public object securityQuestionLastChanged { get; set; }
        public object dateFormat { get; set; }
        public bool systemAdmin { get; set; }
        public bool notAllowSharing { get; set; }
        public object numberOfFailedSecurityQuestion { get; set; }
        public object fullName { get; set; }
        public object currentModules { get; set; }
        public string id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class Accessdefaults
    {
        public Value1[] value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Value1
    {
        public object reportId { get; set; }
        public object dashboardId { get; set; }
        public int assignedType { get; set; }
        public object accessRightId { get; set; }
        public object accessRight { get; set; }
        public object shareWith { get; set; }
        public int position { get; set; }
        public string[] accessors { get; set; }
        public object accessorNames { get; set; }
        public string tempId { get; set; }
        public string reportAccessRightId { get; set; }
        public object reportAccessRights { get; set; }
        public string dashboardAccessRightId { get; set; }
        public string assignedTypeName { get; set; }
        public object dashboardAccessRights { get; set; }
        public object id { get; set; }
        public int state { get; set; }
        public bool deleted { get; set; }
        public bool inserted { get; set; }
        public object version { get; set; }
        public object created { get; set; }
        public string createdBy { get; set; }
        public object modified { get; set; }
        public object modifiedBy { get; set; }
    }

    public class Scheduling
    {
        public Schedulinglimits schedulingLimits { get; set; }
        public Schedulingscope schedulingScope { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Schedulinglimits
    {
        public object[] value { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Schedulingscope
    {
        public bool systemUsers { get; set; }
        public bool externalUsers { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Emailing
    {
        public Deliverymethod deliveryMethod { get; set; }
        public Attachmenttype attachmentType { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Deliverymethod
    {
        public bool link { get; set; }
        public bool embeddedHTML { get; set; }
        public bool attachment { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Attachmenttype
    {
        public bool word { get; set; }
        public bool excel { get; set; }
        public bool pdf { get; set; }
        public bool csv { get; set; }
        public bool xml { get; set; }
        public bool json { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Exporting
    {
        public Exportingformat exportingFormat { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Exportingformat
    {
        public bool word { get; set; }
        public bool excel { get; set; }
        public bool pdf { get; set; }
        public bool csv { get; set; }
        public bool xml { get; set; }
        public bool json { get; set; }
        public bool queryExecution { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Systemwide
    {
        public Canseesystemmessages canSeeSystemMessages { get; set; }
        public int tenantAccess { get; set; }
    }

    public class Canseesystemmessages
    {
        public bool value { get; set; }
        public int tenantAccess { get; set; }
    }
}
