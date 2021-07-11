using ASPNetCoreAPI.Domain;
using ASPNetCoreAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Infrastructure
{
    public static class SeederExtension
    {
        public static IHost SeedDatabase<TContext>(this IHost host) where TContext : ApplicationDbContext
        {
            // Create a scope to get scoped services.
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetService<TContext>();
                context.Database.Migrate();

                if (!context.Publishers.Any() && !context.Books.Any())
                {
                    for (int i = 0; i < 3; i++)
                    {
                        Publisher publisher = new Publisher();
                        publisher.CreateDate = DateTime.Now;
                        publisher.Name = "Publisher " + (i + 1);
                        context.Publishers.Add(publisher);
                    }

                    context.SaveChanges();

                    RandomNameGeneratorLibrary.PersonNameGenerator personNameGenerator = new RandomNameGeneratorLibrary.PersonNameGenerator();
                    RandomNameGeneratorLibrary.PlaceNameGenerator placeNameGenerator = new RandomNameGeneratorLibrary.PlaceNameGenerator();
                    Random r = new Random();
                    var publisherIds = context.Publishers.Select(x => x.Id).ToList();

                    for (int i = 0; i < 300; i++)
                    {
                        Book book = new Book();
                        book.Author = personNameGenerator.GenerateMultipleFirstAndLastNames(1).First();
                        book.CreateDate = DateTime.Now;
                        book.Name = placeNameGenerator.GenerateRandomPlaceName();
                        book.PublisherId = publisherIds[r.Next(0, 3)];
                        book.ReleaseYear = r.Next(1970, 2022);
                        context.Books.Add(book);
                    }
                    context.SaveChanges();
                }
            }

            return host;
        }
    }
}
