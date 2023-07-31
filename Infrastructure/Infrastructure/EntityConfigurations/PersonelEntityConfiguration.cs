using Domain.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Model;

namespace Infrastructure.EntityConfigurations
{

    public class PersonelEntityConfiguration : IEntityTypeConfiguration<Personel>
    {
        public void Configure(EntityTypeBuilder<Personel> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.FirstName).HasMaxLength(200).IsRequired();
            builder.Property(ct => ct.LastName).HasMaxLength(200).IsRequired();
            builder.Property(ct => ct.UserName).HasMaxLength(200).IsRequired();
            builder.Property(ct => ct.Phone).IsRequired();
            builder.Property(ct => ct.Address).IsRequired();
            builder.Property(ct => ct.IsActive).IsRequired();
            builder.HasOne(o => o.Title).WithMany().HasForeignKey("TitleId");
            //builder.Property(ct => ct.Title).IsRequired();
        }
    }
}
