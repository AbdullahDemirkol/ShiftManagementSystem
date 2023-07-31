using Domain.Enum;
using Domain.Model;
using Infrastructure.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Context
{
    public class ShiftDbContext: DbContext
    {

        public ShiftDbContext() : base()
        { }
        private readonly DbContextOptions _options;

        public ShiftDbContext(DbContextOptions options) : base(options)
        {
            _options = options;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Server=localhost;Port=5433;Database=ShiftManagementDatabase;Search Path=public;User Id=postgres;Password=1234");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PersonelEntityConfiguration());
            modelBuilder.ApplyConfiguration(new ShiftEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TeamEntityConfiguration());
            modelBuilder.ApplyConfiguration(new ShiftTeamsEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TeamPersonelsEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TitleTypeEntityConfiguration());
            modelBuilder.ApplyConfiguration(new ShiftTypeEntityConfiguration());
            modelBuilder.ApplyConfiguration(new ShiftStatusTypeEntityConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Personel> Personels { get; set; }
        public DbSet<Shift> Shifts { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<ShiftTeamAssignment> ShiftTeams { get; set; }
        public DbSet<TeamPersonelAssignment> TeamPersonels { get; set; }
        public DbSet<TitleType> TitleTypes { get; set; }
        public DbSet<ShiftType> ShiftTypes{ get; set; }
        public DbSet<ShiftStatusType> ShiftStatusTypes{ get; set; }
        
    }
}
