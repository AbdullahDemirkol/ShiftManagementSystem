﻿using Application.Repository;
using Domain.Enum;
using Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{

    public class ShiftTypeRepository : GenericRepositoryForBaseEnum<ShiftType>, IShiftTypeRepository
    {
        public ShiftTypeRepository(ShiftDbContext dbContext) : base(dbContext)
        {

        }
    }
}
