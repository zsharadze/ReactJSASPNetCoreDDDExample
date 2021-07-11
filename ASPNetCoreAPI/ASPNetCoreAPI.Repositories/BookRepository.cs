using ASPNetCoreAPI.Domain;
using ASPNetCoreAPI.Domain.Extensions;
using ASPNetCoreAPI.Domain.Repositories;
using ASPNetCoreAPI.Domain.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Repositories
{
    public class BookRepository : IBookRepository, IAsyncDisposable
    {
        private readonly ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<int> Add(Book newItem)
        {
            newItem.CreateDate = DateTime.Now;
            _context.Books.Add(newItem);
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<BooksViewModel> GetAllItems(int? publisherId, string searchText, int? pageSize, int? pageIndex)
        {
            var result = new BooksViewModel();
            result.BooksList = new List<Book>();

            var books = _context.Books.Include(x => x.Publisher).AsNoTracking().AsQueryable();
            string summaryTextAdd = "";

            if (publisherId != null || searchText != null)
            {
                summaryTextAdd = $" (filtered from {books.Count()} total entries)";
            }

            if (publisherId != null)
            {                
                books = books.Where(x => x.PublisherId == publisherId);
            }
                        
            if (searchText != null)
            {                
                books = books.Where(x => x.Name.ToLower().Contains(searchText.ToLower())
                || x.Author.ToLower().Contains(searchText.ToLower())
                || x.Publisher.Name.ToLower().Contains(searchText.ToLower()));
            }

            if (pageSize == null || pageIndex == null)
            {
                result.BooksList = await books.ToListAsync();
                return result;
            }
            else if (pageSize.HasValue && pageIndex.HasValue)
            {
                int totalCount = books.Count();
                PagerHelper pagerHelper = new PagerHelper(totalCount, pageIndex.Value, pageSize.Value, summaryTextAdd);
                result.Pager = pagerHelper.GetPager;
                result.BooksList = await books.Skip((pagerHelper.CurrentPage - 1) * pagerHelper.PageSize).Take(pagerHelper.PageSize).ToListAsync();
                return result;
            }
            else
            {
                throw new Exception("pageSize or pageIndex parameter is null");
            }
        }

        public async Task<Book> GetById(int id)
        {
            return await _context.Books.AsNoTracking().SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> Remove(int id)
        {
            Book entity = await _context.Books.SingleOrDefaultAsync(a => a.Id == id);
            if (entity != null)
            {
                _context.Books.Remove(entity);
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

        public async Task<Book> Update(Book newItem)
        {
            var existing = await _context.Books.AsNoTracking().SingleOrDefaultAsync(a => a.Id == newItem.Id);
            if (existing != null)
            {
                newItem.CreateDate = existing.CreateDate;
                _context.Books.Update(newItem);
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
