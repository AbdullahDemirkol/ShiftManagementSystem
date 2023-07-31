using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enum
{

    public class ShiftStatusType : BaseEnum
    {
        public ShiftStatusType(int id, string name) : base(id, name)
        {
            Id = id;
            Name = name;
        }
        public static ShiftStatusType ToDo = new(1, nameof(ToDo).ToLowerInvariant());
        public static ShiftStatusType Completed = new(2, nameof(Completed).ToLowerInvariant());
        public static ShiftStatusType Cancelled = new(3, nameof(Cancelled).ToLowerInvariant());

        public static IEnumerable<ShiftStatusType> List()
        {
            return new List<ShiftStatusType> { ToDo, Completed, Cancelled};
        }
        public static ShiftStatusType FromName(string name)
        {
            var state = List().SingleOrDefault(p => p.Name == name);
            return state;
        }
        public static ShiftStatusType FromId(int id)
        {
            var state = List().SingleOrDefault(p => p.Id == id);
            return state;
        }
    }
}
