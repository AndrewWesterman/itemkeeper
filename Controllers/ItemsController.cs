using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ItemKeeper.Data;
using ItemKeeper.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ItemKeeper.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private ItemContext _db;

        public ItemsController(ItemContext db): base()
        {
            _db = db;
        }

        // GET: api/<ItemController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var items = await _db.Items.ToListAsync();
                return Ok(items);
            }
            catch (Exception e)
            {
                Console.Error.WriteLine($"Server error: {e.Message}");
                return StatusCode(500);
            }
        }

        // GET api/<ItemController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            try
            {
                return $"value ${id}";
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST api/<ItemController>
        [HttpPost]
        public void Post([FromBody] Item item)
        {
            try
            {
                // Create the item
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/<ItemController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Item item)
        {
            try
            {
                // Update the item with id
            }
            catch (Exception)
            {

                throw;
            }
        }

        // DELETE api/<ItemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                // Delete the item with id
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
