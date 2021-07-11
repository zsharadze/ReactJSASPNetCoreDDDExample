using ASPNetCoreAPI.Domain;
using ASPNetCoreAPI.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Repositories
{
    public class PublisherRepository : IPublisherRepository, IAsyncDisposable
    {
        private readonly ApplicationDbContext _context;

        public PublisherRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<int> Add(Publisher newItem)
        {
            newItem.CreateDate = DateTime.Now;
            _context.Publishers.Add(newItem);
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Publisher>> GetAllItems()
        {
            return await _context.Publishers.AsNoTracking().ToListAsync();
        }

        public async Task<Publisher> GetById(int id)
        {
            return await _context.Publishers.AsNoTracking().SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> Remove(int id)
        {
            Publisher entity = await _context.Publishers.SingleOrDefaultAsync(a => a.Id == id);
            if (entity != null)
            {
                _context.Publishers.Remove(entity);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    throw;
                }
            }

            return true;
        }

        public async Task<Publisher> Update(Publisher newItem)
        {
            var existing = await _context.Publishers.AsNoTracking().SingleOrDefaultAsync(a => a.Id == newItem.Id);
            if (existing != null)
            {
                newItem.CreateDate = existing.CreateDate;
                _context.Publishers.Update(newItem);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    throw;
                }
            }

            return existing;
        }

        public ValueTask DisposeAsync()
        {
            return _context.DisposeAsync();
        }
    }
}