using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SIGNATUREMap : EntityTypeConfiguration<MT_ATPAR_SIGNATURE>
    {
        public MT_ATPAR_SIGNATUREMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SIGNATURE_ID });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SIGNATURE_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SIGNATURE)
                .HasMaxLength(4000);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SIGNATURE");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SIGNATURE_ID).HasColumnName("SIGNATURE_ID");
            this.Property(t => t.SIGNATURE).HasColumnName("SIGNATURE");
        }
    }
}
