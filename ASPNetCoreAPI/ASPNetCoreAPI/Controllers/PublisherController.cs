using ASPNetCoreAPI.Domain;
using ASPNetCoreAPI.Domain.Contracts;
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
    public class PublisherController : Controller
    {
        private readonly IPublisherService _publisherService;

        public PublisherController(IPublisherService publisherService)
        {
            _publisherService = publisherService;
        }

        // GET: Publisher/GetAll
        [HttpGet]
        public async Task<List<Publisher>> GetAll()
        {
            var publishers = await _publisherService.GetAllItems();
            return publishers.ToList();
        }


        // GET: Publisher/Details/?id=5
        [HttpGet]
        public async Task<Publisher> Details(int id)
        {
            return await _publisherService.GetById(id);
        }

        // POST: Publisher/Create
        [HttpPost]
        public async Task<int> Create(Publisher publisher)
        {
            return await _publisherService.Add(publisher);
        }

        // POST: Publisher/Edit/?id=5
        [HttpPost]
        public async Task<Publisher> Edit(Publisher publisher)
        {
            return await _publisherService.Update(publisher);
        }

        // POST: Publisher/Delete/?id=5
        [HttpPost]
        public async Task<bool> Delete(int id)
        {
            return await _publisherService.Remove(id);
        }
    }
}
