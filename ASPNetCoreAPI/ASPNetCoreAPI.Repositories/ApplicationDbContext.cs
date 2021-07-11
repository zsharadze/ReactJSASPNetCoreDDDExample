using ASPNetCoreAPI.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection;

namespace ASPNetCoreAPI.Repositories
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
