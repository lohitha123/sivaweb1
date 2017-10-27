using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_BARCODE_SYMBOLOGYMap : EntityTypeConfiguration<MT_ATPAR_BARCODE_SYMBOLOGY>
    {
        public MT_ATPAR_BARCODE_SYMBOLOGYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SYMBOLOGY_TYPE, t.BARCODE_LENGTH });

            // Properties
            this.Property(t => t.SYMBOLOGY_TYPE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BARCODE_LENGTH)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(250);

            this.Property(t => t.UPDATE_USERID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_BARCODE_SYMBOLOGY");
            this.Property(t => t.SYMBOLOGY_TYPE).HasColumnName("SYMBOLOGY_TYPE");
            this.Property(t => t.BARCODE_LENGTH).HasColumnName("BARCODE_LENGTH");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.ID_START_POSITION).HasColumnName("ID_START_POSITION");
            this.Property(t => t.LENGTH).HasColumnName("LENGTH");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
        }
    }
}
