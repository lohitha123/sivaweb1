using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_EVENT_HDRMap : EntityTypeConfiguration<MT_CYCT_EVENT_HDR>
    {
        public MT_CYCT_EVENT_HDRMap()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            //ignoring columns
            this.Ignore(a => a.EVENTUSERS);
            // Properties
            this.Property(t => t.BUSINESS_UNIT)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.EVENT_ID)
                .HasMaxLength(100);

            this.Property(t => t.USER_ID)
                .HasMaxLength(20);

            this.Property(t => t.TRANSACTION_ID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PARENT_EVENT_ID)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_EVENT_HDR");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.USER_ID).HasColumnName("USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.COMPLETED_DATE).HasColumnName("COMPLETED_DATE");
            this.Property(t => t.PARENT_EVENT_ID).HasColumnName("PARENT_EVENT_ID");
            this.Property(t => t.EVENT_STATUS).HasColumnName("EVENT_STATUS");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.SEND_DATE_TIME).HasColumnName("SEND_DATE_TIME");
            this.Property(t => t.EVENT_TYPE).HasColumnName("EVENT_TYPE");
        }
    }
}
