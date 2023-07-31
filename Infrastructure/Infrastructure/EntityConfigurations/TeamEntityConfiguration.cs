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

    public class TeamEntityConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.HasKey(ct => ct.Id);
            builder.Property(ct => ct.Id).ValueGeneratedOnAdd().IsRequired();
            builder.Property(ct => ct.TeamName).HasMaxLength(200).IsRequired();
            builder.HasOne(ct => ct.TeamLeader).WithMany().HasForeignKey("TeamLeaderId");
        }
    }
}
