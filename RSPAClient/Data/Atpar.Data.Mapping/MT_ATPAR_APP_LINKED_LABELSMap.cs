using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_APP_LINKED_LABELSMap : EntityTypeConfiguration<MT_ATPAR_APP_LINKED_LABELS>
    {
        public MT_ATPAR_APP_LINKED_LABELSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.LABEL_TYPE, t.LABEL_LNK_TYPE });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LABEL_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LABEL_LNK_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LABEL_LNK_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_APP_LINKED_LABELS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.LABEL_TYPE).HasColumnName("LABEL_TYPE");
            this.Property(t => t.LABEL_LNK_TYPE).HasColumnName("LABEL_LNK_TYPE");
            this.Property(t => t.LABEL_LNK_DESCRIPTION).HasColumnName("LABEL_LNK_DESCRIPTION");
        }
    }
}
