using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_LBL_PRINTERSMap : EntityTypeConfiguration<MT_ATPAR_LBL_PRINTERS>
    {
        public MT_ATPAR_LBL_PRINTERSMap()
        {
            // Primary Key
            this.HasKey(t => t.CODE);

            // Properties
            this.Property(t => t.CODE)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.NAME)
                .IsRequired()
                .HasMaxLength(100);

            this.Property(t => t.TYPE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.STATUS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_LBL_PRINTERS");
            this.Property(t => t.CODE).HasColumnName("CODE");
            this.Property(t => t.NAME).HasColumnName("NAME");
            this.Property(t => t.TYPE).HasColumnName("TYPE");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
        }
    }
}
