using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ItemKeeper.Models
{
    public class Item
    {
        [Column("id")]
        public int ID { get; set; }

        [Column("name"), MaxLength(50), Required]
        public string? Name { get; set; }

        [Column("cost"), Required]
        public int? Cost { get; set; }
    }
}
