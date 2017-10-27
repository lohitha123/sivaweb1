using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_PARCEL_COUNTS_SIGNATUREMap : EntityTypeConfiguration<MT_RECV_PARCEL_COUNTS_SIGNATURE>
    {
        public MT_RECV_PARCEL_COUNTS_SIGNATUREMap()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SIGNATURE)
                .HasMaxLength(4000);

            // Table & Column Mappings
            this.ToTable("MT_RECV_PARCEL_COUNTS_SIGNATURE");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.SIGNATURE).HasColumnName("SIGNATURE");
        }
    }
}
