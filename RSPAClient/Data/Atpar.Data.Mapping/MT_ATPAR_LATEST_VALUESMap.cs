using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LATEST_VALUESMap : EntityTypeConfiguration<MT_ATPAR_LATEST_VALUES>
    {
        public MT_ATPAR_LATEST_VALUESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.FIELD_ID });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.FIELD_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LATEST_VALUES");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.FIELD_ID).HasColumnName("FIELD_ID");
            this.Property(t => t.LATEST_VALUE).HasColumnName("LATEST_VALUE");
        }
    }
}
