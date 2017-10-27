using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LABELS_DATAMap : EntityTypeConfiguration<MT_ATPAR_LABELS_DATA>
    {
        public MT_ATPAR_LABELS_DATAMap()
        {
            // Primary Key
            this.HasKey(t => t.LABEL_FILE_NAME);

            // Properties
            this.Property(t => t.LABEL_FILE_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.LABEL_DATA_PNL)
                .IsRequired();

            this.Property(t => t.LABEL_DATA_LVX)
                .IsRequired();

            this.Property(t => t.MODEL)
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.PRINTER_CODE)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LABELS_DATA");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.LABEL_FILE_NAME).HasColumnName("LABEL_FILE_NAME");
            this.Property(t => t.LABEL_DATA_PNL).HasColumnName("LABEL_DATA_PNL");
            this.Property(t => t.LABEL_DATA_LVX).HasColumnName("LABEL_DATA_LVX");
            this.Property(t => t.LABEL_IMAGE).HasColumnName("LABEL_IMAGE");
            this.Property(t => t.MODEL).HasColumnName("MODEL");
            this.Property(t => t.WIDTH).HasColumnName("WIDTH");
            this.Property(t => t.HEIGHT).HasColumnName("HEIGHT");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.LABEL_TYPE).HasColumnName("LABEL_TYPE");
            this.Property(t => t.LINK_LABEL_TYPE).HasColumnName("LINK_LABEL_TYPE");
            this.Property(t => t.PRINTER_CODE).HasColumnName("PRINTER_CODE");
        }
    }
}
