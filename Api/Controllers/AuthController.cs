using System.Security.Principal;
using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterModel model)
    {
        var userExists = await _userManager.FindByNameAsync(model.Username);

        if (userExists != null) 
        {
            return BadRequest("User already exists");
        }

        var user = new IdentityUser(model.Username);
        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest("Unable to create user");
        }
        
        return Ok();
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] RegisterModel model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user != null)
        {
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, true, false);

            if (result.Succeeded)
            {
                HttpContext.Items["User"] = user;
                Console.WriteLine(User.Identity?.IsAuthenticated);
                return Ok(user);
            }

            return Unauthorized();
        }

        return NotFound();
    }

    [HttpGet("isAuthenticated")]
    public void IsLoggedIn()
    {
        Console.WriteLine(HttpContext.User.Identity?.IsAuthenticated);
        Console.WriteLine(HttpContext.User.Identity?.Name);
        Console.WriteLine(User.Identity?.IsAuthenticated);
        Console.WriteLine(User.Identity?.Name);
    }
}