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

    [HttpGet]
    public ActionResult<List<Word>> GetAll()
    {
        return Ok(_context.Set<Word>().ToList());
    }

    [HttpGet("{id}")]
    public ActionResult<Word> GetById(int id)
    {
        var Word = _context.Set<Word>().Find(id);
        
        if (Word == null)
        {
            return NotFound();
        }

        return Ok(Word);
    }

    [HttpPost]
    public ActionResult<Word> Post([FromBody] Word Word)
    {
        if (Word == null)
        {
            return BadRequest();
        }

        return Ok(_context.Set<Word>().Add(Word));
    }

    [HttpPut("{id}")]
    public ActionResult<Word> Put(int id, [FromBody] Word updatedWord)
    {
        if (updatedWord == null)
        {
            return BadRequest();
        }

        var Word = _context.Set<Word>().Find(id);

        if (Word == null)
        {
            return NotFound();
        }

        return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var Word = _context.Set<Word>().Find(id);

        if (Word == null)
        {
            return NotFound();
        }

        return Ok(_context.Set<Word>().Remove(Word));
    }
}