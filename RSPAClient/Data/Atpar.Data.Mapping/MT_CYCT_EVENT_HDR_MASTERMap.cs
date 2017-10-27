using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_CYCT_EVENT_HDR_MASTERMap : EntityTypeConfiguration<MT_CYCT_EVENT_HDR_MASTER>
    {
        public MT_CYCT_EVENT_HDR_MASTERMap()
        {
            // Primary Key
            this.HasKey(t => t.TRANSACTION_ID);

            //Ignore property
            this.Ignore(t => t.COUNT_HDR_STATUS);
            this.Ignore(t => t.ISSPLITTED);
            this.Ignore(t => t.NO_OF_SUBEVENTS);
            this.Ignore(t => t.USER_ID);
            // Properties
            this.Property(t => t.TRANSACTION_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.BUSINESS_UNIT)
                .HasMaxLength(50);

            this.Property(t => t.EVENT_ID)
                .HasMaxLength(100);

            this.Property(t => t.PARENT_EVENT_ID)
                .HasMaxLength(100);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(50);

            this.Property(t => t.FROM)
                .HasMaxLength(50);

            this.Property(t => t.TO)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("MT_CYCT_EVENT_HDR_MASTER");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.BUSINESS_UNIT).HasColumnName("BUSINESS_UNIT");
            this.Property(t => t.EVENT_ID).HasColumnName("EVENT_ID");
            this.Property(t => t.PARENT_EVENT_ID).HasColumnName("PARENT_EVENT_ID");
            this.Property(t => t.NO_OF_ITEMS).HasColumnName("NO_OF_ITEMS");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.SORT_BY_FIELD).HasColumnName("SORT_BY_FIELD");
            this.Property(t => t.FROM).HasColumnName("FROM");
            this.Property(t => t.TO).HasColumnName("TO");
        }
    }
}
