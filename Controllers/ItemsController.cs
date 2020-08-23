using System;
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
        private readonly IItemContext _db;

        public ItemsController(IItemContext db): base()
        {
            _db = db;
        }

        // GET /api/items/
        // Return all items
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

        // GET /api/items/maxPrices
        // Return max prices for each item
        [HttpGet("maxPrices")]
        public async Task<IActionResult> GetMaxPrices()
        {
            try
            {
                // Equivalent of SELECT name, MAX(cost) FROM items GROUP BY name
                IQueryable<Item> items =
                    from item in _db.Items
                    group item by item.Name into g
                    select new Item
                    {
                        Name = g.Key,
                        Cost = g.Max(i => i.Cost)
                    };

                return Ok(await items.AsNoTracking().ToListAsync());
            }
            catch (Exception e)
            {
                Console.Error.WriteLine($"Server error: {e.Message}");
                return StatusCode(500);
            }
        }



        // GET /api/items/:name/maxPrice
        // Return the entry with the max price for the named item
        [HttpGet("{name}/maxPrice")]
        public async Task<IActionResult> GetMaxPriceForItem(string name)
        {
            try
            {
                // Equivalent of SELECT name, MAX(cost) FROM items WHERE name=@name GROUP BY name
                var maxCostItem = await
                    (from item in _db.Items
                    where item.Name == name
                    group item by item.Name into g
                    select new Item
                    {
                        Name = g.Key,
                        Cost = g.Max(i => i.Cost)
                    }).FirstOrDefaultAsync();

                if (maxCostItem == null)
                {
                    return NotFound(new { msg = "No items with that name found" });
                }
                return Ok(maxCostItem);
            }
            catch (Exception e)
            {
                Console.Error.WriteLine($"Server error: {e.Message}");
                return StatusCode(500);
            }
        }

        // GET /api/items/:id
        // Return item with id
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var item = await _db.Items.FirstOrDefaultAsync(item => item.ID == id);
                if (item == null)
                {
                    return NotFound(new { msg = "Item not found" });
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                return ServerError(ex);
            }
        }


        // POST /api/items/
        // Create an item
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Item item)
        {
            try
            {
                // Create the item
                var newItem = (await _db.Items.AddAsync(item)).Entity;
                await _db.SaveChangesAsync();

                // Return the new item w/ internal id (maybe return empty 200 if we dont need
                return Ok(newItem);
            }
            catch (Exception ex)
            {
                return ServerError(ex);
            }
        }

        // PUT /api/items/
        // Update and item
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Item item)
        {
            try
            {
                // Update the item with id
                var itemToUpdate = await _db.Items.FirstOrDefaultAsync(item => item.ID == id);
                if (itemToUpdate == null)
                {
                    return NotFound(new { msg = "Item not found" });
                }

                itemToUpdate.Name = item.Name;
                itemToUpdate.Cost = item.Cost;
                await _db.SaveChangesAsync();

                return Ok(itemToUpdate);
            }
            catch (Exception ex)
            {
                return ServerError(ex);
            }
        }

        // DELETE /api/items/
        // Delete an item
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Delete the item with id
                var item = await _db.Items.FirstOrDefaultAsync(item => item.ID == id);
                if (item == null)
                {
                    return NotFound(new { msg = "Item not found." });                
                }
                _db.Items.Remove(item);
                await _db.SaveChangesAsync();

                return Ok(await _db.Items.ToListAsync());

            }
            catch (Exception ex)
            {
                return ServerError(ex);
            }
        }

        private ActionResult ServerError(Exception ex = null)
        {
            Console.Error.WriteLine($"Server error: {ex?.Message ?? "<No error provided>"}");
            return StatusCode(500, new { msg = "Server error" });
        }
    }
}
