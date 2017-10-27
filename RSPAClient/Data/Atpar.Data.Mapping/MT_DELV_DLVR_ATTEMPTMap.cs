using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_DLVR_ATTEMPTMap : EntityTypeConfiguration<MT_DELV_DLVR_ATTEMPT>
    {
        public MT_DELV_DLVR_ATTEMPTMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.ATTEMPT_DATE });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.COMMENT)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("MT_DELV_DLVR_ATTEMPT");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.ATTEMPT_DATE).HasColumnName("ATTEMPT_DATE");
            this.Property(t => t.COMMENT).HasColumnName("COMMENT");
        }
    }
}
