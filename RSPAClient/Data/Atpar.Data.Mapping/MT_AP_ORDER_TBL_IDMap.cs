using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_AP_ORDER_TBL_IDMap : EntityTypeConfiguration<MT_AP_ORDER_TBL_ID>
    {
        public MT_AP_ORDER_TBL_IDMap()
        {
            // Primary Key
            this.HasKey(t => t.APP_ID);

            // Properties
            this.Property(t => t.APP_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_AP_ORDER_TBL_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.ORDER_ID).HasColumnName("ORDER_ID");
        }
    }
}
