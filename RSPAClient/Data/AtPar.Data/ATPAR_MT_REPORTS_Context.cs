using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using AtPar.POCOEntities;
using Atpar.Data.Mapping;
using System.Data.SqlClient;
using System.Configuration;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using AtParEncryptionServices;
using AtPar.Common;
using System.Web;


namespace AtPar.Data
{
    public partial class ATPAR_MT_REPORTS_Context : DbContext
    {
        static ATPAR_MT_REPORTS_Context()
        {
            Database.SetInitializer<ATPAR_MT_REPORTS_Context>(null);
        }
        static string _rptConnectionString;
        public ATPAR_MT_REPORTS_Context()
            : base(RptConnectionString)
            //: base("Name=ATPAR_MT_REPORTS_Context")
        {

        }

        public static string RptConnectionString
        {
            set
            {
                _rptConnectionString = value;
            }
            get
            {

                ATPAR_MASTER_Context mtDbContext = new ATPAR_MASTER_Context();
                MT_ATPAR_SYSTEM_DB configDetails = new MT_ATPAR_SYSTEM_DB();
                Encryption atparEncriptService = new Encryption();
                configDetails = mtDbContext.MT_ATPAR_SYSTEM_DB.Where(x => x.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.ReportingMT.ToString()).FirstOrDefault();

                string datasource = string.Empty;
                string initialCatalog = string.Empty;
                string userId = string.Empty;
                string pwd = string.Empty;
                string dbname = string.Empty;
               
                _rptConnectionString =
                      "Data Source =" + configDetails.SERVER +
                      "; Initial Catalog =" + configDetails.DATASOURCE+
                      "; Persist Security Info =True; " +
                      " User ID =" + configDetails.USERID +
                      "; Password =" + atparEncriptService.Decrypt(configDetails.PASSWORD) +
                      "; MultipleActiveResultSets =True";

                return _rptConnectionString;
            }
        }

        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H> MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_H { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_M> MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_M { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Q> MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Q { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Y> MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_Y { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H> MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_H { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_M> MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_M { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Q> MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Q { get; set; }
        public DbSet<MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Y> MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_Y { get; set; }
        public DbSet<MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_H> MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_H { get; set; }
        public DbSet<MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_M> MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_M { get; set; }
        public DbSet<MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_Q> MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_Q { get; set; }
        public DbSet<MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_Y> MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_Y { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PHYSICIAN_H> MT_POU_RPT_OPT_BY_PHYSICIAN_H { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PHYSICIAN_M> MT_POU_RPT_OPT_BY_PHYSICIAN_M { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PHYSICIAN_Q> MT_POU_RPT_OPT_BY_PHYSICIAN_Q { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PHYSICIAN_Y> MT_POU_RPT_OPT_BY_PHYSICIAN_Y { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PREFERENCE_H> MT_POU_RPT_OPT_BY_PREFERENCE_H { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PREFERENCE_M> MT_POU_RPT_OPT_BY_PREFERENCE_M { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PREFERENCE_Q> MT_POU_RPT_OPT_BY_PREFERENCE_Q { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PREFERENCE_Y> MT_POU_RPT_OPT_BY_PREFERENCE_Y { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PROCEDURE_H> MT_POU_RPT_OPT_BY_PROCEDURE_H { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PROCEDURE_M> MT_POU_RPT_OPT_BY_PROCEDURE_M { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PROCEDURE_Q> MT_POU_RPT_OPT_BY_PROCEDURE_Q { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_PROCEDURE_Y> MT_POU_RPT_OPT_BY_PROCEDURE_Y { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_SPECIALTY_H> MT_POU_RPT_OPT_BY_SPECIALTY_H { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_SPECIALTY_M> MT_POU_RPT_OPT_BY_SPECIALTY_M { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_SPECIALTY_Q> MT_POU_RPT_OPT_BY_SPECIALTY_Q { get; set; }
        public DbSet<MT_POU_RPT_OPT_BY_SPECIALTY_Y> MT_POU_RPT_OPT_BY_SPECIALTY_Y { get; set; }
        public DbSet<MT_POU_RPT_SPEND_BY_GROUP_H> MT_POU_RPT_SPEND_BY_GROUP_H { get; set; }
        public DbSet<MT_POU_RPT_SPEND_BY_GROUP_M> MT_POU_RPT_SPEND_BY_GROUP_M { get; set; }
        public DbSet<MT_POU_RPT_SPEND_BY_GROUP_Q> MT_POU_RPT_SPEND_BY_GROUP_Q { get; set; }
        public DbSet<MT_POU_RPT_SPEND_BY_GROUP_Y> MT_POU_RPT_SPEND_BY_GROUP_Y { get; set; }
        public DbSet<MT_POU_RPT_SUPPLY_COMPARISON_H> MT_POU_RPT_SUPPLY_COMPARISON_H { get; set; }
        public DbSet<MT_POU_RPT_SUPPLY_COMPARISON_M> MT_POU_RPT_SUPPLY_COMPARISON_M { get; set; }
        public DbSet<MT_POU_RPT_SUPPLY_COMPARISON_Q> MT_POU_RPT_SUPPLY_COMPARISON_Q { get; set; }
        public DbSet<MT_POU_RPT_SUPPLY_COMPARISON_Y> MT_POU_RPT_SUPPLY_COMPARISON_Y { get; set; }
        public DbSet<MT_RPT_CRCT_TRANS_DETAILS> MT_RPT_CRCT_TRANS_DETAILS { get; set; }
        public DbSet<MT_RPT_FIELDS_LIST> MT_RPT_FIELDS_LIST { get; set; }
        public DbSet<MT_RPT_POU_FIELDS_LIST> MT_RPT_POU_FIELDS_LIST { get; set; }
        public DbSet<MT_RPT_POU_PROCEDURE_PREF_SETUP_DETAIL> MT_RPT_POU_PROCEDURE_PREF_SETUP_DETAIL { get; set; }
        public DbSet<MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADER> MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADER { get; set; }
        public DbSet<MT_RPT_POU_SETUP_DETAIL> MT_RPT_POU_SETUP_DETAIL { get; set; }
        public DbSet<MT_RPT_POU_SETUP_HEADER> MT_RPT_POU_SETUP_HEADER { get; set; }
        public DbSet<MT_RPT_POU_TRANS_CASEHEADER> MT_RPT_POU_TRANS_CASEHEADER { get; set; }
        public DbSet<MT_RPT_POU_TRANS_DETAIL> MT_RPT_POU_TRANS_DETAIL { get; set; }
        public DbSet<MT_RPT_POU_TRANS_DETAIL2> MT_RPT_POU_TRANS_DETAIL2 { get; set; }
        public DbSet<MT_RPT_POU_TRANS_HEADER2> MT_RPT_POU_TRANS_HEADER2 { get; set; }
        public DbSet<MT_RPT_POU_TRANS_ISSUERETURNHEADER> MT_RPT_POU_TRANS_ISSUERETURNHEADER { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_REIMBURSEMENT_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_COST_VARIANCE_BY_SPECIALTY_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_EXTENDED_VARIANCE_BY_SURGEON_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PHYSICIAN_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PHYSICIAN_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PHYSICIAN_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PHYSICIAN_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PREFERENCE_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PREFERENCE_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PREFERENCE_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PREFERENCE_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PROCEDURE_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PROCEDURE_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PROCEDURE_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_PROCEDURE_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_SPECIALTY_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_SPECIALTY_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_SPECIALTY_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_OPT_BY_SPECIALTY_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SPEND_BY_GROUP_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SPEND_BY_GROUP_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SPEND_BY_GROUP_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SPEND_BY_GROUP_YMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SUPPLY_COMPARISON_HMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SUPPLY_COMPARISON_MMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SUPPLY_COMPARISON_QMap());
            modelBuilder.Configurations.Add(new MT_POU_RPT_SUPPLY_COMPARISON_YMap());
            modelBuilder.Configurations.Add(new MT_RPT_CRCT_TRANS_DETAILSMap());
            modelBuilder.Configurations.Add(new MT_RPT_FIELDS_LISTMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_FIELDS_LISTMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_PROCEDURE_PREF_SETUP_DETAILMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_PROCEDURE_PREF_SETUP_HEADERMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_SETUP_DETAILMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_SETUP_HEADERMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_TRANS_CASEHEADERMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_TRANS_DETAILMap());
            modelBuilder.Configurations.Add(new MT_RPT_POU_TRANS_DETAIL2Map());
            modelBuilder.Configurations.Add(new MT_RPT_POU_TRANS_HEADER2Map());
            modelBuilder.Configurations.Add(new MT_RPT_POU_TRANS_ISSUERETURNHEADERMap());
        }
    }
}
