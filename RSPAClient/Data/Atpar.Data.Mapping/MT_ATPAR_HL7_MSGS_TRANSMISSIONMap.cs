using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class MT_ATPAR_HL7_MSGS_TRANSMISSIONMap : EntityTypeConfiguration<MT_ATPAR_HL7_MSGS_TRANSMISSION>
    {
        public MT_ATPAR_HL7_MSGS_TRANSMISSIONMap()
        {
            // Primary Key
            this.HasKey(t => t.ID);

            // Properties
            this.Property(t => t.KEY_1)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_2)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_3)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_4)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.KEY_5)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.HL7_MSG_TYPE)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.TRANSMISSION_STATUS)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(1);

            this.Property(t => t.UPDATE_USER_ID)
                .HasMaxLength(20);

            // Table & Column Mappings
            this.ToTable("MT_ATPAR_HL7_MSGS_TRANSMISSION");
            this.Property(t => t.ID).HasColumnName("ID");
            this.Property(t => t.TRANSACTION_ID).HasColumnName("TRANSACTION_ID");
            this.Property(t => t.APP_ID).HasColumnName("APP_ID");
            this.Property(t => t.KEY_1).HasColumnName("KEY_1");
            this.Property(t => t.KEY_2).HasColumnName("KEY_2");
            this.Property(t => t.KEY_3).HasColumnName("KEY_3");
            this.Property(t => t.KEY_4).HasColumnName("KEY_4");
            this.Property(t => t.KEY_5).HasColumnName("KEY_5");
            this.Property(t => t.HL7_MSG_TYPE).HasColumnName("HL7_MSG_TYPE");
            this.Property(t => t.TRANSMISSION_STATUS).HasColumnName("TRANSMISSION_STATUS");
            this.Property(t => t.HL7_MESSAGE).HasColumnName("HL7_MESSAGE");
            this.Property(t => t.HL7_ERROR_MESSAGE).HasColumnName("HL7_ERROR_MESSAGE");
            this.Property(t => t.UPDATE_DATE).HasColumnName("UPDATE_DATE");
            this.Property(t => t.UPDATE_USER_ID).HasColumnName("UPDATE_USER_ID");
        }
    }
}
