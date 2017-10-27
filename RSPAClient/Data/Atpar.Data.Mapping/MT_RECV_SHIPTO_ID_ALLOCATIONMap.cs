using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_SHIPTO_ID_ALLOCATIONMap : EntityTypeConfiguration<MT_RECV_SHIPTO_ID_ALLOCATION>
    {
        public MT_RECV_SHIPTO_ID_ALLOCATIONMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SETID, t.SHIPTO_ID, t.USER_ID });

            // Properties
            this.Property(t => t.SETID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SHIPTO_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DESCR)
                .HasMaxLength(255);

            this.Property(t => t.LAST_UPDATE_USERID)
                .HasMaxLength(20);

            // Igonoring the properties
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.CHK_ALLOCATED);
            this.Ignore(t => t.USERNAME);
            this.Ignore(t => t.ROWINDEX);         

            // Table & Column Mappings
            this.ToTable("MT_RECV_SHIPTO_ID_ALLOCATION");
            this.Property(t => t.SETID).HasColumnName("SETID");
            this.Property(t => t.SHIPTO_ID).HasColumnName("SHIPTO_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.DESCR).HasColumnName("DESCR");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("LAST_UPDATE_USERID");
        }
    }
}
