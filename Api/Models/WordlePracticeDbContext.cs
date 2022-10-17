using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Api.Models
{
    public class WordlePracticeDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public WordlePracticeDbContext(DbContextOptions<WordlePracticeDbContext> options)
            : base(options)
        {
        }

        public DbSet<AcceptedWord> AcceptedWords { get; set; } = null!;
        public DbSet<AnswerWord> AnswerWords { get; set; } = null!;
    }
}