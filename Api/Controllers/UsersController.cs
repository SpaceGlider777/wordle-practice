using Microsoft.AspNetCore.Mvc;
using Api.Models;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly WordlePracticeDbContext _context;

    public UsersController(WordlePracticeDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<List<User>> GetAll()
    {
        return Ok(_context.Set<User>().ToList());
    }

    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id)
    {
        var user = _context.Set<User>().Find(id);
        
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [HttpPost]
    public ActionResult<User> Post([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest();
        }

        return Ok(_context.Set<User>().Add(user));
    }

    [HttpPut("{id}")]
    public ActionResult<User> Put(int id, [FromBody] User updatedUser)
    {
        if (updatedUser == null)
        {
            return BadRequest();
        }

        var user = _context.Set<User>().Find(id);

        if (user == null)
        {
            return NotFound();
        }

        return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var user = _context.Set<User>().Find(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(_context.Set<User>().Remove(user));
    }
}