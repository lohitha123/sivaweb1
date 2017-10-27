using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_SUPPLY_COMPARISON_HMap : EntityTypeConfiguration<MT_POU_RPT_SUPPLY_COMPARISON_H>
    {
        public MT_POU_RPT_SUPPLY_COMPARISON_HMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.DIAGNOSIS_CODE, t.DIAGNOSIS_CODE_TYPE, t.PHYSICIAN_ID, t.ITEM_GROUP, t.ITEM_ID, t.PERIOD, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);
                       
            this.Property(t => t.DIAGNOSIS_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.DIAGNOSIS_DESCRIPTION)
                .IsRequired()
                .HasMaxLength(254);

            this.Property(t => t.DIAGNOSIS_CODE_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
                    
            this.Property(t => t.PHYSICIAN_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.PHYSICIAN_NAME)
                .IsRequired()
                .HasMaxLength(120);

            this.Property(t => t.ITEM_GROUP)
                .IsRequired()
                .HasMaxLength(255);

            this.Property(t => t.ITEM_GROUP_DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.MFR_CATALOG_NO)
                .HasMaxLength(50);

            this.Property(t => t.PERIOD)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.YEAR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_RPT_SUPPLY_COMPARISON_H", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");           
            this.Property(t => t.DIAGNOSIS_CODE).HasColumnName("DIAGNOSIS_CODE");
            this.Property(t => t.DIAGNOSIS_DESCRIPTION).HasColumnName("DIAGNOSIS_DESCRIPTION");
            this.Property(t => t.DIAGNOSIS_CODE_TYPE).HasColumnName("DIAGNOSIS_CODE_TYPE");            
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.PHYSICIAN_NAME).HasColumnName("PHYSICIAN_NAME");
            this.Property(t => t.ITEM_GROUP).HasColumnName("ITEM_GROUP");
            this.Property(t => t.ITEM_GROUP_DESCRIPTION).HasColumnName("ITEM_GROUP_DESCRIPTION");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCRIPTION).HasColumnName("ITEM_DESCRIPTION");
            this.Property(t => t.MFR_CATALOG_NO).HasColumnName("MFR_CATALOG_NO");
            this.Property(t => t.UNIT_COST).HasColumnName("UNIT_COST");
            this.Property(t => t.NO_OF_TIMES_ITEM_USED_BY_PHY).HasColumnName("NO_OF_TIMES_ITEM_USED_BY_PHY");
            this.Property(t => t.PERIOD).HasColumnName("PERIOD");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
