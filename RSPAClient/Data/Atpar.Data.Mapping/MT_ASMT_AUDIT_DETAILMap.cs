using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ASMT_AUDIT_DETAILMap : EntityTypeConfiguration<MT_ASMT_AUDIT_DETAIL>
    {
        public MT_ASMT_AUDIT_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.TRANSACTION_ID, t.KEY_1, t.KEY_2, t.KEY_3, t.KEY_4, t.FIELD_NAME });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_2)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_3)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.OLD_VALUE)
                .HasMaxLength(50);

            this.Property(t => t.NEW_VALUE)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ASMT_AUDIT_DETAIL");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.OLD_VALUE).HasColumnName("OLD_VALUE");
            this.Property(t => t.NEW_VALUE).HasColumnName("NEW_VALUE");
        }
    }
}
