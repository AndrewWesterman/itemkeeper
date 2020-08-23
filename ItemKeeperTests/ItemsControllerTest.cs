using ItemKeeper.Controllers;
using ItemKeeper.Data;
using ItemKeeper.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemKeeperTests
{
    [TestFixture]
    public class ItemsControllerTest
    {
        readonly List<Item> testData = new List<Item>()
        {
            new Item { Name = "Item1", Cost = 100},
            new Item { Name = "Item2", Cost = 200},
            new Item { Name = "Item1", Cost = 300},
        };

        private IItemContext GetInMemoryContext(bool useTestData = false)
        {
            var options = new DbContextOptionsBuilder<ItemContext>()
                     .UseInMemoryDatabase(Guid.NewGuid().ToString())
                     .Options;

            var context = new ItemContext(options);
            if (useTestData)
            {
                context.Items.AddRange(testData);
                context.SaveChanges();
            }

            return context;
        }

        [Test]
        public async Task GetReturnsOkWithItems()
        {
            var controller = new ItemsController(GetInMemoryContext());
            var result = await controller.Get();
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetMaxPricesReturnsOkWithItems()
        {
            var controller = new ItemsController(GetInMemoryContext());
            var result = await controller.GetMaxPrices();
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetMaxPriceForItemReturnsOkWithItems()
        {
            var controller = new ItemsController(GetInMemoryContext(true));
            var result = await controller.GetMaxPriceForItem(testData[0].Name);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task GetMaxPriceForItemReturnsNotFoundWithNoItems()
        {
            var controller = new ItemsController(GetInMemoryContext());
            var result = await controller.GetMaxPriceForItem(testData[0].Name);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task GetIdReturnsOkWhenItemExists()
        {
            var context = GetInMemoryContext(true);
            var controller = new ItemsController(context);
            var first = context.Items.FirstOrDefault();
            var result = await controller.Get(first.ID);
            Assert.IsInstanceOf<OkObjectResult>(result);
            context.Dispose();
        }

        [Test]
        public async Task GetIdReturnsNotFoundWhenItemDoesNotExist()
        {
            var controller = new ItemsController(GetInMemoryContext());
            var result = await controller.Get(1);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task PostItemReturnsOk()
        {
            var context = GetInMemoryContext();
            var controller = new ItemsController(context);
            var result = await controller.Post(new Item { Name = "test", Cost = 20 });
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task PutItemReturnsOkWhenIdExists()
        {
            var context = GetInMemoryContext(true);
            var controller = new ItemsController(context);
            var first = context.Items.First();
            var result = await controller.Put(first.ID, new Item { Name = "test", Cost = 20 });
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task PutItemReturnsNotFoundWhenIdDoesNotExist()
        {
            var context = GetInMemoryContext();
            var controller = new ItemsController(context);
            var result = await controller.Put(1, new Item { Name = "test", Cost = 20 });
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task DeleteItemReturnsOkWhenIdExists()
        {
            var context = GetInMemoryContext(true);
            var controller = new ItemsController(context);
            var first = context.Items.First();
            var result = await controller.Delete(first.ID);
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public async Task DeleteItemReturnsNotFoundWhenIdDoesNotExist()
        {
            var context = GetInMemoryContext();
            var controller = new ItemsController(context);
            var result = await controller.Delete(1);
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }
    }
}
