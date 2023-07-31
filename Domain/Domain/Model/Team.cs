using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class Team: BaseEntity
    {
        public string TeamName { get; set; }
        public Personel TeamLeader { get; set; }
    }
}
