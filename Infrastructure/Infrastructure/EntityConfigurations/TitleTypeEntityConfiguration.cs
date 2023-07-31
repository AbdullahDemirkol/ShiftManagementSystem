using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Domain.Enum;

namespace Infrastructure.EntityConfigurations
{

    public class TitleTypeEntityConfiguration : IEntityTypeConfiguration<TitleType>
    {
        public void Configure(EntityTypeBuilder<TitleType> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.Name).HasMaxLength(200).IsRequired();
        }
    }
}
