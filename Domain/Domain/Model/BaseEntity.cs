using Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public abstract class BaseEntity
    {
        public virtual Guid Id { get; set; }
    }
}
