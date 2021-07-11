using ASPNetCoreAPI.Domain;
using ASPNetCoreAPI.Domain.Contracts;
using ASPNetCoreAPI.Domain.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: Books
        [HttpGet]
        public async Task<BooksViewModel> GetAll(int? publisherId, string searchText = null, int? pageSize = 20, int? pageIndex = 1)
        {
            if (pageIndex == null)
            {
                pageIndex = 1;
            }

            var booksViewModel = await _bookService.GetAllItems(publisherId, searchText, pageSize, pageIndex);
            booksViewModel.BooksList = booksViewModel.BooksList.Select(x => new Book
            {
                Id = x.Id,
                Name = x.Name,
                Author = x.Author,
                CreateDate = x.CreateDate,
                ReleaseYear = x.ReleaseYear,
                PublisherName = x.Publisher.Name
            }).ToList();

            return booksViewModel;
        }

        // GET: Book/Details/5
        [HttpGet]
        public async Task<Book> Details(int id)
        {
            return await _bookService.GetById(id);
        }

        // GET: Book/Create
        [HttpPost]
        public async Task<int> Create(Book book)
        {
            return await _bookService.Add(book);
        }

        // GET: Book/Edit/5
        [HttpPost]
        public async Task<Book> Edit(Book book)
        {
            return await _bookService.Update(book);
        }

        // GET: Book/Delete/5
        [HttpPost]
        public async Task<bool> Delete(int id)
        {
            return await _bookService.Remove(id);
        }
    }
}
