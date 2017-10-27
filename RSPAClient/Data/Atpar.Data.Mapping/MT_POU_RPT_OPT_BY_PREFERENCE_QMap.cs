using AtPar.POCOEntities;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;


namespace Atpar.Data.Mapping
{
    public class MT_POU_RPT_OPT_BY_PREFERENCE_QMap : EntityTypeConfiguration<MT_POU_RPT_OPT_BY_PREFERENCE_Q>
    {
        public MT_POU_RPT_OPT_BY_PREFERENCE_QMap()
        {
            // Primary Key
            this.HasKey(t => new { t.SPECIALTY_CODE, t.PROCEDURE_CODE, t.PREF_LIST_ID, t.PHYSICIAN_ID, t.ITEM_ID, t.PERIOD, t.YEAR });

            // Properties
            this.Property(t => t.SPECIALTY_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PROCEDURE_CODE)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.PREF_LIST_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PHYSICIAN_ID)
                .IsRequired()
                .HasMaxLength(30);

            this.Property(t => t.ITEM_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ITEM_DESCRIPTION)
                .HasMaxLength(255);

            this.Property(t => t.PERIOD)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.YEAR)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_RPT_OPT_BY_PREFERENCE_Q", "ATPAR_MT_AJAYWEB");
            this.Property(t => t.SPECIALTY_CODE).HasColumnName("SPECIALTY_CODE");
            this.Property(t => t.PROCEDURE_CODE).HasColumnName("PROCEDURE_CODE");
            this.Property(t => t.PREF_LIST_ID).HasColumnName("PREF_LIST_ID");
            this.Property(t => t.PHYSICIAN_ID).HasColumnName("PHYSICIAN_ID");
            this.Property(t => t.ITEM_ID).HasColumnName("ITEM_ID");
            this.Property(t => t.ITEM_DESCRIPTION).HasColumnName("ITEM_DESCRIPTION");
            this.Property(t => t.ITEM_PRICE).HasColumnName("ITEM_PRICE");
            this.Property(t => t.CURRENT_OPEN_QTY).HasColumnName("CURRENT_OPEN_QTY");
            this.Property(t => t.CURRENT_HOLD_QTY).HasColumnName("CURRENT_HOLD_QTY");
            this.Property(t => t.MAX_USAGE).HasColumnName("MAX_USAGE");
            this.Property(t => t.MIN_USAGE).HasColumnName("MIN_USAGE");
            this.Property(t => t.MEAN_USAGE).HasColumnName("MEAN_USAGE");
            this.Property(t => t.USAGE_PER).HasColumnName("USAGE_PER");
            this.Property(t => t.SUGGESTED_OPEN_QTY).HasColumnName("SUGGESTED_OPEN_QTY");
            this.Property(t => t.SUGGESTED_HOLD_QTY).HasColumnName("SUGGESTED_HOLD_QTY");
            this.Property(t => t.NET_CHANGE_OPEN_QTY).HasColumnName("NET_CHANGE_OPEN_QTY");
            this.Property(t => t.NET_CHANGE_HOLD_QTY).HasColumnName("NET_CHANGE_HOLD_QTY");
            this.Property(t => t.NET_CHANGE_OPEN_VALUE).HasColumnName("NET_CHANGE_OPEN_VALUE");
            this.Property(t => t.NET_CHANGE_HOLD_VALUE).HasColumnName("NET_CHANGE_HOLD_VALUE");
            this.Property(t => t.ITEM_TYPE).HasColumnName("ITEM_TYPE");
            this.Property(t => t.PERIOD).HasColumnName("PERIOD");
            this.Property(t => t.YEAR).HasColumnName("YEAR");
        }
    }
}
