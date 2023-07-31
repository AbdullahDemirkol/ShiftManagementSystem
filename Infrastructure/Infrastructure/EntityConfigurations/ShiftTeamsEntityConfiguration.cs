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
    public class ShiftTeamsEntityConfiguration : IEntityTypeConfiguration<ShiftTeamAssignment>
    {
        public void Configure(EntityTypeBuilder<ShiftTeamAssignment> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.ShiftId).IsRequired();
            builder.Property(ct => ct.TeamId).IsRequired();
        }
    }
}
