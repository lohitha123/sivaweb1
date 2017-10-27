using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class TKIT_ITEM_INVENTORYMap : EntityTypeConfiguration<TKIT_ITEM_INVENTORY>
    {
        public TKIT_ITEM_INVENTORYMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_TYPE, t.ITEM_ID, t.SERIAL_NO, t.LOT_NO });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ASSET_ID)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.ITEM_TYPE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.SERIAL_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_NO)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.USER_FIELD_1)
                .HasMaxLength(20);

            this.Property(t => t.USER_FIELD_2)
                .HasMaxLength(20);
                        
            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Ignore(t => t.ROW_INDEX);

            // Table & Column Mappings
            this.ToTable("TKIT_ITEM_INVENTORY");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ASSET_ID).HasColumnName("ASSET_ID");
            this.Property(t => t.ITEM_TYPE).HasColumnName("ITEM_TYPE");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.SERIAL_NO).HasColumnName("SERIAL_NO");
            this.Property(t => t.LOT_NO).HasColumnName("LOT_NO");
            this.Property(t => t.ITEM_QTY).HasColumnName("ITEM_QTY");
            this.Property(t => t.STORAGE_LOCATION).HasColumnName("STORAGE_LOCATION");
            this.Property(t => t.SERVICE_DT_TIME).HasColumnName("SERVICE_DT_TIME");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.USER_FIELD_1).HasColumnName("USER_FIELD_1");
            this.Property(t => t.USER_FIELD_2).HasColumnName("USER_FIELD_2");
            this.Property(t => t.AVAILABILITY).HasColumnName("AVAILABILITY");
            this.Property(t => t.CHECKIN_DATE).HasColumnName("CHECKIN_DATE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
        }
    }
}
