using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_STIS_UOM_SETUPMap : EntityTypeConfiguration<MT_STIS_UOM_SETUP>
    {
        public MT_STIS_UOM_SETUPMap()
        {
            // Primary Key
            this.HasKey(t => t.UOM);

            // Properties
            this.Property(t => t.UOM)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(20);

            this.Property(t => t.STATUS)
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_STIS_UOM_SETUP");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER_ID).HasColumnName("LAST_UPDATE_USER_ID");
        }
    }
}
