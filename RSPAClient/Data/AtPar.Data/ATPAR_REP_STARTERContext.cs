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


namespace AtPar.Data
{
    public partial class ATPAR_REP_STARTERContext : DbContext
    {
        static ATPAR_REP_STARTERContext()
        {
            Database.SetInitializer<ATPAR_REP_STARTERContext>(null);
        }


        public ATPAR_REP_STARTERContext()
            : base(StarterConnectionString)
        {
        }

        static string _starterConnectionString;

        public static string StarterConnectionString
        {
            set
            {
                _starterConnectionString = value;
            }
            get
            {

                ATPAR_MASTER_Context mtDbContext = new ATPAR_MASTER_Context();
                MT_ATPAR_SYSTEM_DB configDetails = new MT_ATPAR_SYSTEM_DB();
                Encryption atparEncriptService = new Encryption();
                configDetails = mtDbContext.MT_ATPAR_SYSTEM_DB.Where(x => x.SYSTEM_ID == AtParWebEnums.Reporting_System_Ids_Enum.RepStarter.ToString()).FirstOrDefault();


                string datasource = string.Empty;
                string initialCatalog = string.Empty;
                string userId = string.Empty;
                string pwd = string.Empty;

                _starterConnectionString =
                          "Data Source =" + configDetails.SERVER +
                          "; Initial Catalog =" + configDetails.DATASOURCE +
                          "; Persist Security Info =True; " +
                          " User ID =" + configDetails.USERID +
                          "; Password =" + atparEncriptService.Decrypt(configDetails.PASSWORD) +
                          "; MultipleActiveResultSets =True";

                return _starterConnectionString;
            }
        }
        public DbSet<AspNetRole> AspNetRoles { get; set; }
        public DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public DbSet<AspNetUser> AspNetUsers { get; set; }
        public DbSet<Tenant> Tenants { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new AspNetRoleMap());
            modelBuilder.Configurations.Add(new AspNetUserClaimMap());
            modelBuilder.Configurations.Add(new AspNetUserLoginMap());
            modelBuilder.Configurations.Add(new AspNetUserMap());
            modelBuilder.Configurations.Add(new TenantMap());
        }
    }
}
