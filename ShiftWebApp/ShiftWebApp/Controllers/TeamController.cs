using Application.Repository;
using Domain.Enum;
using Domain.Model;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ShiftWebApp.Models;

namespace ShiftWebApp.Controllers
{
    public class TeamController : Controller
    {

        private readonly ITeamRepository _teamRepository;
        private readonly ITeamPersonelsRepository _teamPersonelsRepository;
        private readonly IPersonelRepository _personelRepository;


        public TeamController(ITeamRepository teamRepository, ITeamPersonelsRepository teamPersonelsRepository, IPersonelRepository personelRepository)
        {
            _teamRepository = teamRepository;
            _teamPersonelsRepository = teamPersonelsRepository;
            _personelRepository = personelRepository;
        }
        public async Task<IActionResult> Teams()
        {
            var model = await _teamRepository.Get(null,p=>p.TeamLeader);
            return View(model);
        }

        public async Task<IActionResult> TeamView(Guid teamId)
        {
            var teamPersonelList = await _teamPersonelsRepository.Get(p => p.TeamId == teamId);
            var teamPersonelCount= teamPersonelList.Count();
            ViewBag.TeamPersonelCount= teamPersonelCount;
            var model= await _teamRepository.GetSingleAsync(p=>p.Id==teamId,p=>p.TeamLeader);
            var allPersonels = await _personelRepository.Get(null, p => p.Title);
            var personels=new List<Personel>();
            foreach (var teamPersonel in teamPersonelList)
            {
                personels.Add(allPersonels.Find(p => p.Id == teamPersonel.PersonelId));
            }
            ViewBag.PersonelList = personels;
            return View(model);
        }

        public async Task<IActionResult> UpdateTeam(Guid teamId)
        {
            var teams = await _teamRepository.Get(null, p => p.TeamLeader);
            var model = teams.FirstOrDefault(p => p.Id == teamId);
            //await _teamRepository.GetSingleAsync(p => p.Id == teamId, p => p.TeamLeader);
            var teamLeaderPersonels = await _personelRepository.Get(p => p.Title.Id == TitleType.TeamLeader.Id);
            List<Personel> liderIds = new List<Personel>();
            foreach (var teamLeaderPersonel in teamLeaderPersonels)
            {
                if (!teams.Any(p=>p.TeamLeader.Id==teamLeaderPersonel.Id))
                {
                    liderIds.Add(teamLeaderPersonel);
                }
            }
            liderIds.Add(model.TeamLeader);
            ViewBag.TeamLeaderPersonels = liderIds;
            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Update(Guid teamLeaderId,Team team)
        {
            var registeredTeam = await _teamRepository.GetSingleAsync(p => p.Id == team.Id, p => p.TeamLeader,p=>p.TeamLeader.Title);
            registeredTeam.TeamName = team.TeamName;
            Personel selectedPersonel;
            if (teamLeaderId!=Guid.Empty)
            {
                selectedPersonel = await _personelRepository.GetSingleAsync(p => p.Id == teamLeaderId, p => p.Title);
                registeredTeam.TeamLeader = selectedPersonel;
            }
            _teamRepository.Update(registeredTeam);
            return RedirectToAction("TeamView", "Team", new { teamId = team.Id });
        }
        public async Task<IActionResult> AddTeam()
        {
            var personels =await _personelRepository.Get(null,p=>p.Title);
            var teams = await _teamRepository.Get(null, p => p.TeamLeader);
            var teamLeaders = personels.Where(p => p.Title.Name == TitleType.TeamLeader.Name);
            List<Personel> nonTeamLeaders=new List<Personel>();
            foreach (var teamLeader in teamLeaders)
            {
                if (!teams.Any(p=>p.TeamLeader.Id==teamLeader.Id))
                {
                    nonTeamLeaders.Add(teamLeader);
                }
            }

            var teamPersonels = await _teamPersonelsRepository.GetAll();
            List<Personel> nonTeamPersonels=new List<Personel>();
            foreach (var personel in personels)
            {
                if (!teamPersonels.Any(p=>p.PersonelId==personel.Id) && personel.Title.Id==TitleType.Employee.Id)
                {

                    nonTeamPersonels.Add(personel);
                }
            }
            ViewBag.NonTeamPersonels=nonTeamPersonels;
            ViewBag.NonTeamLeaders = nonTeamLeaders;

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Add(string personelIds, Team team)
        {
            if (team.TeamLeader==null)
            {
                var teamLeaders = await _personelRepository.Get(p=>p.Title.Name == TitleType.TeamLeader.Name, p => p.Title);
                var teams = await _teamRepository.Get(null, p => p.TeamLeader);
                List<Personel> nonTeamLeaders = new List<Personel>();
                foreach (var teamLeader in teamLeaders)
                {
                    if (!teams.Any(p => p.TeamLeader.Id == teamLeader.Id))
                    {
                        nonTeamLeaders.Add(teamLeader);
                    }
                }
                if (nonTeamLeaders.Count!=1)
                {
                    return RedirectToAction("Teams", "Team");
                }
                team.TeamLeader = nonTeamLeaders.First();
            }

            List<Guid> personelIdList = JsonConvert.DeserializeObject<List<Guid>>(personelIds);

            var createdTeam=_teamRepository.Add(team);

            foreach (var personelId in personelIdList)
            {
                TeamPersonelAssignment teamPersonelAssignment = new TeamPersonelAssignment
                {
                    PersonelId =personelId,
                    TeamId= createdTeam.Id
                };
                _teamPersonelsRepository.Add(teamPersonelAssignment);
            }

            return RedirectToAction("TeamView", "Team", new { teamId = createdTeam.Id });
        }
    }
}
