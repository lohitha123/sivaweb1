using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_UI_SETUPMap : EntityTypeConfiguration<MT_ATPAR_UI_SETUP>
    {
        public MT_ATPAR_UI_SETUPMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SCREEN_NAME, t.USER_ID, t.FIELD_NAME });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCREEN_NAME)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.FIELD_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.FIELD_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.DISPLAY_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.EDIT_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.MANDATORY_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_UI_SETUP");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SCREEN_NAME).HasColumnName("SCREEN_NAME");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.FIELD_NAME).HasColumnName("FIELD_NAME");
            this.Property(t => t.FIELD_DESCR).HasColumnName("FIELD_DESCR");
            this.Property(t => t.DISPLAY_FLAG).HasColumnName("DISPLAY_FLAG");
            this.Property(t => t.EDIT_FLAG).HasColumnName("EDIT_FLAG");
            this.Property(t => t.SCAN_ORDER).HasColumnName("SCAN_ORDER");
            this.Property(t => t.MANDATORY_FLAG).HasColumnName("MANDATORY_FLAG");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
        }
    }
}
