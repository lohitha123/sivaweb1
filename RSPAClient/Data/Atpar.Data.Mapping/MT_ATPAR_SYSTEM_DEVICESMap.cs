using AtPar.POCOEntities;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SYSTEM_DEVICESMap : EntityTypeConfiguration<MT_ATPAR_SYSTEM_DEVICES>
    {
        public MT_ATPAR_SYSTEM_DEVICESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SYSTEM_ID, t.DEVICE_ID, t.MAC_ADDRESS });

            // Properties
            this.Property(t => t.SYSTEM_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .IsRequired()
                .HasMaxLength(150);

            this.Property(t => t.MAC_ADDRESS)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SYSTEM_DEVICES");
            this.Property(t => t.SYSTEM_ID).HasColumnName("SYSTEM_ID");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.MAC_ADDRESS).HasColumnName("MAC_ADDRESS");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
