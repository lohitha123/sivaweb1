using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_CHARGECAPTURE_DETAILSMap : EntityTypeConfiguration<MT_POU_CHARGECAPTURE_DETAILS>
    {
        public MT_POU_CHARGECAPTURE_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.LINE_NO, t.TRANSACTION_ID });


            //Ignore property
            this.Ignore(t => t.DEPARTMENT_ID);
            this.Ignore(t => t.PROCEDURE_CODE);
            this.Ignore(t => t.PREF_LIST_ID);
            this.Ignore(t => t.CASE_ID);

            // Properties
            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ITEM_DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.ITEM_LOTNUMBER)
                .HasMaxLength(30);

            this.Property(t => t.ITEM_SRNUMBER)
                .HasMaxLength(30);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.CART_ID)
                .HasMaxLength(50);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.CHARGE_CODE)
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.COMPARTMENT)
                .HasMaxLength(50);

            this.Property(t => t.CART_NONCART_FLAG)
                .IsFixedLength()
                .HasMaxLength(2);

            this.Property(t => t.UOM)
                .HasMaxLength(20);

            this.Property(t => t.BILL_STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.MM_STATUS)
                .IsFixedLength()
                .HasMaxLength(2);

            this.Property(t => t.ORDERING_TYPE)
                .IsFixedLength()
                .HasMaxLength(2);

            this.Property(t => t.ITEM_INVENTORY)
                .HasMaxLength(10);

            this.Property(t => t.STORAGE_AREA)
                .HasMaxLength(50);

            this.Property(t => t.STORAGE_LEVEL_1)
                .HasMaxLength(4);

            this.Property(t => t.STORAGE_LEVEL_2)
                .HasMaxLength(4);

            this.Property(t => t.STORAGE_LEVEL_3)
                .HasMaxLength(4);

            this.Property(t => t.STORAGE_LEVEL_4)
                .HasMaxLength(4);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.UPC_ID)
                .HasMaxLength(50);

            this.Property(t => t.GTIN)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.CUST_ITEM_NO)
                .HasMaxLength(50);

            this.Property(t => t.TOTE_NO)
                .HasMaxLength(50);

            this.Property(t => t.LINE_COMMENTS)
                .HasMaxLength(1024);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_ID)
                .HasMaxLength(50);

            this.Property(t => t.PHY_ID)
                .HasMaxLength(60);

            this.Property(t => t.PREF_ID)
                .HasMaxLength(100);

            this.Property(t => t.PROC_ID)
                .HasMaxLength(100);

            // Table & Column Mappings
            this.ToTable("MT_POU_CHARGECAPTURE_DETAILS");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.ITEM_DESCRIPTION).HasColumnName("ITEM_DESCRIPTION");
            this.Property(t => t.ITEM_LOTNUMBER).HasColumnName("ITEM_LOTNUMBER");
            this.Property(t => t.ITEM_SRNUMBER).HasColumnName("ITEM_SRNUMBER");
            this.Property(t => t.ITEM_COUNT).HasColumnName("ITEM_COUNT");
            this.Property(t => t.WASTAGE_QTY).HasColumnName("WASTAGE_QTY");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.ITEM_COUNT_MM).HasColumnName("ITEM_COUNT_MM");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.CHARGE_CODE).HasColumnName("CHARGE_CODE");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.COMPARTMENT).HasColumnName("COMPARTMENT");
            this.Property(t => t.CART_NONCART_FLAG).HasColumnName("CART_NONCART_FLAG");
            this.Property(t => t.UOM).HasColumnName("UOM");
            this.Property(t => t.BILL_STATUS).HasColumnName("BILL_STATUS");
            this.Property(t => t.MM_STATUS).HasColumnName("MM_STATUS");
            this.Property(t => t.ORDERING_TYPE).HasColumnName("ORDERING_TYPE");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.BILLED_QTY).HasColumnName("BILLED_QTY");
            this.Property(t => t.HOLD_QTY).HasColumnName("HOLD_QTY");
            this.Property(t => t.ITEM_INVENTORY).HasColumnName("ITEM_INVENTORY");
            this.Property(t => t.STORAGE_AREA).HasColumnName("STORAGE_AREA");
            this.Property(t => t.STORAGE_LEVEL_1).HasColumnName("STORAGE_LEVEL_1");
            this.Property(t => t.STORAGE_LEVEL_2).HasColumnName("STORAGE_LEVEL_2");
            this.Property(t => t.STORAGE_LEVEL_3).HasColumnName("STORAGE_LEVEL_3");
            this.Property(t => t.STORAGE_LEVEL_4).HasColumnName("STORAGE_LEVEL_4");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.UPC_ID).HasColumnName("UPC_ID");
            this.Property(t => t.GTIN).HasColumnName("GTIN");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.CUST_ITEM_NO).HasColumnName("CUST_ITEM_NO");
            this.Property(t => t.ISSUE_QTY).HasColumnName("ISSUE_QTY");
            this.Property(t => t.TOTE_NO).HasColumnName("TOTE_NO");
            this.Property(t => t.ITEM_TYPE).HasColumnName("ITEM_TYPE");
            this.Property(t => t.LINE_COMMENTS).HasColumnName("LINE_COMMENTS");
            this.Property(t => t.EXPIRY_DATE).HasColumnName("EXPIRY_DATE");
            this.Property(t => t.CREATE_DATE_TIME).HasColumnName("CREATE_DATE_TIME");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.PHY_ID).HasColumnName("PHY_ID");
            this.Property(t => t.PREF_ID).HasColumnName("PREF_ID");
            this.Property(t => t.PROC_ID).HasColumnName("PROC_ID");
            this.Property(t => t.TYPE_OF_ITEM).HasColumnName("TYPE_OF_ITEM");
            this.Property(t => t.ADJUSTED_QTY).HasColumnName("ADJUSTED_QTY");
            this.Property(t => t.ISSUE_ADJ_QTY).HasColumnName("ISSUE_ADJ_QTY");
        }
    }
}
