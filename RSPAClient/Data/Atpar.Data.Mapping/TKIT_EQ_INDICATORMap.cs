using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_EQ_INDICATORMap : EntityTypeConfiguration<TKIT_EQ_INDICATOR>
    {
        public TKIT_EQ_INDICATORMap()
        {
            // Primary Key
            this.HasKey(t => t.EQ_INDICATOR);

            // Properties
            this.Property(t => t.EQ_INDICATOR)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.EQ_RETURN)
                .HasMaxLength(1);

            this.Property(t => t.EQ_DESC)
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("TKIT_EQ_INDICATOR");
            this.Property(t => t.EQ_INDICATOR).HasColumnName("EQ_INDICATOR");
            this.Property(t => t.EQ_RETURN).HasColumnName("EQ_RETURN");
            this.Property(t => t.EQ_DESC).HasColumnName("EQ_DESC");
        }
    }
}
