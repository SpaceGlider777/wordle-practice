using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Api.Models;

var AllowedOrigins = "_allowedOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<WordlePracticeDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database"));
});

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.SignIn.RequireConfirmedAccount = false;
})
.AddEntityFrameworkStores<WordlePracticeDbContext>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowedOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200");
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseCors(AllowedOrigins);

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
