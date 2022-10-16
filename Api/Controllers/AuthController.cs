using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
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

    [HttpGet]
    public ActionResult Get()
    {
        return Ok();
    }
}