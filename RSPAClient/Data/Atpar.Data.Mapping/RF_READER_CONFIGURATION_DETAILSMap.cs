using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RF_READER_CONFIGURATION_DETAILSMap : EntityTypeConfiguration<RF_READER_CONFIGURATION_DETAILS>
    {
        public RF_READER_CONFIGURATION_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.CONFIG_ID });

            // Properties
            this.Property(t => t.READER_LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.READER_MODEL)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.READER_IP)
               .HasMaxLength(50);

            this.Property(t => t.PRINTER_IP)
                .HasMaxLength(50);

            this.Property(t => t.TAG_ENCODE_MODE)
                .HasMaxLength(50);

            this.Property(t => t.ANTENNA_IDS)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.CONFIG_MODULE)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER)
                .HasMaxLength(100);

            this.Property(t => t.STATUS)
                .HasMaxLength(1).IsFixedLength()
            .IsUnicode(false);

            // Table & Column Mappings
            this.ToTable("RF_READER_CONFIGURATION_DETAILS");
            this.Property(t => t.CONFIG_ID).HasColumnName("CONFIG_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.READER_LOCATION).HasColumnName("READER_LOCATION");
            this.Property(t => t.READER_MODEL).HasColumnName("READER_MODEL");
            this.Property(t => t.READER_IP).HasColumnName("READER_IP");
            this.Property(t => t.READER_PORT).HasColumnName("READER_PORT");
            this.Property(t => t.PRINTER_IP).HasColumnName("PRINTER_IP");
            this.Property(t => t.PRINTER_PORT).HasColumnName("PRINTER_PORT");
            this.Property(t => t.READER_INTERVAL).HasColumnName("READER_INTERVAL");
            this.Property(t => t.TAG_ENCODE_MODE).HasColumnName("TAG_ENCODE_MODE");
            this.Property(t => t.ANTENNA_IDS).HasColumnName("ANTENNA_IDS");
            this.Property(t => t.DEFAULT_CONFIG).HasColumnName("DEFAULT_CONFIG");
            this.Property(t => t.CONFIG_MODULE).HasColumnName("CONFIG_MODULE");
            this.Property(t => t.UPDATE_USER).HasColumnName("UPDATE_USER");
            this.Property(t => t.UPDATE_DTTM).HasColumnName("UPDATE_DTTM");
        }
    }
}
