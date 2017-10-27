using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_SETUP_PRO_PRINTERESMap : EntityTypeConfiguration<MT_ATPAR_SETUP_PRO_PRINTERES>
    {
        public MT_ATPAR_SETUP_PRO_PRINTERESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SEQ_NO });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SEQ_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.PRINTER_CODE)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.IP_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.FRIENDLY_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.STATUS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LABEL_FILE_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.NETWORK_TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.MODEL)
                .IsRequired()
                .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_SETUP_PRO_PRINTERES");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SEQ_NO).HasColumnName("SEQ_NO");
            this.Property(t => t.PRINTER_CODE).HasColumnName("PRINTER_CODE");
            this.Property(t => t.IP_ADDRESS).HasColumnName("IP_ADDRESS");
            this.Property(t => t.PORT_NO).HasColumnName("PORT_NO");
            this.Property(t => t.FRIENDLY_NAME).HasColumnName("FRIENDLY_NAME");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.LABEL_FILE_NAME).HasColumnName("LABEL_FILE_NAME");
            this.Property(t => t.NETWORK_TYPE).HasColumnName("NETWORK_TYPE");
            this.Property(t => t.LABEL_TYPE).HasColumnName("LABEL_TYPE");
            this.Property(t => t.LINKED_LABEL_TYPE).HasColumnName("LINKED_LABEL_TYPE");
            this.Property(t => t.MODEL).HasColumnName("MODEL");
        }
    }
}
