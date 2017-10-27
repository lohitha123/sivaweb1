using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_PARCEL_COUNTS_DETAILMap : EntityTypeConfiguration<MT_RECV_PARCEL_COUNTS_DETAIL>
    {
        public MT_RECV_PARCEL_COUNTS_DETAILMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.ORG_ID, t.TRACKING_NO });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.TRACKING_NO)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_RECV_PARCEL_COUNTS_DETAIL");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.TRACKING_NO).HasColumnName("TRACKING_NO");
            this.Property(t => t.NO_OF_BOXES).HasColumnName("NO_OF_BOXES");
            this.Property(t => t.SCAN_DATE).HasColumnName("SCAN_DATE");
        }
    }
}
