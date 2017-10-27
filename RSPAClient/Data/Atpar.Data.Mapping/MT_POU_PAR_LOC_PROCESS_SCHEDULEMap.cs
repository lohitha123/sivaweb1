using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_POU_PAR_LOC_PROCESS_SCHEDULEMap : EntityTypeConfiguration<MT_POU_PAR_LOC_PROCESS_SCHEDULE>
    {
        public MT_POU_PAR_LOC_PROCESS_SCHEDULEMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.ID, t.PROCESS_TYPE });

            //Ignore properties
            this.Ignore(t => t.CHK_VALUE);
            this.Ignore(t => t.DESCRIPTION);
            this.Ignore(t => t.ROW_INDEX);
            this.Ignore(t => t.SOURCELOCATIONS);
            this.Ignore(t => t.DEPT_NAME);
            this.Ignore(t => t.LOW_STK_SCHEDULE_ID);
            this.Ignore(t => t.EXP_SCHEDULE_ID);
            this.Ignore(t => t.RECALL_SCHEDULE_ID);
            this.Ignore(t => t.BILLONLY_SCHEDULE_ID);
            this.Ignore(t => t.REPLENISH_FROM);
            //this.Ignore(t => t.M_BUSINESS_UNIT);
            //this.Ignore(t => t.M_LOCATION);
            //this.Ignore(t => t.LOCATION);
            //this.Ignore(t => t.BUSINESS_UNIT);
            //this.Ignore(t => t.PERFORM_ACTION); 
            this.Ignore(t => t.INV_INTERFACE_ENABLE);
            this.Ignore(t => t.BILLING_ENABLE);


            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.SCHEDULE_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.REVIEW_CHARGES)
                .HasMaxLength(1);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.PROCESS_TYPE)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            // Table & Column Mappings
            this.ToTable("MT_POU_PAR_LOC_PROCESS_SCHEDULE");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.SCHEDULE_ID).HasColumnName("SCHEDULE_ID");
            this.Property(t => t.REVIEW_CHARGES).HasColumnName("REVIEW_CHARGES");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.BILLING_OPTION).HasColumnName("BILLING_OPTION");
            this.Property(t => t.PROCESS_TYPE).HasColumnName("PROCESS_TYPE");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
        }
    }
}
