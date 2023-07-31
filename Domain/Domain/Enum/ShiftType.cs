using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enum
{

    public class ShiftType : BaseEnum
    {
        public ShiftType(int id, string name) : base(id, name)
        {
            Id = id;
            Name = name;
        }
        public static ShiftType MorningShift = new(1, nameof(MorningShift).ToLowerInvariant());
        public static ShiftType EveningShift = new(2, nameof(EveningShift).ToLowerInvariant());
        public static ShiftType NightShift = new(3, nameof(NightShift).ToLowerInvariant());
        public static ShiftType SaturdayShift = new(4, nameof(SaturdayShift).ToLowerInvariant());
        public static ShiftType SundayShift = new(5, nameof(SundayShift).ToLowerInvariant());
        public static ShiftType FreeShift = new(6, nameof(FreeShift).ToLowerInvariant());

        public static IEnumerable<ShiftType> List()
        {
            return new List<ShiftType> { MorningShift, EveningShift , NightShift , SaturdayShift , SundayShift , FreeShift };
        }
        public static ShiftType FromName(string name)
        {
            var state = List().SingleOrDefault(p => p.Name == name);
            return state;
        }
        public static ShiftType FromId(int id)
        {
            var state = List().SingleOrDefault(p => p.Id == id);
            return state;
        }
    }
}
