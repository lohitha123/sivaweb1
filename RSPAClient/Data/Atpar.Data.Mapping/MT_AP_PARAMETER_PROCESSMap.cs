using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_AP_PARAMETER_PROCESSMap : EntityTypeConfiguration<MT_AP_PARAMETER_PROCESS>
    {
        public MT_AP_PARAMETER_PROCESSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PARAM_ID, t.PARAM_APP_ID, t.PARAM_HOSPGROUP, t.PARAM_INTERFACE_TYPE });

            // Properties
            this.Property(t => t.PARAM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAM_APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PARAM_HOSPGROUP)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAM_INTERFACE_TYPE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAM_VALUE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_AP_PARAMETER_PROCESS");
            this.Property(t => t.PARAM_ID).HasColumnName("PARAM_ID");
            this.Property(t => t.PARAM_APP_ID).HasColumnName("PARAM_APP_ID");
            this.Property(t => t.PARAM_HOSPGROUP).HasColumnName("PARAM_HOSPGROUP");
            this.Property(t => t.PARAM_INTERFACE_TYPE).HasColumnName("PARAM_INTERFACE_TYPE");
            this.Property(t => t.PARAM_VALUE).HasColumnName("PARAM_VALUE");
        }
    }
}
