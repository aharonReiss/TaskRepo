using Application.Interfaces;
using Application.Models;
using Application.Services;
using Application.Utils;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManagmentAPI.Models;

namespace TaskManagmentAPI.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private IConfiguration _config;
        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }
        [HttpPost]
        [Route("registration")]
        public async Task<IActionResult> AddUser([FromBody] RegistrationModel userReq)
        {
            try
            {   
                var userCreated = await _userService.AddUserAsync(userReq);
                return Ok("יוזר נוצר בהצלחה");
            }
            catch (Exception ex)    
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginReq)
        {
            try
            {
                string userAuthenticate = await _userService.Login(loginReq);
                return Ok(userAuthenticate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpGet]
        [Route("getCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                string authorizationHeader = Request.Headers[HeaderNames.Authorization];
                long userId = JwtMethods.GetUserIdFromJWT(authorizationHeader);
                User user = await _userService.GetUserByUserId(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
