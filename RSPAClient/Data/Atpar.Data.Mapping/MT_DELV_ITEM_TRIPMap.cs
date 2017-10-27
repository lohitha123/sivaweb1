using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_ITEM_TRIPMap : EntityTypeConfiguration<MT_DELV_ITEM_TRIP>
    {
        public MT_DELV_ITEM_TRIPMap()
        {
            //ignore
            this.Ignore(t => t.USERNAME);
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.EVENT_ID });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.EVENT_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_DELV_ITEM_TRIP");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
        }
    }
}
