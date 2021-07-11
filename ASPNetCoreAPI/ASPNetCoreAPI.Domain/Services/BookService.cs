using ASPNetCoreAPI.Domain.Contracts;
using ASPNetCoreAPI.Domain.Repositories;
using ASPNetCoreAPI.Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository BookRepository)
        {
            this._bookRepository = BookRepository;
        }

        public Task<int> Add(Book newItem)
        {
            return _bookRepository.Add(newItem);
        }

        public Task<BooksViewModel> GetAllItems(int? publisherId, string searchText, int? pageSize, int? pageIndex)
        {
            return _bookRepository.GetAllItems(publisherId, searchText, pageSize, pageIndex);
        }

        public Task<Book> GetById(int id)
        {
            return _bookRepository.GetById(id);
        }

        public Task<bool> Remove(int id)
        {
            return _bookRepository.Remove(id);
        }

        public Task<Book> Update(Book newItem)
        {
            return _bookRepository.Update(newItem);
        }
    }
}
