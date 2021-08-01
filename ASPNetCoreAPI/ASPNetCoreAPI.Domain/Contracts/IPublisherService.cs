using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Contracts
{
    public interface IPublisherService
    {
        Task<IEnumerable<Publisher>> GetAllItems();
        Task<int> Add(Publisher newItem);
        Task<Publisher> Update(Publisher item);
        Task<Publisher> GetById(int id);
        Task<bool> Remove(int id);
    }
}
