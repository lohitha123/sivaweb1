using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_MANAGE_CARRIERSMap : EntityTypeConfiguration<MT_RECV_MANAGE_CARRIERS>
    {
        public MT_RECV_MANAGE_CARRIERSMap()
        {
            // Primary Key
            this.HasKey(t => t.SEARCH_STRING);

            // Properties
            this.Property(t => t.SEARCH_STRING)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CARRIER)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.CREATE_USERID)
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USERID)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_RECV_MANAGE_CARRIERS");
            this.Property(t => t.SEARCH_STRING).HasColumnName("SEARCH_STRING");
            this.Property(t => t.START_POSITION).HasColumnName("START_POSITION");
            this.Property(t => t.CARRIER).HasColumnName("CARRIER");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.CREATE_USERID).HasColumnName("CREATE_USERID");
            this.Property(t => t.CREATE_DATE).HasColumnName("CREATE_DATE");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
        }
    }
}
