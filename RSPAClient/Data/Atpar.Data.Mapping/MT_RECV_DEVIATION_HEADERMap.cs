using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_RECV_DEVIATION_HEADERMap : EntityTypeConfiguration<MT_RECV_DEVIATION_HEADER>
    {
        public MT_RECV_DEVIATION_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.LINE_NO });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LINE_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.PO_ID)
                .HasMaxLength(50);

            this.Property(t => t.INV_ITEM_ID)
                .HasMaxLength(50);

            this.Property(t => t.DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.UNIT_OF_MEASURE)
                .HasMaxLength(5);

            this.Property(t => t.RECV_UOM)
                .HasMaxLength(5);

            this.Property(t => t.INVENTORY_ITEM)
                .HasMaxLength(1);

            this.Property(t => t.VENDOR_ID)
                .HasMaxLength(50);

            this.Property(t => t.CARRIER_ID)
                .HasMaxLength(50);

            this.Property(t => t.CUSTOM_ITEM_NO)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_1)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_2)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_3)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_4)
                .HasMaxLength(50);

            this.Property(t => t.REPORT_DATA_5)
                .HasMaxLength(50);

            this.Property(t => t.LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_RECV_DEVIATION_HEADER");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.LINE_NO).HasColumnName("LINE_NO");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.PO_ID).HasColumnName("PO_ID");
            this.Property(t => t.PO_LINE_NO).HasColumnName("PO_LINE_NO");
            this.Property(t => t.PO_SCHED_NO).HasColumnName("PO_SCHED_NO");
            this.Property(t => t.INV_ITEM_ID).HasColumnName("INV_ITEM_ID");
            this.Property(t => t.DESCRIPTION).HasColumnName("DESCRIPTION");
            this.Property(t => t.UNIT_OF_MEASURE).HasColumnName("UNIT_OF_MEASURE");
            this.Property(t => t.QTY_PO).HasColumnName("QTY_PO");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.ASN_QTY).HasColumnName("ASN_QTY");
            this.Property(t => t.RECV_UOM).HasColumnName("RECV_UOM");
            this.Property(t => t.RECV_CONVERSION_RATE).HasColumnName("RECV_CONVERSION_RATE");
            this.Property(t => t.INVENTORY_ITEM).HasColumnName("INVENTORY_ITEM");
            this.Property(t => t.DEVIATION_TYPE).HasColumnName("DEVIATION_TYPE");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.CARRIER_ID).HasColumnName("CARRIER_ID");
            this.Property(t => t.CUSTOM_ITEM_NO).HasColumnName("CUSTOM_ITEM_NO");
            this.Property(t => t.DUE_DATE).HasColumnName("DUE_DATE");
            this.Property(t => t.RECEIPT_DATE).HasColumnName("RECEIPT_DATE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.REPORT_DATA_1).HasColumnName("REPORT_DATA_1");
            this.Property(t => t.REPORT_DATA_2).HasColumnName("REPORT_DATA_2");
            this.Property(t => t.REPORT_DATA_3).HasColumnName("REPORT_DATA_3");
            this.Property(t => t.REPORT_DATA_4).HasColumnName("REPORT_DATA_4");
            this.Property(t => t.REPORT_DATA_5).HasColumnName("REPORT_DATA_5");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
        }
    }
}
