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

    public class ShiftRepository : GenericRepositoryForBaseEntity<Shift>, IShiftRepository
    {
        public ShiftRepository(ShiftDbContext dbContext) : base(dbContext)
        {

        }
    }
}
