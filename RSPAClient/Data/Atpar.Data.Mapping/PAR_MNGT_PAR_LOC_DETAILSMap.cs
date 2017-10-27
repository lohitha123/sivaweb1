using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_PAR_LOC_DETAILSMap : EntityTypeConfiguration<PAR_MNGT_PAR_LOC_DETAILS>
    {
        public PAR_MNGT_PAR_LOC_DETAILSMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.PAR_LOC_ID, t.BIN_LOC, t.ITEM_ID });

            this.Ignore(t => t.PREV_BIN_LOC);
            this.Ignore(t => t.RECORDTYPE);
            this.Ignore(t => t.PREV_OPTIMAL_QTY);
            this.Ignore(t => t.PREV_ITM_ID);


            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PAR_LOC_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BIN_LOC)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.STATUS)
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.COUNT_REQUIRED)
                .HasMaxLength(1);

            this.Property(t => t.FILL_KILL_FLAG)
                .HasMaxLength(1);

            this.Property(t => t.LOT_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.SERIAL_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.ORDERING_TYPE)
                .HasMaxLength(2);

            this.Property(t => t.CHARGE_CODE)
                .HasMaxLength(50);

            this.Property(t => t.COST_CENTER)
                .HasMaxLength(50);

            this.Property(t => t.UNIT_OF_ISSUE)
                .HasMaxLength(5);

            this.Property(t => t.USER_FIELD_1)
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.INV_BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.REQUISITION_TYPE)
                .IsRequired()
                .HasMaxLength(1);

            this.Property(t => t.UNIT_OF_PROCUREMENT)
                .HasMaxLength(5);

            this.Property(t => t.USER_FIELD_2)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PAR_UOM)
               .HasMaxLength(5);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_PAR_LOC_DETAILS");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PAR_LOC_ID).HasColumnName("PAR_LOC_ID");
            this.Property(t => t.BIN_LOC).HasColumnName("BIN_LOC");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.COUNT_ORDER).HasColumnName("COUNT_ORDER");
            this.Property(t => t.OPTIMAL_QTY).HasColumnName("OPTIMAL_QTY");
            this.Property(t => t.COUNT_REQUIRED).HasColumnName("COUNT_REQUIRED");
            this.Property(t => t.REPLENISHMENT_TYPE).HasColumnName("REPLENISHMENT_TYPE");
            this.Property(t => t.FILL_KILL_FLAG).HasColumnName("FILL_KILL_FLAG");
            this.Property(t => t.LOT_CONTROLLED).HasColumnName("LOT_CONTROLLED");
            this.Property(t => t.SERIAL_CONTROLLED).HasColumnName("SERIAL_CONTROLLED");
            this.Property(t => t.MAX_QTY).HasColumnName("MAX_QTY");
            this.Property(t => t.FOQ_QTY).HasColumnName("FOQ_QTY");
            this.Property(t => t.ORDERING_TYPE).HasColumnName("ORDERING_TYPE");
            this.Property(t => t.CHARGE_CODE).HasColumnName("CHARGE_CODE");
            this.Property(t => t.COST_CENTER).HasColumnName("COST_CENTER");
            this.Property(t => t.UNIT_OF_ISSUE).HasColumnName("UNIT_OF_ISSUE");
            this.Property(t => t.CONVERSION_RATE).HasColumnName("CONVERSION_RATE");
            this.Property(t => t.USER_FIELD_1).HasColumnName("USER_FIELD_1");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.INV_BUSINESS_UNIT).HasColumnName("INV_BUSINESS_UNIT");
            this.Property(t => t.REQUISITION_TYPE).HasColumnName("REQUISITION_TYPE");
            this.Property(t => t.UNIT_OF_PROCUREMENT).HasColumnName("UNIT_OF_PROCUREMENT");
            this.Property(t => t.USER_FIELD_2).HasColumnName("USER_FIELD_2");
            this.Property(t => t.PAR_UOM).HasColumnName("PAR_UOM");
            this.Property(t => t.CONV_RATE_PAR_UOM).HasColumnName("CONV_RATE_PAR_UOM");
        }
    }
}
