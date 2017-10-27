using Atpar.Data.Mapping;
using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using AtParEncryptionServices;
using System.Data.Entity.Infrastructure;
using AtPar.Common;

namespace AtPar.Data
{
    public class ATPAR_MASTER_Context : DbContext
    {
        static ATPAR_MASTER_Context()
        {
            Database.SetInitializer<ATPAR_MASTER_Context>(null);
        }

        public ATPAR_MASTER_Context()
            : base(BuildConnectionString)
        {
        }
        
        static string masterschema = string.Empty;
        private static string _buildConnectionString = string.Empty;
        private static string BuildConnectionString
        {
            set
            {
                _buildConnectionString = value;
            }
            get
            {
                if (string.IsNullOrEmpty(_buildConnectionString))
                {
                    Encryption atparEncriptService = new Encryption();
                    
                    string path = AppDomain.CurrentDomain.BaseDirectory.ToCharArray()[0].ToString() + @":\AtPar\conf.xml";

                    XDocument document = null;
                    string masterDBConnection = string.Empty;
                    if (File.Exists(path))
                    {
                        document = XDocument.Load(path);
                        var items = from item in document.Descendants("CONFIGFILE").Descendants("MASTER_DB")
                                    select new
                                    {
                                        userId = item.Element("USERID").Value,
                                        datasource = item.Element("DATASOURCE").Value,
                                        pwd = item.Element("PASSWORD").Value,
                                        server = item.Element("SERVER").Value
                                    };
                        masterschema = items.FirstOrDefault().userId;
                        _buildConnectionString =
                              "Data Source =" + items.FirstOrDefault().server +
                              "; Initial Catalog =" + items.FirstOrDefault().datasource +
                              "; Persist Security Info =True; " +
                              " User ID =" + items.FirstOrDefault().userId +
                              "; Password =" + atparEncriptService.Decrypt(items.FirstOrDefault().pwd) +
                              "; MultipleActiveResultSets =True";
                    }
                    else
                    {
                        //need to remove don't uncomment this.
                       // _buildConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["ATPAR_MASTER_Context"].ToString();
                    }
                }


                return _buildConnectionString;
            }
             
        }

        public DbSet<MT_ATPAR_SYSTEM_DB> MT_ATPAR_SYSTEM_DB { get; set; }
        public DbSet<MT_ATPAR_SYSTEM_DEVICES> MT_ATPAR_SYSTEM_DEVICES { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema(masterschema);
            modelBuilder.Configurations.Add(new MT_ATPAR_SYSTEM_DBMap());
            modelBuilder.Configurations.Add(new MT_ATPAR_SYSTEM_DEVICESMap());
        }
         
    }
}
