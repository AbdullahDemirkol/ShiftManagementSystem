using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class ShiftTeamAssignment: BaseEntity
    {
        public Guid ShiftId { get; set; }
        public Guid TeamId { get; set; }
    }
}
