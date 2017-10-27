using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_ORDER_HEADERMap : EntityTypeConfiguration<PAR_MNGT_ORDER_HEADER>
    {
        public PAR_MNGT_ORDER_HEADERMap()
        {
            //ignore
            this.Ignore(t => t.VENDOR_NAME);
            // Primary Key
            this.HasKey(t => t.ORDER_NO);

            // Properties
            this.Property(t => t.ORDER_NO)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORG_ID)
                .HasMaxLength(10);

            this.Property(t => t.PAR_LOC_ID)
                .HasMaxLength(50);

            this.Property(t => t.CREATE_USER)
                .HasMaxLength(50);

            this.Property(t => t.VENDOR_ID)
                .HasMaxLength(20);

            this.Property(t => t.ERP_ORDER_NO)
                .HasMaxLength(30);

            this.Property(t => t.COMMENTS)
                .HasMaxLength(4000);

            this.Property(t => t.INVENTORYORDER_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.MRN)
                .HasMaxLength(50);

            this.Property(t => t.MEDICINE)
                .HasMaxLength(50);

            this.Property(t => t.DOSAGE)
                .HasMaxLength(50);

            this.Property(t => t.DELIVERY_LOCATION)
                .HasMaxLength(50);

            this.Property(t => t.ORDERED_UOM)
                .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_ORDER_HEADER");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PAR_LOC_ID).HasColumnName("PAR_LOC_ID");
            this.Property(t => t.ORDER_DATE).HasColumnName("ORDER_DATE");
            this.Property(t => t.CREATE_USER).HasColumnName("CREATE_USER");
            this.Property(t => t.VENDOR_ID).HasColumnName("VENDOR_ID");
            this.Property(t => t.ERP_ORDER_NO).HasColumnName("ERP_ORDER_NO");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.COMMENTS).HasColumnName("COMMENTS");
            this.Property(t => t.INVENTORYORDER_FLAG).HasColumnName("INVENTORYORDER_FLAG");
            this.Property(t => t.MRN).HasColumnName("MRN");
            this.Property(t => t.DUE_DATE).HasColumnName("DUE_DATE");
            this.Property(t => t.MEDICINE).HasColumnName("MEDICINE");
            this.Property(t => t.DOSAGE).HasColumnName("DOSAGE");
            this.Property(t => t.QTY).HasColumnName("QTY");
            this.Property(t => t.DELIVERY_LOCATION).HasColumnName("DELIVERY_LOCATION");
            this.Property(t => t.ORDERED_UOM).HasColumnName("ORDERED_UOM");
        }
    }
}
