using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ORG_GROUP_PARAMETERSMap : EntityTypeConfiguration<MT_ATPAR_ORG_GROUP_PARAMETERS>
    {
        public MT_ATPAR_ORG_GROUP_PARAMETERSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.APP_ID, t.PARAMETER_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PARAMETER_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAMETER_VALUE)
                .HasMaxLength(4000);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ORG_GROUP_PARAMETERS");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.PARAMETER_ID).HasColumnName("PARAMETER_ID");
            this.Property(t => t.PARAMETER_VALUE).HasColumnName("PARAMETER_VALUE");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
