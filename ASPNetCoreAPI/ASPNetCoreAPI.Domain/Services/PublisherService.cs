using ASPNetCoreAPI.Domain.Contracts;
using ASPNetCoreAPI.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASPNetCoreAPI.Domain.Services
{
    public class PublisherService : IPublisherService
    {
        private readonly IPublisherRepository _publisherRepository;

        public PublisherService(IPublisherRepository publisherRepository)
        {
            this._publisherRepository = publisherRepository;
        }

        public Task<int> Add(Publisher newItem)
        {
            return _publisherRepository.Add(newItem);
        }

        public Task<IEnumerable<Publisher>> GetAllItems()
        {
            return _publisherRepository.GetAllItems();
        }

        public Task<Publisher> GetById(int id)
        {
            return _publisherRepository.GetById(id);
        }

        public Task<bool> Remove(int id)
        {
            return _publisherRepository.Remove(id);
        }

        public Task<Publisher> Update(Publisher item)
        {
            return _publisherRepository.Update(item);
        }
    }
}
