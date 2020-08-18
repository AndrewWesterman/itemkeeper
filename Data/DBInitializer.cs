using ItemKeeper.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemKeeper.Data
{
    public static class DBInitializer
    {
        public static void Initialize(ItemContext context)
        {
            context.Database.EnsureCreated();
            if (context.Items.Any())
            {
                return;
            }

            // Seed with items.txt data
            var items = new Item[]
            {
                new Item{Name="ITEM 1", Cost=100},
                new Item{Name="ITEM 2", Cost=200},
                new Item{Name="ITEM 1", Cost=250},
                new Item{Name="ITEM 3", Cost=300},
                new Item{Name="ITEM 4", Cost=50},
                new Item{Name="ITEM 4", Cost=40},
                new Item{Name="ITEM 2", Cost=200},
            };

            context.Items.AddRange(items);
            context.SaveChanges();
        }
    }
}
