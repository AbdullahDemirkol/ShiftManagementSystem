using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class TeamPersonelAssignment: BaseEntity
    {
        public Guid TeamId { get; set; }
        public Guid PersonelId { get; set; }
    }
}
