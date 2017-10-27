using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_MENUSMap : EntityTypeConfiguration<MT_ATPAR_MENUS>
    {
        public MT_ATPAR_MENUSMap()
        {

            this.Ignore(t => t.UPDATE_DELETE);
            // Primary Key
            this.HasKey(t => new { t.APP_ID, t.MENU_ID, t.MENU_SUB_GROUP, t.ENTERPRISE_SYSTEM });

            this.Ignore(t => t.APP_NAME);
            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.MENU_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.MENU_CODE)
                .HasMaxLength(50);

            this.Property(t => t.MENU_SUB_GROUP)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ENTERPRISE_SYSTEM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.MENU_NAME)
                .HasMaxLength(50);

            this.Property(t => t.AUDIT)
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USER)
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);
            this.Property(t => t.MENUS_FRIENDLYNAME)
                .HasMaxLength(250);
            

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_MENUS");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.MENU_ID).HasColumnName("MENU_ID");
            this.Property(t => t.MENU_CODE).HasColumnName("MENU_CODE");
            this.Property(t => t.MENU_SUB_GROUP).HasColumnName("MENU_SUB_GROUP");
            this.Property(t => t.ENTERPRISE_SYSTEM).HasColumnName("ENTERPRISE_SYSTEM");
            this.Property(t => t.MENU_NAME).HasColumnName("MENU_NAME");
            this.Property(t => t.MENU_SEQ_NO).HasColumnName("MENU_SEQ_NO");
            this.Property(t => t.AUDIT).HasColumnName("AUDIT");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.ROUTE).HasColumnName("ROUTE");
            this.Property(t => t.MENUS_FRIENDLYNAME).HasColumnName("MENUS_FRIENDLYNAME");
        }
    }
}
