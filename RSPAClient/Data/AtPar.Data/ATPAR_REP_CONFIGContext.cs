using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using AtPar.POCOEntities;
using Atpar.Data.Mapping;
using System.Data.SqlClient;
using System.Configuration;
using AtParEncryptionServices;
using AtPar.Common;
using System.Xml.Linq;
using System.IO;

namespace AtPar.Data
{
    public partial class ATPAR_REP_CONFIGContext : DbContext
    {
        static ATPAR_REP_CONFIGContext()
        {
            Database.SetInitializer<ATPAR_REP_CONFIGContext>(null);
        }

        static string _repconfigConnectionString;
        public ATPAR_REP_CONFIGContext()
            : base(RepconfigConnectionString)
        {

        }

        public static string RepconfigConnectionString
        {
            set
            {
                _repconfigConnectionString = value;
            }
            get
            {

                ATPAR_MASTER_Context mtDbContext = new ATPAR_MASTER_Context();
                    MT_ATPAR_SYSTEM_DB configDetails = new MT_ATPAR_SYSTEM_DB();
                    Encryption atparEncriptService = new Encryption();
                    configDetails = mtDbContext.MT_ATPAR_SYSTEM_DB.Where(x=>x.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.ReportingConf.ToString()).FirstOrDefault();
                    
                    string datasource = string.Empty;
                    string initialCatalog = string.Empty;
                    string userId = string.Empty;
                    string pwd = string.Empty;
                
                    _repconfigConnectionString =
                          "Data Source =" +configDetails.SERVER +
                          "; Initial Catalog =" + configDetails.DATASOURCE +
                          "; Persist Security Info =True; " +
                          " User ID =" + configDetails.USERID +
                          "; Password =" + atparEncriptService.Decrypt(configDetails.PASSWORD) +
                          "; MultipleActiveResultSets =True";

                return _repconfigConnectionString;
            }
        }
        public DbSet<IzendaUser> IzendaUsers { get; set; }
        public DbSet<IzendaUserPermission> IzendaUserPermissions { get; set; }
        public DbSet<IzendaUserRole> IzendaUserRoles { get; set; }
        public DbSet<IzendaUserSecurityQuestion> IzendaUserSecurityQuestions { get; set; }
        public DbSet<IzendaReportCategory> IzendaReportCategorys { get; set; }
        public DbSet<IzendaReport> IzendaReports { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Configurations.Add(new IzendaUserMap());
            modelBuilder.Configurations.Add(new IzendaUserPermissionMap());
            modelBuilder.Configurations.Add(new IzendaUserRoleMap());
            modelBuilder.Configurations.Add(new IzendaUserSecurityQuestionMap());
            modelBuilder.Configurations.Add(new IzendaReportCategoryMap());
            modelBuilder.Configurations.Add(new IzendaReportMap());

        }
    }
}
