using Application.Repository;
using Infrastructure.Context;
using Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddTransient<IPersonelRepository, PersonelRepository>();
builder.Services.AddTransient<IShiftRepository, ShiftRepository>();
builder.Services.AddTransient<ITeamRepository, TeamRepository>();


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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
