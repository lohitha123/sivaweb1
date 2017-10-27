using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_BTBN_INV_SYNC_DATAMap : EntityTypeConfiguration<MT_BTBN_INV_SYNC_DATA>
    {
        public MT_BTBN_INV_SYNC_DATAMap()
        {
            // Primary Key
            this.HasKey(t => new { t.USER_ID, t.DEVICE_ID, t.UPDATE_DATE });

            // Properties
            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DEVICE_ID)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.SYNC_DATA)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("MT_BTBN_INV_SYNC_DATA");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DEVICE_ID).HasColumnName("DEVICE_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.SYNC_DATA).HasColumnName("SYNC_DATA");
        }
    }
}
