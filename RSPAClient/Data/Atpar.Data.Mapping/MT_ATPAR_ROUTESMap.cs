using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ROUTESMap : EntityTypeConfiguration<MT_ATPAR_ROUTES>
    {
        public MT_ATPAR_ROUTESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.MENU_ID, t.MENU_SUB_GROUP, t.ENTERPRISE_SYSTEM });

            // Properties
            this.Property(t => t.MENU_ID)
                .IsRequired()
                .HasMaxLength(50);
            this.Property(t => t.MENU_SUB_GROUP)
               .IsRequired()
               .HasMaxLength(50);
            this.Property(t => t.ENTERPRISE_SYSTEM)
               .IsRequired()
               .HasMaxLength(50);
            this.Property(t => t.APP_ID)
               .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
            
            this.Property(t => t.ROUTE)
                .HasMaxLength(50);
            this.Property(t => t.AUDIT)
             .HasMaxLength(1);
            this.Property(t => t.LAST_UPDATE_USER)
           .HasMaxLength(20);
            this.Property(t => t.LAST_CLIENT_ADDRESS)
          .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ROUTES");

           
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.MENU_ID).HasColumnName("MENU_ID");
            this.Property(t => t.MENU_CODE).HasColumnName("MENU_CODE");
            this.Property(t => t.MENU_NAME).HasColumnName("MENU_NAME");
            this.Property(t => t.ROUTE).HasColumnName("ROUTE");
            this.Property(t => t.MENU_SUB_GROUP).HasColumnName("MENU_SUB_GROUP");
            this.Property(t => t.ENTERPRISE_SYSTEM).HasColumnName("ENTERPRISE_SYSTEM");
            this.Property(t => t.MENU_SEQ_NO).HasColumnName("MENU_SEQ_NO");
            this.Property(t => t.AUDIT).HasColumnName("AUDIT");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            
        }
        public int APP_ID { get; set; }

        public string MENU_ID { get; set; }

        public string MENU_CODE { get; set; }

        public string MENU_NAME { get; set; }

        public string ROUTE { get; set; }
        public string MENU_SUB_GROUP { get; set; }
        public string ENTERPRISE_SYSTEM { get; set; }
        public int MENU_SEQ_NO { get; set; }
        public int AUDIT { get; set; }
        public string LAST_UPDATE_DATE { get; set; }
        public string LAST_UPDATE_USER { get; set; }
        public string LAST_CLIENT_ADDRESS { get; set; }


  
    }

   
}
