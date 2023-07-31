using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Infrastructure.Context
{
    public static class ShiftDbContextMigrationManager
    {
        public static void MigrationAsync(ShiftDbContext context)
        {
            try
            { 
                using (context)
                {
                    context.Database.EnsureCreated();
                    context.Database.Migrate();
                    ShiftDbContextSeed.SeedAsync(context).Wait();

                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
