using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_CARRIERMap : EntityTypeConfiguration<MT_RECV_CARRIER>
    {
        public MT_RECV_CARRIERMap()
        {
            // Primary Key
            this.HasKey(t => t.CARRIER_ID);

            // Properties
            this.Property(t => t.CARRIER_ID)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.DESCR)
                .HasMaxLength(30);

            this.Property(t => t.STATUS)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USERID)
                .HasMaxLength(20);

            this.Property(t => t.LOCAL_FLAG)
                .IsRequired()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_RECV_CARRIER");
            this.Property(t => t.CARRIER_ID).HasColumnName("CARRIER_ID");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("LAST_UPDATE_USERID");
            this.Property(t => t.LOCAL_FLAG).HasColumnName("LOCAL_FLAG");
        }
    }
}
