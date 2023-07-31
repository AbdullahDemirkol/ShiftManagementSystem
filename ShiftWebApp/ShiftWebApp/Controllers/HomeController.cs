using Application.Repository;
using Infrastructure.Context;
using Microsoft.AspNetCore.Mvc;
using ShiftWebApp.Models;
using System.Diagnostics;

namespace ShiftWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ShiftDbContext _shiftDbContext;
        private readonly IPersonelRepository _personelRepository;

        public HomeController(ILogger<HomeController> logger, ShiftDbContext shiftDbContext, IPersonelRepository personelRepository )
        {
            _logger = logger;
            _shiftDbContext = shiftDbContext;
            _personelRepository = personelRepository;
        }

        public async Task<IActionResult> Index()
        {
            var model = await _personelRepository.GetSingleAsync(p => p.Address == "12 Main Street, City");
            ViewBag.FirstName = model.FirstName;
            ViewBag.LastName = model.LastName;

            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}