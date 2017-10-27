using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_STIS_HEADERMap : EntityTypeConfiguration<RM_STIS_HEADER>
    {
        public RM_STIS_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => t.BUSINESS_UNIT);

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DESCR)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RM_STIS_HEADER");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
        }
    }
}
