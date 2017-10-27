using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROFILE_LIST_VIEWMap : EntityTypeConfiguration<MT_ATPAR_PROFILE_LIST_VIEW>
    {
        public MT_ATPAR_PROFILE_LIST_VIEWMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PROFILE_ID, t.APP_ID, t.SCREEN_NAME, t.FIELD_NAME });

            // Properties
            this.Property(t => t.PROFILE_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCREEN_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.VALUE)
                .HasMaxLength(50);

            this.Property(t => t.COLUMN_HEADER)
                .HasMaxLength(20);

            this.Property(t => t.DISPLAY_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.TOGGLE_FIELD)
                .HasMaxLength(1);

            this.Property(t => t.DEFAULT_TOGGLE_TEXT)
                .HasMaxLength(50);

            this.Property(t => t.TOGGLE_ORDER)
                .HasMaxLength(2);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROFILE_LIST_VIEW");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SCREEN_NAME).HasColumnName("SCREEN_NAME");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.VALUE).HasColumnName("VALUE");
            this.Property(t => t.COLUMN_HEADER).HasColumnName("COLUMN_HEADER");
            this.Property(t => t.COLUMN_ORDER).HasColumnName("COLUMN_ORDER");
            this.Property(t => t.COLUMN_WIDTH).HasColumnName("COLUMN_WIDTH");
            this.Property(t => t.DISPLAY_FIELD).HasColumnName("DISPLAY_FIELD");
            this.Property(t => t.TOGGLE_FIELD).HasColumnName("TOGGLE_FIELD");
            this.Property(t => t.DEFAULT_TOGGLE_TEXT).HasColumnName("DEFAULT_TOGGLE_TEXT");
            this.Property(t => t.TOGGLE_ORDER).HasColumnName("TOGGLE_ORDER");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
