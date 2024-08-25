using Application.Interfaces;
using Application.Models;
using Application.Utils;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TaskManagmentAPI.Models;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;
        private readonly IValidationService _validationService;
        public UserService(IUserRepository userRepository, IConfiguration config,IValidationService validationService)
        {
            _config = config;
            _userRepository = userRepository;
            _validationService = validationService;
        }
        public async Task<bool> AddUserAsync(RegistrationModel user)
        {
            try
            {
                if (!_validationService.ValidEmail(user.EmailAdress))
                    throw new Exception(SystemMessages.WrongMail);
                if (!_validationService.ValidPassword(user.Password))
                    throw new Exception(SystemMessages.WrongPassword);
                if (!_validationService.ValidTelephone(user.Telephone))
                    throw new Exception(SystemMessages.WrongThelephoneNumber);
                if (!_validationService.ThereIsValue(user.FullName))
                    throw new Exception(SystemMessages.WrongFullName);
                User userFromDb = await _userRepository.GetUserByEmail(user.EmailAdress);
                if (userFromDb != null)
                    throw new Exception(SystemMessages.UserAlreadyExist);
                User newUser = new User() { EmailAdress = user.EmailAdress,FullName = user.FullName,Password = Cryptor.MD5Encrypt(user.Password),Telephone = user.Telephone };
                return await _userRepository.AddUser(newUser);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task<User> GetUserByUserId(long userId)
        {
            User userFromDb = await _userRepository.GetUserById(userId);
            if(userFromDb != null)
            {
                return userFromDb;
            }
            throw new Exception("יוזר לא קיים");
        }
        public async Task<string> Login(LoginModel user)
        {
            User userFromDb = await _userRepository.GetUserByEmail(user.EmailAdress);
            if(userFromDb != null && Cryptor.MD5Encrypt(user.Password) == userFromDb.Password)
            {
                string token = JwtMethods.GenerateToken(userFromDb.Id.ToString(), _config["Jwt:Issuer"], _config["Jwt:Key"]);
                return token;
            }
            throw new Exception(SystemMessages.AuthenticationProcessFailed);
        }
    }
}
