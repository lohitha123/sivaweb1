using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_AUDIT_TEMPMap : EntityTypeConfiguration<MT_ATPAR_AUDIT_TEMP>
    {
        public MT_ATPAR_AUDIT_TEMPMap()
        {
            // Primary Key
            this.HasKey(t => new { t.UPDATE_USER_ID, t.UPDATE_DATE });

            // Properties
            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.KEY_1)
                .HasMaxLength(30);

            this.Property(t => t.KEY_2)
                .HasMaxLength(30);

            this.Property(t => t.FUNCTION_NAME)
                .HasMaxLength(30);

            this.Property(t => t.FIELD_NAME)
                .HasMaxLength(30);

            this.Property(t => t.OLD_VALUE)
                .HasMaxLength(30);

            this.Property(t => t.NEW_VALUE)
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_AUDIT_TEMP");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.FUNCTION_NAME).HasColumnName("FUNCTION_NAME");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.OLD_VALUE).HasColumnName("OLD_VALUE");
            this.Property(t => t.NEW_VALUE).HasColumnName("NEW_VALUE");
        }
    }
}
