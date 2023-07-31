using Application.Repository;
using Domain.Enum;
using Domain.Model;
using Infrastructure.Repository;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ShiftWebApp.Controllers
{
    public class ShiftController : Controller
    {
        private readonly IShiftRepository _shiftRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly IPersonelRepository _personelRepository;
        private readonly IShiftTeamRepository _shiftTeamRepository;
        private readonly ITeamPersonelsRepository _teamPersonelsRepository;
        private readonly IShiftTypeRepository _shiftTypeRepository;
        private readonly IShiftStatusTypeRepository _shiftStatusTypeRepository;
        public ShiftController(ITeamRepository teamRepository, IPersonelRepository personelRepository, IShiftRepository shiftRepository,
            IShiftTeamRepository shiftTeamRepository, ITeamPersonelsRepository teamPersonelsRepository, IShiftTypeRepository shiftTypeRepository, 
            IShiftStatusTypeRepository shiftStatusTypeRepository)
        {
            _teamRepository = teamRepository;
            _personelRepository = personelRepository;
            _shiftRepository = shiftRepository;
            _shiftTeamRepository = shiftTeamRepository;
            _teamPersonelsRepository = teamPersonelsRepository;
            _shiftTypeRepository = shiftTypeRepository;
            _shiftStatusTypeRepository = shiftStatusTypeRepository;
        }
        public async Task<IActionResult> Shifts()
        {
            var model = await _shiftRepository.Get(null, p => p.ShiftType ,p=>p.ShiftStatus);
            EditShiftsTypes(model);
            EditShiftsStatu(model);
            return View(model);
        }


        public async Task<IActionResult> ShiftView(Guid shiftId)
        {
            var shift=await _shiftRepository.GetSingleAsync(p=>p.Id==shiftId,p=>p.ShiftStatus,p=>p.ShiftType);
            //Vardiya Bilgileri Hazır

            var teamId = _shiftTeamRepository.GetSingleAsync(p => p.ShiftId == shiftId).Result.TeamId;
            var team = await _teamRepository.GetSingleAsync(p => p.Id == teamId, p => p.TeamLeader, p => p.TeamLeader.Title);
            //Takım Bilgileri Hazır

            var teamPersonelsAssignments = await _teamPersonelsRepository.Get(p => p.TeamId == teamId);
            List<Personel> personels=new List<Personel>();
            foreach (var teamPersonelAssignments in teamPersonelsAssignments)
            {
                var personel = await _personelRepository.GetSingleAsync(p => p.Id == teamPersonelAssignments.PersonelId,p=>p.Title);
                personels.Add(personel);
            }
            EditPersonelsTitle(personels);
            EditShiftType(shift);
            EditShiftStatu(shift);
            ViewBag.Team=team;
            ViewBag.PersonelList=personels;

            return View(shift);
        }

        public async Task<IActionResult> UpdateShift(Guid shiftId)
        {
            var shift=await _shiftRepository.GetSingleAsync(p=>p.Id== shiftId,p=>p.ShiftStatus,p=>p.ShiftType);
            var teams = await _teamRepository.Get(null, p => p.TeamLeader, p => p.TeamLeader.Title);
            var registeredTeam = teams.FirstOrDefault(p => p.Id == _shiftTeamRepository.GetSingleAsync(p => p.ShiftId == shiftId).Result.TeamId);
            var shiftStatusTypes = await _shiftStatusTypeRepository.GetAll();
            EditShiftStatus(shiftStatusTypes);

            ViewBag.ShiftStatusTypes = shiftStatusTypes;
            ViewBag.Teams = teams;
            ViewBag.RegisteredTeam = registeredTeam;
            

            return View(shift);
        }
        [HttpPost]
        public async Task<IActionResult> Update(int shiftStatusTypeId, int shiftTypeId, Guid teamId, Shift shift)
        {
            shift.ShiftStatus =await _shiftStatusTypeRepository.GetSingleAsync(p => p.Id == shiftStatusTypeId);
            shift.ShiftType = await _shiftTypeRepository.GetSingleAsync(p => p.Id == shiftTypeId);
            shift.StartTime = shift.StartTime.ToUniversalTime();
            shift.EndTime = shift.EndTime.ToUniversalTime();
            _shiftRepository.Update(shift);

            var shiftTeam = await _shiftTeamRepository.GetSingleAsync(p => p.ShiftId == shift.Id);
            shiftTeam.TeamId = teamId;
            _shiftTeamRepository.Update(shiftTeam);
            return RedirectToAction("ShiftView", "Shift", new { shiftId = shift.Id });
        }
        public async Task<IActionResult> AddShift()
        {
            var shiftTypes = await _shiftTypeRepository.GetAll();
            EditShiftTypes(shiftTypes);
            var teams = await _teamRepository.Get(null, p => p.TeamLeader, p => p.TeamLeader.Title);

            ViewBag.ShiftTypes= shiftTypes;
            ViewBag.Teams = teams;

            return View();
        }
        [HttpPost("/Shift/Add")]
        public async Task<IActionResult> Add(int shiftTypeId, Guid teamId, Shift shift)
        {
            var shiftType = await _shiftTypeRepository.GetSingleAsync(p => p.Id == shiftTypeId);
            shift.ShiftType = shiftType;
            shift.ShiftStatus = await _shiftStatusTypeRepository.GetSingleAsync(p=>p.Id==ShiftStatusType.ToDo.Id);
            shift.StartTime = shift.StartTime.ToUniversalTime();
            shift.EndTime = shift.EndTime.ToUniversalTime();
            _shiftRepository.Add(shift);

            ShiftTeamAssignment shiftTeamAssignment = new ShiftTeamAssignment()
            {
                ShiftId=shift.Id,
                TeamId= teamId
            };
            _shiftTeamRepository.Add(shiftTeamAssignment);

            return RedirectToAction("ShiftView", "Shift", new { shiftId = shift.Id });
        }



        private List<Shift> EditShiftsTypes(List<Shift> shifts)
        {
            foreach (var shift in shifts)
            {
                EditShiftType(shift);
            }
            return shifts;
        }
        private Shift EditShiftType(Shift shift)
        {
            EditShiftType(shift.ShiftType);
            return shift;
        }
        private List<ShiftType> EditShiftTypes(List<ShiftType> shiftTypes)
        {
            foreach (var shiftType in shiftTypes)
            {
                EditShiftType(shiftType);
            }
            return shiftTypes;
        }
        private ShiftType EditShiftType(ShiftType shiftType)
        {
            if (shiftType.Name == "morningshift")
            {
                shiftType.Name = "Sabah Vardiyası";
            }
            else if (shiftType.Name == "eveningshift")
            {
                shiftType.Name = "Akşam Vardiyası";
            }
            else if (shiftType.Name == "nightshift")
            {
                shiftType.Name = "Gece Vardiyası";
            }
            else if (shiftType.Name == "saturdayshift")
            {
                shiftType.Name = "Cumartesi Vardiyası";
            }
            else if (shiftType.Name == "sundayshift")
            {
                shiftType.Name = "Pazar Vardiyası";
            }
            else if (shiftType.Name == "freeshift")
            {
                shiftType.Name = "Serbest Vardiya";
            }
            return shiftType;
        }

        private List<Shift> EditShiftsStatu(List<Shift> shifts)
        {
            foreach (var shift in shifts)
            {
                EditShiftStatu(shift);
            }
            return shifts;
        }
        private Shift EditShiftStatu(Shift shift)
        {
            if (shift.ShiftStatus.Name == "completed")
            {
                shift.ShiftStatus.Name = "Tamamlandı";
            }
            else if (shift.ShiftStatus.Name == "todo")
            {
                shift.ShiftStatus.Name = "Yapılıcak";
            }
            else if (shift.ShiftStatus.Name == "cancelled")
            {
                shift.ShiftStatus.Name = "İptal Edildi";
            }
            return shift;
        }

        private List<ShiftStatusType> EditShiftStatus(List<ShiftStatusType> shiftStatusTypes)
        {
            foreach (var shiftStatusType in shiftStatusTypes)
            {
                EditShiftType(shiftStatusType);
            }
            return shiftStatusTypes;
        }
        private ShiftStatusType EditShiftType(ShiftStatusType shiftStatusType)
        {
            if (shiftStatusType.Name == "completed")
            {
                shiftStatusType.Name = "Tamamlandı";
            }
            else if (shiftStatusType.Name == "todo")
            {
                shiftStatusType.Name = "Yapılıcak";
            }
            else if (shiftStatusType.Name == "cancelled")
            {
                shiftStatusType.Name = "İptal Edildi";
            }
            return shiftStatusType;
        }


        private List<Personel> EditPersonelsTitle(List<Personel> personels)
        {
            foreach (var personel in personels)
            {
                EditPersonelTitle(personel);
            }
            return personels;
        }
        private Personel EditPersonelTitle(Personel personel)
        {
            if (personel.Title != null)
            {
                if (personel.Title.Name == "employee")
                {
                    personel.Title.Name = "Çalışan";
                }
                else if (personel.Title.Name == "teamleader")
                {
                    personel.Title.Name = "Takım Lideri";
                }
                else if (personel.Title.Name == "authorizedemployee")
                {
                    personel.Title.Name = "Yetkili Çalışan";
                }
            }
            return personel;
        }
    }
}
