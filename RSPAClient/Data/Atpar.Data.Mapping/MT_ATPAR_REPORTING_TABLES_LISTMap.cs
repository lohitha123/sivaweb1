using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_REPORTING_TABLES_LISTMap : EntityTypeConfiguration<MT_ATPAR_REPORTING_TABLES_LIST>
    {
        public MT_ATPAR_REPORTING_TABLES_LISTMap()
        {
            // Primary Key
            this.HasKey(t => t.NAME);

            // Properties
            this.Property(t => t.NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TYPE)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_REPORTING_TABLES_LIST", "ATPAR_MT");
            this.Property(t => t.NAME).HasColumnName("NAME");
            this.Property(t => t.TYPE).HasColumnName("TYPE");
        }
    }
}
