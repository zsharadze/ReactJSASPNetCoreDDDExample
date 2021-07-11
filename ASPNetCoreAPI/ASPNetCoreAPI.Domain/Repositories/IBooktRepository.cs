using ASPNetCoreAPI.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Repositories
{
    public interface IBookRepository
    {
        Task<BooksViewModel> GetAllItems(int? publisherId, string searchText, int? pageSize, int? pageIndex);
        Task<int> Add(Book newItem);
        Task<Book> Update(Book newItem);
        Task<Book> GetById(int id);
        Task<bool> Remove(int id);
    }
}
