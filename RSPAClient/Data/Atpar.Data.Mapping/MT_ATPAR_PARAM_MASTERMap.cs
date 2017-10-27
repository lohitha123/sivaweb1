using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PARAM_MASTERMap : EntityTypeConfiguration<MT_ATPAR_PARAM_MASTER>
    {
        public MT_ATPAR_PARAM_MASTERMap()
        {
            this.Ignore(t => t.PARAMETER_VALUE);
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.PARAMETER_ID, t.ENTERPRISE_SYSTEM });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PARAMETER_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.ENTERPRISE_SYSTEM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PARAMETER_LEVEL)
                .HasMaxLength(30);

            this.Property(t => t.SHORT_DESCR)
                .HasMaxLength(75);

            this.Property(t => t.LONG_DESCR)
                .HasMaxLength(500);

            this.Property(t => t.PARAMETER_TYPE)
                .HasMaxLength(20);

            this.Property(t => t.DEFAULT_VALUE)
                .HasMaxLength(300);

            this.Property(t => t.VALIDATION)
                .HasMaxLength(20);

            this.Property(t => t.MULTIPLE_VALUES)
                .HasMaxLength(255);

            this.Property(t => t.CLIENT_SYNC)
                .HasMaxLength(1);

            this.Property(t => t.REQUIRED_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.PROMPT_TABLE)
                .HasMaxLength(50);

            this.Property(t => t.PROMPT_FIELD)
                .HasMaxLength(500);

            this.Property(t => t.WHERE_CONDITION)
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PARAM_MASTER");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.PARAMETER_ID).HasColumnName("PARAMETER_ID");
            this.Property(t => t.ENTERPRISE_SYSTEM).HasColumnName("ENTERPRISE_SYSTEM");
            this.Property(t => t.PARAMETER_LEVEL).HasColumnName("PARAMETER_LEVEL");
            this.Property(t => t.SHORT_DESCR).HasColumnName("SHORT_DESCR");
            this.Property(t => t.LONG_DESCR).HasColumnName("LONG_DESCR");
            this.Property(t => t.SEQ_NO).HasColumnName("SEQ_NO");
            this.Property(t => t.PARAMETER_TYPE).HasColumnName("PARAMETER_TYPE");
            this.Property(t => t.DEFAULT_VALUE).HasColumnName("DEFAULT_VALUE");
            this.Property(t => t.VALIDATION).HasColumnName("VALIDATION");
            this.Property(t => t.MULTIPLE_VALUES).HasColumnName("MULTIPLE_VALUES");
            this.Property(t => t.SIZE).HasColumnName("SIZE");
            this.Property(t => t.MIN_VALUE).HasColumnName("MIN_VALUE");
            this.Property(t => t.MAX_VALUE).HasColumnName("MAX_VALUE");
            this.Property(t => t.CLIENT_SYNC).HasColumnName("CLIENT_SYNC");
            this.Property(t => t.REQUIRED_FLAG).HasColumnName("REQUIRED_FLAG");
            this.Property(t => t.PROMPT_TABLE).HasColumnName("PROMPT_TABLE");
            this.Property(t => t.PROMPT_FIELD).HasColumnName("PROMPT_FIELD");
            this.Property(t => t.WHERE_CONDITION).HasColumnName("WHERE_CONDITION");
        }
    }
}
