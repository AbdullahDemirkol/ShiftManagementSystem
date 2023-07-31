using Application.Repository;
using Infrastructure;
using Infrastructure.Context;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ShiftDbContext>(optionsBuilder =>
{
    var connectionString = "Server=localhost;Port=5433;Database=ShiftManagementDatabase;Search Path=public;User Id=postgres;Password=1234";

    optionsBuilder.UseNpgsql(connectionString);
    using (var dbContext = new ShiftDbContext(optionsBuilder.Options))
    {
        ShiftDbContextMigrationManager.MigrationAsync(dbContext);
    }
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
            options.LoginPath = "/Account/Login"; // Oturum açma sayfasýnýn yolu
            options.AccessDeniedPath = "/Account/AccessDenied"; // Eriþim engellendi sayfasýnýn yolu
        });

builder.Services.AddTransient<IPersonelRepository, PersonelRepository>();
builder.Services.AddTransient<IShiftRepository, ShiftRepository>();
builder.Services.AddTransient<ITeamRepository, TeamRepository>();
builder.Services.AddTransient<ITeamPersonelsRepository, TeamPersonelsRepository>();
builder.Services.AddTransient<IShiftTeamRepository, ShiftTeamRepository>();
builder.Services.AddTransient<IShiftTypeRepository, ShiftTypeRepository>();
builder.Services.AddTransient<IShiftStatusTypeRepository, ShiftStatusTypeRepository>();
builder.Services.AddTransient<ITitleTypeRepository, TitleTypeRepository>();
// Add services to the container.
builder.Services.AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication(); 

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();