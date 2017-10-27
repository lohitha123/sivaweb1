using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PREF_LIST_ALLOCMap : EntityTypeConfiguration<MT_POU_PREF_LIST_ALLOC>
    {
        public MT_POU_PREF_LIST_ALLOCMap()
        {
            // Primary Key
            this.HasKey(t => new { t.PREF_LIST_ID, t.ITEM_ID, t.PROCEDURE_ID });

            // Properties
            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCR)
                .HasMaxLength(255);

            this.Property(t => t.UPDATE_USERID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CUST_ITEM_NO)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_POU_PREF_LIST_ALLOC");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCR).HasColumnName("ITEM_DESCR");
            this.Property(t => t.QUANTITY).HasColumnName("QUANTITY");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USERID).HasColumnName("UPDATE_USERID");
            this.Property(t => t.HOLD_QTY).HasColumnName("HOLD_QTY");
            this.Property(t => t.PROCEDURE_ID).HasColumnName("PROCEDURE_ID");
            this.Property(t => t.CUST_ITEM_NO).HasColumnName("CUST_ITEM_NO");
        }
    }
}
