using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ITEM_TYPEMap : EntityTypeConfiguration<TKIT_ITEM_TYPE>
    {
        public TKIT_ITEM_TYPEMap()
        {

            this.Ignore(t => t.ITEM_TYPE_INDICATOR_DESC);
            this.Ignore(t => t.SERIAL_NO);
            this.Ignore(t => t.ROW_INDEX);

            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_TYPE });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_TYPE_INDICATOR)
                .HasMaxLength(1);

            this.Property(t => t.ITEM_TYPE_DESCR)
                .HasMaxLength(50);

           
       
            //this.Property(t => t.ITEM_TYPE_INDICATOR_DESC);

            // Table & Column Mappings
            this.ToTable("TKIT_ITEM_TYPE");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_TYPE).HasColumnName("ITEM_TYPE");
            this.Property(t => t.ITEM_TYPE_INDICATOR).HasColumnName("ITEM_TYPE_INDICATOR");
            this.Property(t => t.ITEM_TYPE_DESCR).HasColumnName("ITEM_TYPE_DESCR");
        }
    }
}
