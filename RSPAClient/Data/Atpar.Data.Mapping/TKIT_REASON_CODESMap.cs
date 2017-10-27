using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_REASON_CODESMap : EntityTypeConfiguration<TKIT_REASON_CODES>
    {
        public TKIT_REASON_CODESMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.REASON_CODE });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.REASON_CODE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.REASON_DESCR)
                .HasMaxLength(256);

            this.Property(t => t.UPDATE_USERID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("TKIT_REASON_CODES");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.REASON_CODE).HasColumnName("REASON_CODE");
            this.Property(t => t.REASON_DESCR).HasColumnName("REASON_DESCR");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
