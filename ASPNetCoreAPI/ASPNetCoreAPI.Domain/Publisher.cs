using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ASPNetCoreAPI.Domain
{
    public class Publisher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}
