using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_EVENT_SUMMARYMap : EntityTypeConfiguration<MT_CYCT_EVENT_SUMMARY>
    {
        public MT_CYCT_EVENT_SUMMARYMap()
        {
            // Primary Key
            this.HasKey(t => t.EVENT_ID);

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(10);

            this.Property(t => t.EVENT_ID)
                .IsRequired()
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_EVENT_SUMMARY");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.NO_OF_ITEMS).HasColumnName("NO_OF_ITEMS");
            this.Property(t => t.NO_OF_ITEMS_NEGATIVE).HasColumnName("NO_OF_ITEMS_NEGATIVE");
            this.Property(t => t.NO_OF_ITEMS_POSITIVE).HasColumnName("NO_OF_ITEMS_POSITIVE");
            this.Property(t => t.TOTAL_VALUE).HasColumnName("TOTAL_VALUE");
            this.Property(t => t.TOTAL_VALUE_DIFF).HasColumnName("TOTAL_VALUE_DIFF");
            this.Property(t => t.POST_DATE).HasColumnName("POST_DATE");
        }
    }
}
