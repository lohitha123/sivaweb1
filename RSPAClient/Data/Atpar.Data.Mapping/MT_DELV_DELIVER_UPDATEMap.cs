using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_DELIVER_UPDATEMap : EntityTypeConfiguration<MT_DELV_DELIVER_UPDATE>
    {
        public MT_DELV_DELIVER_UPDATEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.KEY_1, t.KEY_2, t.KEY_3 });

            // Properties
            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.KEY_2)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.KEY_3)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_DELV_DELIVER_UPDATE");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
        }
    }
}
