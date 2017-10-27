using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_ITEMMap : EntityTypeConfiguration<PAR_MNGT_ITEM>
    {
        public PAR_MNGT_ITEMMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_GROUP_ID, t.ITEM_ID });

            // Properties
            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CUST_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.SHORT_DESCR)
                .HasMaxLength(50);

            this.Property(t => t.LONG_DESCR)
                .HasMaxLength(255);

            this.Property(t => t.VENDOR_ID)
                .IsRequired()
                .HasMaxLength(15);

            this.Property(t => t.MANUFACTURER)
                .HasMaxLength(50);

            this.Property(t => t.MFG_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.VEND_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.UNIT_OF_PROCUREMENT)
                .HasMaxLength(5);

            this.Property(t => t.UNIT_OF_ISSUE)
                .HasMaxLength(5);

            this.Property(t => t.UPC_CODE)
                .HasMaxLength(50);

            this.Property(t => t.SERIAL_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.LOT_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.CHARGE_CODE)
                .HasMaxLength(50);

            this.Property(t => t.CUST_ITEM_DESCR)
                .HasMaxLength(255);

            this.Property(t => t.ITEM_CATEGORY)
                .HasMaxLength(100);

            this.Property(t => t.USER_FIELD_1)
                .HasMaxLength(100);

            this.Property(t => t.USER_FIELD_2)
                .HasMaxLength(100);

            this.Property(t => t.REPLENISHMENT_TYPE)
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.STRENGTH)
                .HasMaxLength(50);

            this.Property(t => t.DOSAGE)
                .HasMaxLength(50);

            this.Property(t => t.GTIN)
                .HasMaxLength(50);

            this.Property(t => t.IMPLANT_FLAG)
                .IsRequired()
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_ITEM");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.CUST_ITEM_ID).HasColumnName("CUST_ITEM_ID");
            this.Property(t => t.SHORT_DESCR).HasColumnName("SHORT_DESCR");
            this.Property(t => t.LONG_DESCR).HasColumnName("LONG_DESCR");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.MANUFACTURER).HasColumnName("MANUFACTURER");
            this.Property(t => t.MFG_ITEM_ID).HasColumnName("MFG_ITEM_ID");
            this.Property(t => t.VEND_ITEM_ID).HasColumnName("VEND_ITEM_ID");
            this.Property(t => t.UNIT_OF_PROCUREMENT).HasColumnName("UNIT_OF_PROCUREMENT");
            this.Property(t => t.UNIT_OF_ISSUE).HasColumnName("UNIT_OF_ISSUE");
            this.Property(t => t.CONV_FACTOR).HasColumnName("CONV_FACTOR");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.UPC_CODE).HasColumnName("UPC_CODE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.SERIAL_CONTROLLED).HasColumnName("SERIAL_CONTROLLED");
            this.Property(t => t.LOT_CONTROLLED).HasColumnName("LOT_CONTROLLED");
            this.Property(t => t.CHARGE_CODE).HasColumnName("CHARGE_CODE");
            this.Property(t => t.LATEX_FREE).HasColumnName("LATEX_FREE");
            this.Property(t => t.CUST_ITEM_DESCR).HasColumnName("CUST_ITEM_DESCR");
            this.Property(t => t.ITEM_CATEGORY).HasColumnName("ITEM_CATEGORY");
            this.Property(t => t.USER_FIELD_1).HasColumnName("USER_FIELD_1");
            this.Property(t => t.USER_FIELD_2).HasColumnName("USER_FIELD_2");
            this.Property(t => t.REPLENISHMENT_TYPE).HasColumnName("REPLENISHMENT_TYPE");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.LEAD_TIME).HasColumnName("LEAD_TIME");
            this.Property(t => t.CATALOG_FLG).HasColumnName("CATALOG_FLG");
            this.Property(t => t.PHARMACY_FLG).HasColumnName("PHARMACY_FLG");
            this.Property(t => t.SUBSTITUTE_ITEM_FLG).HasColumnName("SUBSTITUTE_ITEM_FLG");
            this.Property(t => t.STRENGTH).HasColumnName("STRENGTH");
            this.Property(t => t.DOSAGE).HasColumnName("DOSAGE");
            this.Property(t => t.EVERIFY_FLG).HasColumnName("EVERIFY_FLG");
            this.Property(t => t.CINDEX).HasColumnName("CINDEX");
            this.Property(t => t.GTIN).HasColumnName("GTIN");
            this.Property(t => t.IMPLANT_FLAG).HasColumnName("IMPLANT_FLAG");
        }
    }
}
