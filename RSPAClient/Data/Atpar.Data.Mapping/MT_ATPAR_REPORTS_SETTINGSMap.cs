using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_REPORTS_SETTINGSMap : EntityTypeConfiguration<MT_ATPAR_REPORTS_SETTINGS>
    {
        public MT_ATPAR_REPORTS_SETTINGSMap()
        {
            // Primary Key
            this.HasKey(t => t.NAME);

            // Properties
            this.Property(t => t.NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.VALUE)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_REPORTS_SETTINGS", "ATPAR_MT");
            this.Property(t => t.NAME).HasColumnName("NAME");
            this.Property(t => t.VALUE).HasColumnName("VALUE");
        }
    }
}
