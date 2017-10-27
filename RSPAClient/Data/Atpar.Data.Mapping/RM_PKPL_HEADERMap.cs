using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class RM_PKPL_HEADERMap : EntityTypeConfiguration<RM_PKPL_HEADER>
    {
        public RM_PKPL_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.BUSINESS_UNIT, t.INV_BUSINESS_UNIT, t.PICK_BATCH_ID, t.ORDER_NO, t.LOCATION });

            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.INV_BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PICK_BATCH_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.ORDER_NO)
                .IsRequired()
                .HasMaxLength(10);

            this.Property(t => t.SHIP_TO_CUST_ID)
                .HasMaxLength(15);

            this.Property(t => t.SHIP_CUST_NAME)
                .HasMaxLength(40);

            this.Property(t => t.SHIPMENT_NBR)
                .HasMaxLength(10);

            this.Property(t => t.LOCATION)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.DEMAND_SOURCE)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SOURCE_BUNIT)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("RM_PKPL_HEADER");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.INV_BUSINESS_UNIT).HasColumnName("INV_BUSINESS_UNIT");
            this.Property(t => t.PICK_BATCH_ID).HasColumnName("PICK_BATCH_ID");
            this.Property(t => t.ORDER_NO).HasColumnName("ORDER_NO");
            this.Property(t => t.SHIP_TO_CUST_ID).HasColumnName("SHIP_TO_CUST_ID");
            this.Property(t => t.SHIP_CUST_NAME).HasColumnName("SHIP_CUST_NAME");
            this.Property(t => t.SHIPMENT_NBR).HasColumnName("SHIPMENT_NBR");
            this.Property(t => t.LOCATION).HasColumnName("LOCATION");
            this.Property(t => t.DEMAND_SOURCE).HasColumnName("DEMAND_SOURCE");
            this.Property(t => t.SOURCE_BUNIT).HasColumnName("SOURCE_BUNIT");
        }
    }
}
