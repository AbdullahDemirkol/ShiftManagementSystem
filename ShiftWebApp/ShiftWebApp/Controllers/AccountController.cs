using Microsoft.AspNetCore.Mvc;

namespace ShiftWebApp.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
