using Application.Repository;
using Domain.Model;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{

    public class TeamRepository : GenericRepositoryForBaseEntity<Team>, ITeamRepository
    {
        public TeamRepository(ShiftDbContext dbContext) : base(dbContext)
        {

        }
    }
}
