using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enum
{
    public class TitleType: BaseEnum
    {
        public TitleType(int id, string name) : base(id, name)
        {
            Id = id;
            Name = name;
        }
        public static TitleType AuthorizedEmployee = new(1, nameof(AuthorizedEmployee).ToLowerInvariant());
        public static TitleType TeamLeader = new(2, nameof(TeamLeader).ToLowerInvariant());
        public static TitleType Employee = new(3, nameof(Employee).ToLowerInvariant());

        public static IEnumerable<TitleType> List()
        {
            return new List<TitleType> { AuthorizedEmployee, TeamLeader , Employee };
        }
        public static TitleType FromName(string name)
        {
            var state = List().SingleOrDefault(p => p.Name == name);
            return state;
        }
        public static TitleType FromId(int id)
        {
            var state = List().SingleOrDefault(p => p.Id == id);
            return state;
        }
    }
}
