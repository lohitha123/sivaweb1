using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ORDER_HEADERMap : EntityTypeConfiguration<TKIT_ORDER_HEADER>
    {
        public TKIT_ORDER_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ORDER_NUMBER });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ORDER_NUMBER)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.REQUESTOR_ID)
                .HasMaxLength(50);

            this.Property(t => t.ORDER_STATUS)
                .HasMaxLength(50);

            this.Property(t => t.ORDER_COMMENTS)
                .HasMaxLength(30);

            this.Ignore(t => t.ITEM_COUNT);

            // Table & Column Mappings
            this.ToTable("TKIT_ORDER_HEADER");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ORDER_NUMBER).HasColumnName("ORDER_NUMBER");
            this.Property(t => t.ORDER_DATE).HasColumnName("ORDER_DATE");
            this.Property(t => t.REQUESTOR_ID).HasColumnName("REQUESTOR_ID");
            this.Property(t => t.ORDER_STATUS).HasColumnName("ORDER_STATUS");
            this.Property(t => t.ORDER_COMMENTS).HasColumnName("ORDER_COMMENTS");
        }
    }
}
