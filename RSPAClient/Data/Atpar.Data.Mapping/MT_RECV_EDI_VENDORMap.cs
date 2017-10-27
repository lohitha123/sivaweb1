using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_EDI_VENDORMap : EntityTypeConfiguration<MT_RECV_EDI_VENDOR>
    {
        public MT_RECV_EDI_VENDORMap()
        {
            // Primary Key
            this.HasKey(t => new { t.VENDOR_GROUP, t.VENDOR_ID });

            // Properties
            this.Property(t => t.VENDOR_GROUP)
                .IsRequired()
                .HasMaxLength(4);

            this.Property(t => t.VENDOR_ID)
                .IsRequired()
                .HasMaxLength(15);

            // Table & Column Mappings
            this.ToTable("MT_RECV_EDI_VENDOR");
            this.Property(t => t.VENDOR_GROUP).HasColumnName("VENDOR_GROUP");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
        }
    }
}
