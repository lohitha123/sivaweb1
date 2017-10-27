using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_PROFILE_MENUMap : EntityTypeConfiguration<MT_ATPAR_PROFILE_MENU>
    {
        public MT_ATPAR_PROFILE_MENUMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PROFILE_ID, t.APP_ID, t.MENU_CODE });

            this.Ignore(t => t.CHKSTATUS);

            // Properties
            this.Property(t => t.PROFILE_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.MENU_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_PROFILE_MENU");
            this.Property(t => t.PROFILE_ID).HasColumnName("PROFILE_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.MENU_CODE).HasColumnName("MENU_CODE");
            this.Property(t => t.MENU_SEQ_NO).HasColumnName("MENU_SEQ_NO");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
        }
    }
}
