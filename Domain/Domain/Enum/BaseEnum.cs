using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enum
{
    public abstract class BaseEnum
    {
        public int Id { get; set; }
        public string Name { get; set; }

        protected BaseEnum(int id, string name)
        {
            Name = name;
            Id = id;
        }
    }
}
