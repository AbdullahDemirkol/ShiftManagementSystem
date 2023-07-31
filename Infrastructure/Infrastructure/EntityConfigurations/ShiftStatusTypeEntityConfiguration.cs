using Domain.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityConfigurations
{

    public class ShiftStatusTypeEntityConfiguration : IEntityTypeConfiguration<ShiftStatusType>
    {
        public void Configure(EntityTypeBuilder<ShiftStatusType> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.Name).HasMaxLength(200).IsRequired(); 
        }
    }
}
