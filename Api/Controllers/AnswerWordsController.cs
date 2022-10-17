using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnswerWordsController : ControllerBase
{
    private readonly WordlePracticeDbContext _context;

    public AnswerWordsController(WordlePracticeDbContext context)
    {
        _context = context;
    }

    [HttpGet("all")]
    public ActionResult<List<AnswerWord>> GetAll()
    {
        return Ok(_context.AnswerWords.ToList());
    }

    [HttpGet("count")]
    public ActionResult<List<AnswerWord>> GetCount()
    {
        return Ok(_context.AnswerWords.Count());
    } 

    [HttpGet("{id}")]
    public ActionResult<AnswerWord> GetById(int id)
    {
        var word = _context.AnswerWords.Find(id);
        
        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpGet]
    public ActionResult<AnswerWord> GetByValue([FromQuery] string value)
    {
        var word = _context.AnswerWords.SingleOrDefault(word => word.Value == value);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(word);
    }

    [HttpPost]
    public ActionResult<AnswerWord> Post([FromBody] AnswerWord word)
    {
        if (word == null)
        {
            return BadRequest();
        }

        return Ok(_context.AnswerWords.Add(word));
    }

    [HttpPut("{id}")]
    public ActionResult<AnswerWord> Put(int id, [FromBody] AnswerWord updatedWord)
    {
        if (updatedWord == null)
        {
            return BadRequest();
        }

        var word = _context.AnswerWords.Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var word = _context.AnswerWords.Find(id);

        if (word == null)
        {
            return NotFound();
        }

        return Ok(_context.AnswerWords.Remove(word));
    }
}