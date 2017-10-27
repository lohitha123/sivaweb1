using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_DASHBOARD_HEADERMap : EntityTypeConfiguration<MT_ATPAR_DASHBOARD_HEADER>
    {
        public MT_ATPAR_DASHBOARD_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => t.DASHBOARD_ID);

            // Properties
            this.Property(t => t.DASHBOARD_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.NAME)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_DASHBOARD_HEADER");
            this.Property(t => t.DASHBOARD_ID).HasColumnName("DASHBOARD_ID");
            this.Property(t => t.NAME).HasColumnName("NAME");
            this.Property(t => t.LAYOUT_ROWS).HasColumnName("LAYOUT_ROWS");
            this.Property(t => t.LAYOUT_COLUMNS).HasColumnName("LAYOUT_COLUMNS");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
        }
    }
}
