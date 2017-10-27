using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROFILE_PARAMETERSMap : EntityTypeConfiguration<MT_ATPAR_PROFILE_PARAMETERS>
    {
        public MT_ATPAR_PROFILE_PARAMETERSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PROFILE_ID, t.APP_ID, t.PARAMETER_ID });

            // Properties
            this.Property(t => t.PROFILE_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PARAMETER_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.PARAMETER_VALUE)
                .HasMaxLength(100);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROFILE_PARAMETERS");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.PARAMETER_ID).HasColumnName("PARAMETER_ID");
            this.Property(t => t.PARAMETER_VALUE).HasColumnName("PARAMETER_VALUE");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
