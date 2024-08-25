using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string FullName { get; set; }
        public string Telephone { get; set; }
        [Required]
        public string EmailAdress { get; set; }
        [Required]
        public string Password { get; set; }

    }
}
