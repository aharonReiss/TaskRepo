using Application.Models;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManagmentAPI.Models;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task<bool> AddUserAsync(RegistrationModel user);
        Task<string> Login(LoginModel user);
        Task<User> GetUserByUserId(long userId);
    }
}
