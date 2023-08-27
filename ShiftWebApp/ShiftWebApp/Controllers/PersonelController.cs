using Application.Repository;
using Domain.Enum;
using Domain.Model;
using Infrastructure.Context;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ShiftWebApp.Controllers
{
    public class PersonelController : Controller
    {
        private readonly IPersonelRepository _personelRepository;
        private readonly ITitleTypeRepository _titleTypeRepository;
        private readonly ITeamPersonelsRepository _teamPersonelsRepository;

        public PersonelController(IPersonelRepository personelRepository, ITitleTypeRepository titleTypeRepository, ITeamPersonelsRepository teamPersonelsRepository)
        {
            _personelRepository = personelRepository;
            _titleTypeRepository = titleTypeRepository;
            _teamPersonelsRepository = teamPersonelsRepository;
        }
        public async Task<IActionResult> Personels()
        {

            var model = await _personelRepository.Get(null, p => p.Title);
            EditPersonelsTitle(model);
            return View(model);
        }
        public async Task<IActionResult> PersonelView(Guid personelId)
        {

            var model = await _personelRepository.GetSingleAsync(p => p.Id == personelId, p => p.Title);
            EditPersonelTitle(model);
            return View(model);
        }

        public async Task<IActionResult> ChangePersonel(int settingsId, Guid personelId)
        {
            var personels = await _personelRepository.Get(null, p => p.Title);
            var teamPersonels = await _teamPersonelsRepository.GetAll();

            var registeredPersonel = personels.FirstOrDefault(p => p.Id == personelId);
            var registeredTeamPersonels = teamPersonels.FirstOrDefault(p => p.PersonelId == personelId);
            personels.Remove(registeredPersonel);
            teamPersonels.Remove(registeredTeamPersonels);
            var nonTeamPersonels = new List<Personel>();
            var personelsWithTeam = new List<Personel>();
            foreach (var personel in personels)
            {
                if (personel.Title.Id == TitleType.Employee.Id)
                {
                    if (teamPersonels.Any(p => p.PersonelId == personel.Id))
                    {
                        personelsWithTeam.Add(personel);
                    }
                    else
                    {
                        nonTeamPersonels.Add(personel);
                    }
                }
            }
            foreach (var nonTeamPersonel in nonTeamPersonels)
            {
                personels.Remove(nonTeamPersonel);
            }
            ViewBag.PersonelsWithTeam = personelsWithTeam;
            ViewBag.NonTeamPersonels= nonTeamPersonels;
            ViewBag.RegisteredPersonel= registeredPersonel;
            return View(settingsId);
        }
        public async Task<IActionResult> Change(Guid firstPersonelId, Guid secondPersonelId,int settingsId)
        {
            var teamPersonels = await _teamPersonelsRepository.Get(p => p.PersonelId == firstPersonelId || p.PersonelId == secondPersonelId);
            var firstPersonel = teamPersonels.FirstOrDefault(p => p.PersonelId == firstPersonelId);
            var p = _personelRepository.Get(p => p.Id== firstPersonelId);
            if (settingsId==1)
            {
                var secondPersonel = teamPersonels.FirstOrDefault(p => p.PersonelId == secondPersonelId);
                var blank = firstPersonel.TeamId;
                firstPersonel.TeamId = secondPersonel.TeamId;
                secondPersonel.TeamId = blank;
                _teamPersonelsRepository.Update(firstPersonel);
                _teamPersonelsRepository.Update(secondPersonel);
            }
            else if (settingsId == 2)
            {
                firstPersonel.PersonelId = secondPersonelId;
                _teamPersonelsRepository.Update(firstPersonel);

            }
            
            return RedirectToAction("Teams", "Team");
        }

        public async Task<IActionResult> UpdatePersonel(Guid personelId)
        {
            var titleTypes = await _titleTypeRepository.GetAll();
            EditTitleTypes(titleTypes);
            ViewBag.TitleTypes = titleTypes;
            //ViewBag.TitleTypes();
            var model = await _personelRepository.GetSingleAsync(p => p.Id == personelId, p => p.Title);
            EditPersonelTitle(model);
            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Update(int titleId,Personel personel)
        {
            var registeredPersonel = await _personelRepository.GetSingleAsync(p => p.Id == personel.Id, p => p.Title);
            registeredPersonel.FirstName = personel.FirstName;
            registeredPersonel.LastName = personel.LastName;
            registeredPersonel.Phone = personel.Phone;
            registeredPersonel.Address = personel.Address;
            registeredPersonel.UserName = personel.UserName;
            registeredPersonel.IsActive = personel.IsActive;
            TitleType title;
            if (titleId != 0)
            {
                title = await _titleTypeRepository.GetSingleAsync(p => p.Id == titleId);
            }
            else
            {
                title = _personelRepository.GetSingleAsync(p => p.Id == personel.Id,p=>p.Title).Result.Title;
            }
            registeredPersonel.Title = title;

            _personelRepository.Update(registeredPersonel);
            return RedirectToAction("PersonelView", "Personel", new { personelId = personel.Id });
        }


        public async Task<IActionResult> UpdatePassiveStatu(Guid personelId)
        {
            var registeredPersonel = await _personelRepository.GetSingleAsync(p => p.Id == personelId, p => p.Title);
            registeredPersonel.IsActive = false;
            _personelRepository.Update(registeredPersonel);
            return RedirectToAction("Personels", "Personel");
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
            EditTitleType(personel.Title);
            return personel;
        }
        private List<TitleType> EditTitleTypes(List<TitleType> titleTypes)
        {
            foreach (var titleType in titleTypes)
            {
                EditTitleType(titleType);
            }
            return titleTypes;
        }
        private TitleType EditTitleType(TitleType titleType)
        {
            if (titleType!=null)
            {
                if (titleType.Name == "employee")
                {
                    titleType.Name = "Çalışan";
                }
                else if (titleType.Name == "teamleader")
                {
                    titleType.Name = "Takım Lideri";
                }
                else if (titleType.Name == "authorizedemployee")
                {
                    titleType.Name = "Yetkili Çalışan";
                }
            }
            return titleType;
        }
    }
}
