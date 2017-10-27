using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_RECV_SIGNATUREMap : EntityTypeConfiguration<MT_DELV_RECV_SIGNATURE>
    {
        public MT_DELV_RECV_SIGNATUREMap()
        {
            // Primary Key
            this.HasKey(t => t.SIGNATURE_ID);

            // Properties
            this.Property(t => t.SIGNATURE_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.SIGNATURE)
                .HasMaxLength(4000);

            // Table & Column Mappings
            this.ToTable("MT_DELV_RECV_SIGNATURE");
            this.Property(t => t.SIGNATURE_ID).HasColumnName("SIGNATURE_ID");
            this.Property(t => t.SIGNATURE).HasColumnName("SIGNATURE");
        }
    }
}
