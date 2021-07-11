using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Repositories
{
    public interface IPublisherRepository
    {
        Task<IEnumerable<Publisher>> GetAllItems();
        Task<int> Add(Publisher newItem);
        Task<Publisher> Update(Publisher newItem);
        Task<Publisher> GetById(int id);
        Task<bool> Remove(int id);
    }
}
