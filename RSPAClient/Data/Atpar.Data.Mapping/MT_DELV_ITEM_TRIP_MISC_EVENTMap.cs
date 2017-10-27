using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_DELV_ITEM_TRIP_MISC_EVENTMap : EntityTypeConfiguration<MT_DELV_ITEM_TRIP_MISC_EVENT>
    {
        public MT_DELV_ITEM_TRIP_MISC_EVENTMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TRANSACTION_ID, t.EVENT_ID, t.UPDATE_DATE });

            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.EVENT_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TO_USER_OR_LOCGRP)
                .HasMaxLength(20);

            this.Property(t => t.USER_ID)
                .IsRequired()
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_DELV_ITEM_TRIP_MISC_EVENT");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.TO_USER_OR_LOCGRP).HasColumnName("TO_USER_OR_LOCGRP");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
        }
    }
}
