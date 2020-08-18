using ItemKeeper.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemKeeper.Data
{
    public class ItemContext: DbContext
    {
        public ItemContext(DbContextOptions<ItemContext> options): base(options) { 
        }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Item>().ToTable("item");
        }
    }
}
