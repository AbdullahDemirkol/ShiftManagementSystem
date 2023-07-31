using Domain.Model;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.EntityConfigurations
{
    public class ShiftEntityConfiguration : IEntityTypeConfiguration<Shift>
    {
        public void Configure(EntityTypeBuilder<Shift> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.StartTime).IsRequired();
            builder.Property(ct => ct.EndTime).IsRequired();
            builder.HasOne(o => o.ShiftStatus).WithMany().HasForeignKey("ShiftStatusId");
            builder.HasOne(o => o.ShiftType).WithMany().HasForeignKey("ShiftTypeId");
        }
    }
    
}
