using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_AUDIT_INFOMap : EntityTypeConfiguration<MT_ATPAR_AUDIT_INFO>
    {
        public MT_ATPAR_AUDIT_INFOMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.FUNCTION_NAME, t.KEY_VALUES, t.UPDATE_USER_ID, t.UPDATE_DATE, t.FIELD_NAME });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.FUNCTION_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.SUBFUNCTION_NAME)
                .HasMaxLength(100);

            this.Property(t => t.KEY_VALUES)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.OLD_VALUE)
                .HasMaxLength(255);

            this.Property(t => t.NEW_VALUE)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_AUDIT_INFO");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.FUNCTION_NAME).HasColumnName("FUNCTION_NAME");
            this.Property(t => t.SUBFUNCTION_NAME).HasColumnName("SUBFUNCTION_NAME");
            this.Property(t => t.KEY_VALUES).HasColumnName("KEY_VALUES");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.OLD_VALUE).HasColumnName("OLD_VALUE");
            this.Property(t => t.NEW_VALUE).HasColumnName("NEW_VALUE");
        }
    }
}
