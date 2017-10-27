using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PRINT_LABEL_HEADERMap : EntityTypeConfiguration<MT_ATPAR_PRINT_LABEL_HEADER>
    {
        public MT_ATPAR_PRINT_LABEL_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.OBJECT_ID });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.OBJECT_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.OBJECT_DESC)
                .HasMaxLength(100);

            this.Property(t => t.PRINTER_TYPE)
                .HasMaxLength(50);

            this.Property(t => t.OBJECT_TYPE)
                .HasMaxLength(50);

            this.Property(t => t.FILE_NAME)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PRINT_LABEL_HEADER");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.OBJECT_ID).HasColumnName("OBJECT_ID");
            this.Property(t => t.OBJECT_DESC).HasColumnName("OBJECT_DESC");
            this.Property(t => t.PRINTER_TYPE).HasColumnName("PRINTER_TYPE");
            this.Property(t => t.HEIGHT).HasColumnName("HEIGHT");
            this.Property(t => t.WIDTH).HasColumnName("WIDTH");
            this.Property(t => t.OBJECT_TYPE).HasColumnName("OBJECT_TYPE");
            this.Property(t => t.FILE_NAME).HasColumnName("FILE_NAME");
            this.Property(t => t.FILE_LVX).HasColumnName("FILE_LVX");
            this.Property(t => t.FILE_PNL).HasColumnName("FILE_PNL");
        }
    }
}
