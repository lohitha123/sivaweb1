using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_TAG_LATEST_VALUESMap : EntityTypeConfiguration<RF_TAG_LATEST_VALUES>
    {
        public RF_TAG_LATEST_VALUESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.FIELD_NAME, t.LATEST_TAG_ID });

            // Properties
            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.LATEST_TAG_ID)
                .IsRequired()
                .HasMaxLength(24);

            // Table & Column Mappings
            this.ToTable("RF_TAG_LATEST_VALUES");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.LATEST_TAG_ID).HasColumnName("LATEST_TAG_ID");
        }
    }
}
