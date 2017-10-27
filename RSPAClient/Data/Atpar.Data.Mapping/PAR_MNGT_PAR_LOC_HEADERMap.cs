using AtPar.POCOEntities;using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Atpar.Data.Mapping
{
    public class PAR_MNGT_PAR_LOC_HEADERMap : EntityTypeConfiguration<PAR_MNGT_PAR_LOC_HEADER>
    {
        public PAR_MNGT_PAR_LOC_HEADERMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ORG_ID, t.PAR_LOC_ID });

            // Properties
            this.Property(t => t.ORG_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.PAR_LOC_ID)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.LOCATION_NAME)
                .HasMaxLength(255);

            this.Property(t => t.CART_TYPE)
                .HasMaxLength(2);

            this.Property(t => t.COST_CENTER_CODE)
                .HasMaxLength(50);

            this.Property(t => t.POU_CART)
                .HasMaxLength(1);

            this.Property(t => t.ASSET_ACCOUNT)
                .HasMaxLength(50);

            this.Property(t => t.SHIPTO_ID)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_ID)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_ADDRESS_1)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_ADDRESS_2)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_CITY)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_STATE)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_ZIP)
                .HasMaxLength(50);

            this.Property(t => t.DELV_LOC_COUNTRY)
                .HasMaxLength(50);

            this.Property(t => t.LAST_UPDATE_USER)
                .IsRequired()
                .HasMaxLength(20);

            this.Property(t => t.LAST_CLIENT_ADDRESS)
                .HasMaxLength(20);

            this.Property(t => t.PARLOC_TYPE)
                .HasMaxLength(1);

            // Table & Column Mappings
            this.ToTable("PAR_MNGT_PAR_LOC_HEADER");
            this.Property(t => t.ORG_ID).HasColumnName("ORG_ID");
            this.Property(t => t.PAR_LOC_ID).HasColumnName("PAR_LOC_ID");
            this.Property(t => t.LOCATION_NAME).HasColumnName("LOCATION_NAME");
            this.Property(t => t.CART_TYPE).HasColumnName("CART_TYPE");
            this.Property(t => t.COST_CENTER_CODE).HasColumnName("COST_CENTER_CODE");
            this.Property(t => t.STATUS).HasColumnName("STATUS");
            this.Property(t => t.POU_CART).HasColumnName("POU_CART");
            this.Property(t => t.ASSET_ACCOUNT).HasColumnName("ASSET_ACCOUNT");
            this.Property(t => t.SHIPTO_ID).HasColumnName("SHIPTO_ID");
            this.Property(t => t.DELV_LOC_ID).HasColumnName("DELV_LOC_ID");
            this.Property(t => t.DELV_LOC_ADDRESS_1).HasColumnName("DELV_LOC_ADDRESS_1");
            this.Property(t => t.DELV_LOC_ADDRESS_2).HasColumnName("DELV_LOC_ADDRESS_2");
            this.Property(t => t.DELV_LOC_CITY).HasColumnName("DELV_LOC_CITY");
            this.Property(t => t.DELV_LOC_STATE).HasColumnName("DELV_LOC_STATE");
            this.Property(t => t.DELV_LOC_ZIP).HasColumnName("DELV_LOC_ZIP");
            this.Property(t => t.DELV_LOC_COUNTRY).HasColumnName("DELV_LOC_COUNTRY");
            this.Property(t => t.LAST_UPDATE_DATE).HasColumnName("LAST_UPDATE_DATE");
            this.Property(t => t.LAST_UPDATE_USER).HasColumnName("LAST_UPDATE_USER");
            this.Property(t => t.LAST_CLIENT_ADDRESS).HasColumnName("LAST_CLIENT_ADDRESS");
            this.Property(t => t.PERPECTUAL_IN_MMIS).HasColumnName("PERPECTUAL_IN_MMIS");
            this.Property(t => t.PARLOC_TYPE).HasColumnName("PARLOC_TYPE");
        }
    }
}
