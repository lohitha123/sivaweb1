using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_OBJECTSMap : EntityTypeConfiguration<MT_ATPAR_OBJECTS>
    {
        public MT_ATPAR_OBJECTSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.TABLE_NAME });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TABLE_NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.TABLE_TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PURGE_FLAG)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.CONDITION_COLUMN)
                .HasMaxLength(50);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(500);

            this.Property(t => t.UPDATE_USER)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_OBJECTS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.TABLE_NAME).HasColumnName("TABLE_NAME");
            this.Property(t => t.TABLE_TYPE).HasColumnName("TABLE_TYPE");
            this.Property(t => t.PURGE_FLAG).HasColumnName("PURGE_FLAG");
            this.Property(t => t.CONDITION_COLUMN).HasColumnName("CONDITION_COLUMN");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER).HasColumnName("UPDATE_USER");
        }
    }
}
