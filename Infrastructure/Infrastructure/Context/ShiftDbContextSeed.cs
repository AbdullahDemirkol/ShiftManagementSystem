using Domain.Enum;
using Domain.Model;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Context
{
    public class ShiftDbContextSeed
    {

        public static async Task SeedAsync(ShiftDbContext context)
        {
            if (!context.ShiftStatusTypes.Any())
            {
                context.ShiftStatusTypes.AddRange(GetDefaultShiftStatusTypes());
                await context.SaveChangesAsync();
            }
            if (!context.ShiftTypes.Any())
            {
                context.ShiftTypes.AddRange(GetDefaultShiftTypes());
                await context.SaveChangesAsync();
            }
            if (!context.TitleTypes.Any())
            {
                context.TitleTypes.AddRange(GetDefaultTitleTypes());
                await context.SaveChangesAsync();
            }
            if (!context.Personels.Any())
            {
                IEnumerable<Personel> personels = GetDefaultPersonels();
                context.Personels.AddRange(personels);
                await context.SaveChangesAsync();
                if (!context.Teams.Any())
                {
                    IEnumerable<Team> teams = GetDefaultTeams(personels);
                    context.Teams.AddRange(teams);
                    await context.SaveChangesAsync();
                    if (!context.TeamPersonels.Any())
                    {
                        IEnumerable<TeamPersonelAssignment> teamPlayers = GetDefaultTeamPersonels(personels, teams);
                        context.TeamPersonels.AddRange(teamPlayers);
                        await context.SaveChangesAsync();
                    }
                    if (!context.Shifts.Any())
                    {
                        IEnumerable<Shift> shifts = GetDefaultShifts();
                        context.Shifts.AddRange(shifts);
                        await context.SaveChangesAsync();

                        if (!context.ShiftTeams.Any())
                        {
                            IEnumerable<ShiftTeamAssignment> shiftTeams = GetDefaultShiftTeams(shifts,teams);
                            context.ShiftTeams.AddRange(shiftTeams);
                            await context.SaveChangesAsync();
                        }
                    }
                }
            }

        }

        private static IEnumerable<ShiftStatusType> GetDefaultShiftStatusTypes()
        {
            IEnumerable<ShiftStatusType> shiftStatusTypes = ShiftStatusType.List();
            return shiftStatusTypes;
        }
        private static IEnumerable<ShiftType> GetDefaultShiftTypes()
        {
            IEnumerable<ShiftType> shiftTypes = ShiftType.List();
            return shiftTypes;
        }
        private static IEnumerable<TitleType> GetDefaultTitleTypes()
        {
            IEnumerable<TitleType> titleType = TitleType.List();
            return titleType;
        }
        private static IEnumerable<Personel> GetDefaultPersonels()
        {
            string[] FirstNames = {
                "John", "Emma", "Michael", "Olivia", "William", "Ava", "James", "Isabella", "Benjamin", "Sophia",
                "Mason", "Mia", "Elijah", "Charlotte", "Oliver", "Amelia", "Jacob", "Harper", "Lucas", "Evelyn",
                "Alexander", "Abigail", "Daniel", "Emily", "Matthew", "Elizabeth", "Henry", "Sofia", "David", "Ella",
                "Liam", "Lily", "Noah", "Grace", "Ethan", "Chloe", "Daniel", "Sophie", "Aiden", "Scarlett",
                "Daniel", "Liam", "Emily", "Chloe", "Emma", "Sophia", "Ava", "Isabella", "Grace", "Olivia",
                "Lucas", "Noah", "Mason", "Ethan", "Alexander", "Daniel", "Oliver", "Liam", "Jacob", "Michael"
            };
            string[] LastNames = {
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Clark",
                "Harris", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott",
                "Nguyen", "Adams", "Morris", "Baker", "Rivera", "Mitchell", "Carter", "Perez", "Roberts", "Turner",
                "Murphy", "Hernandez", "Lopez", "Garcia", "Martinez", "Liu", "Wang", "Chen", "Li", "Kim",
                "Davis", "Martinez", "Lopez", "Lee", "Miller", "Brown", "Smith", "Johnson", "Wilson", "Turner",
                "Harris", "Clark", "Mitchell", "Roberts", "Nguyen", "Wang", "Scott", "Kim", "Hall", "Adams"
            };

            List<Personel> personels = new List<Personel>();
            Random random = new Random();



            for (int i = 0; i < 30; i++)
            {
                string firstName = FirstNames[random.Next(FirstNames.Length)];
                string lastName = LastNames[random.Next(LastNames.Length)];

                Personel personel = new Personel
                {
                    Id = Guid.NewGuid(),
                    FirstName = firstName,
                    LastName = lastName,
                    UserName = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}",
                    Email = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}@example.com",
                    Phone = "+1-555-555-5555",
                    Address = $"{i + 1} Main Street, City",
                    Title = TitleType.Employee,
                    IsActive = true
                };

                personels.Add(personel);
            }

            for (int i = 30; i < 35; i++)
            {
                string firstName = FirstNames[random.Next(FirstNames.Length)];
                string lastName = LastNames[random.Next(LastNames.Length)];

                Personel personel = new Personel
                {
                    Id = Guid.NewGuid(),
                    FirstName = firstName,
                    LastName = lastName,
                    UserName = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}",
                    Email = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}@example.com",
                    Phone = "+1-555-555-5555",
                    Address = $"{i + 1} Main Street, City",
                    Title = TitleType.TeamLeader,
                    IsActive = true
                };

                personels.Add(personel);
            }

            for (int i = 35; i < 40; i++)
            {
                string firstName = FirstNames[random.Next(FirstNames.Length)];
                string lastName = LastNames[random.Next(LastNames.Length)];

                Personel personel = new Personel
                {
                    Id = Guid.NewGuid(),
                    FirstName = firstName,
                    LastName = lastName,
                    UserName = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}",
                    Email = $"{firstName.ToLower()}.{lastName.ToLower()}{i + 1}@example.com",
                    Phone = "+1-555-555-5555",
                    Address = $"{i + 1} Main Street, City",
                    Title = TitleType.AuthorizedEmployee,
                    IsActive = true
                };

                personels.Add(personel);
            }

            return personels;
        }
        private static IEnumerable<Team> GetDefaultTeams(IEnumerable<Personel> personelList)
        {
            List<Personel> teamLeaders = personelList.Where(p => p.Title.Id == 2).ToList();
            List<Team> teams = new List<Team>();
            Random random = new Random();
            for (int i = 0; i < 5; i++)
            {
                var teamLeader=teamLeaders[random.Next(teamLeaders.Count)];
                teamLeaders.Remove(teamLeader);
                Team team = new Team
                {
                    TeamName = "Team "+i,
                    TeamLeader = teamLeader
                };
                teams.Add(team);
            }
            return teams;
        }
        private static IEnumerable<TeamPersonelAssignment> GetDefaultTeamPersonels(IEnumerable<Personel> personelList, IEnumerable<Team> teamList)
        {
            List<Personel> personels = personelList.Where(p => p.Title.Id == 3).ToList();
            List<TeamPersonelAssignment> teamPersonels = new List<TeamPersonelAssignment>();
            Random random = new Random();
            foreach (var team in teamList)
            {
                for (int i = 0; i < 5; i++)
                {
                    var personel = personels[random.Next(personels.Count)];
                    var teamPersonel = new TeamPersonelAssignment
                    {
                        PersonelId = personel.Id,
                        TeamId = team.Id
                    };
                    personels.Remove(personel);
                    teamPersonels.Add(teamPersonel);

                }
                
            }

            return teamPersonels;
        }
        private static IEnumerable<Shift> GetDefaultShifts()
        {
            List<Shift> shifts = new List<Shift>();
            DateTime now = DateTime.Now;

            Shift shift = new Shift
            {
                StartTime = new DateTime(now.Year, now.Month, now.Day, 0, 0, 0, DateTimeKind.Utc),
                EndTime = new DateTime(now.Year, now.Month, now.Day, 7, 59, 59, DateTimeKind.Utc),
                ShiftStatus = ShiftStatusType.Completed,
                ShiftType = ShiftType.NightShift
            };
            shifts.Add(shift);
            shift = new Shift
            {
                StartTime = new DateTime(now.Year, now.Month, now.Day, 8, 0, 0, DateTimeKind.Utc),
                EndTime = new DateTime(now.Year, now.Month, now.Day, 15, 59, 59, DateTimeKind.Utc),
                ShiftStatus = ShiftStatusType.ToDo,
                ShiftType = ShiftType.MorningShift
            };
            shifts.Add(shift);
            shift = new Shift
            {
                StartTime = new DateTime(now.Year, now.Month, now.Day, 16, 0, 0, DateTimeKind.Utc),
                EndTime = new DateTime(now.Year, now.Month, now.Day, 23, 59, 59, DateTimeKind.Utc),
                ShiftStatus = ShiftStatusType.ToDo,
                ShiftType = ShiftType.EveningShift
            };
            shifts.Add(shift);

            return shifts;
        }
        private static IEnumerable<ShiftTeamAssignment> GetDefaultShiftTeams(IEnumerable<Shift> shiftList, IEnumerable<Team> teamList)
        {
            List<ShiftTeamAssignment> shiftTeams = new List<ShiftTeamAssignment>();
            Random random = new Random();
            List<Team> teams = teamList.ToList();
            
            foreach (var shift in shiftList)
            {
                var team = teams[random.Next(teams.Count)];
                ShiftTeamAssignment shiftTeam = new ShiftTeamAssignment
                {
                    ShiftId = shift.Id,
                    TeamId = team.Id
                };
                teams.Remove(team);
                shiftTeams.Add(shiftTeam);
            }
            return shiftTeams;
        }


    }
}
