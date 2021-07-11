using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ASPNetCoreAPI.Domain
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int ReleaseYear { get; set; }
        public int PublisherId { get; set; }
        [NotMapped]
        public string PublisherName { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual Publisher Publisher { get; set; }
    }
}
