using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CHARGECAPTURE_RETURNSMap : EntityTypeConfiguration<MT_POU_CHARGECAPTURE_RETURNS>
    {
        public MT_POU_CHARGECAPTURE_RETURNSMap()
        {
            // Primary Key
            this.HasKey(t => t.RETURN_ID);

            // Properties
            this.Property(t => t.REASON_CODE)
                .HasMaxLength(20);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(1024);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_CHARGECAPTURE_RETURNS");
            this.Property(t => t.RETURN_ID).HasColumnName("RETURN_ID");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.REASON_CODE).HasColumnName("REASON_CODE");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.RETURN_QTY).HasColumnName("RETURN_QTY");
            this.Property(t => t.WASTAGE_QTY).HasColumnName("WASTAGE_QTY");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
        }
    }
}
