using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_EVENT_DETAILMap : EntityTypeConfiguration<MT_CYCT_EVENT_DETAIL>
    {
        public MT_CYCT_EVENT_DETAILMap()
        {

            //igonore columns
            this.Ignore(a => a.STORAGE_LOCATION);
            this.Ignore(a => a.SERIAL_CONTROLLED);
            this.Ignore(a => a.EVENT_TYPE);
            this.Ignore(a => a.TOTALREC);
            this.Ignore(a => a.INV_ITEM_ID_DESC);
            // Primary Key
            this.HasKey(t => new { t.ITEM_REC_NUM, t.TRANSACTION_ID });

            // Properties
            this.Property(t => t.ITEM_REC_NUM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.INV_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_AREA)
                .HasMaxLength(50);

            this.Property(t => t.STOR_LEVEL_1)
                .HasMaxLength(4);

            this.Property(t => t.STOR_LEVEL_2)
                .HasMaxLength(4);

            this.Property(t => t.STOR_LEVEL_3)
                .HasMaxLength(4);

            this.Property(t => t.STOR_LEVEL_4)
                .HasMaxLength(4);

            this.Property(t => t.CONTAINER_ID)
                .HasMaxLength(10);

            this.Property(t => t.SERIAL_ID)
                .HasMaxLength(20);

            this.Property(t => t.INV_LOT_ID)
                .HasMaxLength(20);

            this.Property(t => t.UNIT_OF_MEASURE)
                .HasMaxLength(20);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(254);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.INVENTORY_TAG_ID)
                .HasMaxLength(15);

            this.Property(t => t.RECOUNT_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.COUNT_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.CUST_ITEM_NO)
                .HasMaxLength(50);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(100);

            this.Property(t => t.PROJECT_ID)
                .HasMaxLength(50);

            this.Property(t => t.GTIN)
                .HasMaxLength(100);

            this.Property(t => t.RECOUNT_USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.REPORT_FIELD_1)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_FIELD_2)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_FIELD_3)
                .HasMaxLength(255);

            this.Property(t => t.REPORT_FIELD_4)
                .HasMaxLength(255);

            this.Property(t => t.PACKAGING_STRING)
                .HasMaxLength(200);

            this.Property(t => t.UOM_TYPE)
                .HasMaxLength(1);

            this.Property(t => t.STD_PACK_UOM)
                .HasMaxLength(5);

            this.Property(t => t.L_S_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.CONSIGNED_FLAG)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_EVENT_DETAIL");
            this.Property(t => t.ITEM_REC_NUM).HasColumnName("ITEM_REC_NUM");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.STORAGE_AREA).HasColumnName("STORAGE_AREA");
            this.Property(t => t.STOR_LEVEL_1).HasColumnName("STOR_LEVEL_1");
            this.Property(t => t.STOR_LEVEL_2).HasColumnName("STOR_LEVEL_2");
            this.Property(t => t.STOR_LEVEL_3).HasColumnName("STOR_LEVEL_3");
            this.Property(t => t.STOR_LEVEL_4).HasColumnName("STOR_LEVEL_4");
            this.Property(t => t.CONTAINER_ID).HasColumnName("CONTAINER_ID");
            this.Property(t => t.STAGED_DATE).HasColumnName("STAGED_DATE");
            this.Property(t => t.SERIAL_ID).HasColumnName("SERIAL_ID");
            this.Property(t => t.INV_LOT_ID).HasColumnName("INV_LOT_ID");
            this.Property(t => t.UNIT_OF_MEASURE).HasColumnName("UNIT_OF_MEASURE");
            this.Property(t => t.COUNT_QTY).HasColumnName("COUNT_QTY");
            this.Property(t => t.SYS_QTY).HasColumnName("SYS_QTY");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.INVENTORY_TAG_ID).HasColumnName("INVENTORY_TAG_ID");
            this.Property(t => t.RECOUNT_FLAG).HasColumnName("RECOUNT_FLAG");
            this.Property(t => t.COUNT_USER_ID).HasColumnName("COUNT_USER_ID");
            this.Property(t => t.CUST_ITEM_NO).HasColumnName("CUST_ITEM_NO");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.COUNT_DATE).HasColumnName("COUNT_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.PROJECT_ID).HasColumnName("PROJECT_ID");
            this.Property(t => t.REVIEWER_COUNT).HasColumnName("REVIEWER_COUNT");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.GTIN).HasColumnName("GTIN");
            this.Property(t => t.LATEST_UPDATE_DATE).HasColumnName("LATEST_UPDATE_DATE");
            this.Property(t => t.RECOUNT_USER_ID).HasColumnName("RECOUNT_USER_ID");
            this.Property(t => t.REPORT_FIELD_1).HasColumnName("REPORT_FIELD_1");
            this.Property(t => t.REPORT_FIELD_2).HasColumnName("REPORT_FIELD_2");
            this.Property(t => t.REPORT_FIELD_3).HasColumnName("REPORT_FIELD_3");
            this.Property(t => t.REPORT_FIELD_4).HasColumnName("REPORT_FIELD_4");
            this.Property(t => t.PACKAGING_STRING).HasColumnName("PACKAGING_STRING");
            this.Property(t => t.COUNT_QTY1).HasColumnName("COUNT_QTY1");
            this.Property(t => t.COUNT_QTY2).HasColumnName("COUNT_QTY2");
            this.Property(t => t.UOM_TYPE).HasColumnName("UOM_TYPE");
            this.Property(t => t.STD_PACK_UOM).HasColumnName("STD_PACK_UOM");
            this.Property(t => t.L_S_CONTROLLED).HasColumnName("L_S_CONTROLLED");
            this.Property(t => t.CONSIGNED_FLAG).HasColumnName("CONSIGNED_FLAG");
            this.Property(t => t.CONVERSION_RATE).HasColumnName("CONVERSION_RATE");
        }
    }
}
