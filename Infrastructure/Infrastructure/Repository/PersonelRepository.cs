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
    public class PersonelRepository:GenericRepositoryForBaseEntity<Personel>, IPersonelRepository
    {

        private readonly ShiftDbContext _dbContext;

        public PersonelRepository(ShiftDbContext dbContext):base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
