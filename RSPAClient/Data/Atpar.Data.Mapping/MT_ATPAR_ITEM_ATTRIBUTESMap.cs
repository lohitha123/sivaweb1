using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AtPar.POCOEntities;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_ITEM_ATTRIBUTESMap : EntityTypeConfiguration<MT_ATPAR_ITEM_ATTRIBUTES>
    {
        public MT_ATPAR_ITEM_ATTRIBUTESMap()
        {
            // Primary Key
            this.HasKey(t => new
            {
                t.ITEM_ID,
                t.BUSINESS_UNIT,
                t.CART_ID,
                t.ORG_GROUP_ID
            });

            // Properties
            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CART_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ORG_GROUP_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOT_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.SERIAL_CONTROLLED)
                .HasMaxLength(1);

            this.Property(t => t.ISSUE_UOM)
                .HasMaxLength(50);

            this.Property(t => t.CONVERSION_FACTOR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LAST_UPDATE_DATE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.LAST_UPDATE_USERID)
                .HasMaxLength(10);

            this.Property(t => t.PAR_UOM)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.CONV_RATE_PAR_TO_ISSUE_CF)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_ITEM_ATTRIBUTES");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.CART_ID).HasColumnName("CART_ID");
            this.Property(t => t.ORG_GROUP_ID).HasColumnName("ORG_GROUP_ID");
            this.Property(t => t.LOT_CONTROLLED).HasColumnName("LOT_CONTROLLED");
            this.Property(t => t.SERIAL_CONTROLLED).HasColumnName("SERIAL_CONTROLLED");
            this.Property(t => t.ISSUE_UOM).HasColumnName("ISSUE_UOM");
            this.Property(t => t.CONVERSION_FACTOR).HasColumnName("CONVERSION_FACTOR");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("LAST_UPDATE_USERID");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("PAR_UOM");
            this.Property(t => t.LAST_UPDATE_USERID).HasColumnName("CONV_RATE_PAR_TO_ISSUE_CF");
        }
    }
}
