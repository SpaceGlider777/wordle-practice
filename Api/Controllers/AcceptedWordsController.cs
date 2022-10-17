using Microsoft.AspNetCore.Mvc;
using Api.Models;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AcceptedWordsController : ControllerBase
{
    private readonly WordlePracticeDbContext _context;

    public AcceptedWordsController(WordlePracticeDbContext context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public ActionResult<List<AcceptedWord>> GetAll()
    {
        return Ok(_context.AcceptedWords.ToList());
    }

    [HttpGet("count")]
    public ActionResult<List<AcceptedWord>> GetCount()
    {
        return Ok(_context.AcceptedWords.Count());
    } 

    [HttpGet("{id}")]
    public ActionResult<AcceptedWord> GetById(int id)
    {
        var word = _context.AcceptedWords.Find(id);
        
        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpGet]
    public ActionResult<AcceptedWord> GetByValue([FromQuery] string value)
    {
        var word = _context.AcceptedWords.SingleOrDefault(word => word.Value == value);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpPost]
    public ActionResult<AcceptedWord> Post([FromBody] AcceptedWord word)
    {
        if (word == null)
        {
            return BadRequest();
        }

        return Ok(_context.AcceptedWords.Add(word));
    }

    [HttpPut("{id}")]
    public ActionResult<AcceptedWord> Put(int id, [FromBody] AcceptedWord updatedWord)
    {
        if (updatedWord == null)
        {
            return BadRequest();
        }

        var word = _context.AcceptedWords.Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var word = _context.AcceptedWords.Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(_context.AcceptedWords.Remove(word));
    }
}