using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_AP_INTERFACE_TYPEMap : EntityTypeConfiguration<MT_AP_INTERFACE_TYPE>
    {
        public MT_AP_INTERFACE_TYPEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.INTERFACE_TYPE });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.INTERFACE_TYPE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.INTERFACE_DESCRIPTION)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_AP_INTERFACE_TYPE");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.INTERFACE_TYPE).HasColumnName("INTERFACE_TYPE");
            this.Property(t => t.INTERFACE_DESCRIPTION).HasColumnName("INTERFACE_DESCRIPTION");
        }
    }
}
