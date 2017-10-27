using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_REASON_CODEMap : EntityTypeConfiguration<MT_POU_REASON_CODE>
    {
        public MT_POU_REASON_CODEMap()
        {
            //Ignore Property
            this.Ignore(t => t.CODE);
            // Primary Key
            this.HasKey(t => t.REASON_CODE);

            // Properties
            this.Property(t => t.REASON_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_POU_REASON_CODE");
            this.Property(t => t.REASON_CODE).HasColumnName("REASON_CODE");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
