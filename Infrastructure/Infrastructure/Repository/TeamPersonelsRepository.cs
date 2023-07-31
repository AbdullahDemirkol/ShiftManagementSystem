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

    public class TeamPersonelsRepository : GenericRepositoryForBaseEntity<TeamPersonelAssignment>, ITeamPersonelsRepository
    {
        public TeamPersonelsRepository(ShiftDbContext dbContext) : base(dbContext)
        {

        }
    }
}
