using ItemKeeper.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ItemKeeper.Data
{
    public interface IItemContext : IDisposable
    {
        DatabaseFacade Database { get; }
        DbSet<Item> Items { get; set; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }

    public class ItemContext: DbContext, IItemContext
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
