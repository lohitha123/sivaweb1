using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_STATUSMap : EntityTypeConfiguration<MT_ATPAR_STATUS>
    {
        public MT_ATPAR_STATUSMap()
        {
            // Primary Key
            this.HasKey(t => t.STATUS_CODE);

            // Properties
            this.Property(t => t.STATUS_CODE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.STATUS_MESSAGE)
                .HasMaxLength(130);

            this.Property(t => t.STATUS_SOLUTION)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_STATUS");
            this.Property(t => t.STATUS_CODE).HasColumnName("STATUS_CODE");
            this.Property(t => t.STATUS_MESSAGE).HasColumnName("STATUS_MESSAGE");
            this.Property(t => t.STATUS_SOLUTION).HasColumnName("STATUS_SOLUTION");
            this.Property(t => t.ONLY_CLIENT).HasColumnName("ONLY_CLIENT");
            this.Property(t => t.LANG_ID).HasColumnName("LANG_ID");
            this.Property(t => t.STATUS_TYPE).HasColumnName("STATUS_TYPE");
        }
    }
}
