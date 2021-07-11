using ASPNetCoreAPI.Domain.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.ViewModels
{
    public class BooksViewModel
    {
        public List<Book> BooksList { get; set; }
        public Pager Pager { get; set; }
    }
}
