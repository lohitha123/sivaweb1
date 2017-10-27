using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_NOTES_SETUPMap : EntityTypeConfiguration<MT_ATPAR_NOTES_SETUP>
    {
        public MT_ATPAR_NOTES_SETUPMap()
        {
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.SCREEN_NAME });

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SCREEN_NAME)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.NOTES_LABEL)
                .HasMaxLength(20);

            this.Property(t => t.NOTES_LIST_DISPLAY)
                .HasMaxLength(1);

            this.Property(t => t.NOTES_TABLE_NAME)
                .HasMaxLength(30);

            this.Property(t => t.NOTES_FIELD_NAME)
                .HasMaxLength(30);

            this.Property(t => t.ALLOW_EDIT_NOTES)
                .HasMaxLength(1);

            this.Property(t => t.CAPTURE_CODE)
                .HasMaxLength(1);

            this.Property(t => t.APPEND_SELECTED_TEXT)
                .HasMaxLength(1);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_NOTES_SETUP");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.SCREEN_NAME).HasColumnName("SCREEN_NAME");
            this.Property(t => t.NOTES_LABEL).HasColumnName("NOTES_LABEL");
            this.Property(t => t.NOTES_LIST_DISPLAY).HasColumnName("NOTES_LIST_DISPLAY");
            this.Property(t => t.NOTES_TABLE_NAME).HasColumnName("NOTES_TABLE_NAME");
            this.Property(t => t.NOTES_FIELD_NAME).HasColumnName("NOTES_FIELD_NAME");
            this.Property(t => t.ALLOW_EDIT_NOTES).HasColumnName("ALLOW_EDIT_NOTES");
            this.Property(t => t.CAPTURE_CODE).HasColumnName("CAPTURE_CODE");
            this.Property(t => t.APPEND_SELECTED_TEXT).HasColumnName("APPEND_SELECTED_TEXT");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
        }
    }
}
