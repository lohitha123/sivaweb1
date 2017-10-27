using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SYSTEM_DBMap : EntityTypeConfiguration<MT_ATPAR_SYSTEM_DB>
    {
        public MT_ATPAR_SYSTEM_DBMap()
        {
            // Primary Key
            this.HasKey(t => t.SYSTEM_ID);

            // Properties
            this.Property(t => t.SYSTEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SYSTEM_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DATASOURCE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEMA_NAME)
                .HasMaxLength(50);

            this.Property(t => t.USERID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PASSWORD)
                .HasMaxLength(200);

            this.Property(t => t.SERVER)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(50);

            this.Property(t => t.VERSION_NO)
                .HasMaxLength(1000);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SYSTEM_DB");
            this.Property(t => t.SYSTEM_ID).HasColumnName("SYSTEM_ID");
            this.Property(t => t.SYSTEM_NAME).HasColumnName("SYSTEM_NAME");
            this.Property(t => t.DATASOURCE).HasColumnName("DATASOURCE");
            this.Property(t => t.SCHEMA_NAME).HasColumnName("SCHEMA_NAME");
            this.Property(t => t.USERID).HasColumnName("USERID");
            this.Property(t => t.PASSWORD).HasColumnName("PASSWORD");
            this.Property(t => t.SERVER).HasColumnName("SERVER");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.VERSION_NO).HasColumnName("VERSION_NO");
        }
    }
}
