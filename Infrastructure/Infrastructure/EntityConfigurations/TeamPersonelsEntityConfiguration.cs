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

    public class TeamPersonelsEntityConfiguration : IEntityTypeConfiguration<TeamPersonelAssignment>
    {
        public void Configure(EntityTypeBuilder<TeamPersonelAssignment> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();

        }
    }
}
