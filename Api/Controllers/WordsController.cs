using Microsoft.AspNetCore.Mvc;
using Api.Models;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WordsController : ControllerBase
{
    private readonly WordlePracticeDbContext _context;

    public WordsController(WordlePracticeDbContext context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public ActionResult<List<Word>> GetAll()
    {
        return Ok(_context.Set<Word>().ToList());
    }

    [HttpGet("count")]
    public ActionResult<List<Word>> GetCount()
    {
        return Ok(_context.Set<Word>().Count());
    } 

    [HttpGet("{id}")]
    public ActionResult<Word> GetById(int id)
    {
        var word = _context.Set<Word>().Find(id);
        
        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpGet]
    public ActionResult<Word> GetByValue([FromQuery] string value)
    {
        var word = _context.Set<Word>().SingleOrDefault(word => word.Value == value);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpPost]
    public ActionResult<Word> Post([FromBody] Word word)
    {
        if (word == null)
        {
            return BadRequest();
        }

        return Ok(_context.Set<Word>().Add(word));
    }

    [HttpPut("{id}")]
    public ActionResult<Word> Put(int id, [FromBody] Word updatedWord)
    {
        if (updatedWord == null)
        {
            return BadRequest();
        }

        var word = _context.Set<Word>().Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var word = _context.Set<Word>().Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(_context.Set<Word>().Remove(word));
    }
}