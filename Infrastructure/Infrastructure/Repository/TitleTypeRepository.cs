using Application.Repository;
using Domain.Enum;
using Domain.Model;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{

    public class TitleTypeRepository : GenericRepositoryForBaseEnum<TitleType>, ITitleTypeRepository
    {
        public TitleTypeRepository(ShiftDbContext dbContext) : base(dbContext)
        {

        }
    }
}
