using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{   
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return true;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            User userFromDb = _context.Users.FirstOrDefault(u => u.EmailAdress == email);
            return userFromDb;
        }

        public async Task<User> GetUserById(long Id)
        {
            User userFromDb = _context.Users.FirstOrDefault(u => u.Id == Id);
            return userFromDb;
        }
    }
}
