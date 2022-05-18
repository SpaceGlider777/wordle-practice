using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
    public class WordlePracticeDbContext : DbContext
    {
        public WordlePracticeDbContext(DbContextOptions<WordlePracticeDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Word> Words { get; set; } = null!;
    }
}