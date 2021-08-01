using ASPNetCoreAPI.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Contracts
{
    public interface IBookService
    {
        Task<BooksViewModel> GetAllItems(int? publisherId, string searchText, int? pageSize, int? pageIndex);
        Task<int> Add(Book newItem);
        Task<Book> Update(Book item);
        Task<Book> GetById(int id);
        Task<bool> Remove(int id);
    }
}
