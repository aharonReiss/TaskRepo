using Application.Interfaces;
using Application.Models;
using Application.Services;
using Application.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace TaskManagmentAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> AddTask([FromBody] TaskModel taskReq)
        {
            try
            {
                string authorizationHeader = Request.Headers[HeaderNames.Authorization];
                long userId = JwtMethods.GetUserIdFromJWT(authorizationHeader);
                bool result = await _taskService.AddTask(taskReq, userId);
                return Ok(SystemMessages.TaskAdded);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(long id)
        {
            try
            {
                string authorizationHeader = Request.Headers[HeaderNames.Authorization];
                long userId = JwtMethods.GetUserIdFromJWT(authorizationHeader);
                await _taskService.DeleteTask(id,userId);
                return Ok(SystemMessages.DeleteTaskMessage + id.ToString());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskModel taskReq)
        {
            try
            {
                string authorizationHeader = Request.Headers[HeaderNames.Authorization];
                long userId = JwtMethods.GetUserIdFromJWT(authorizationHeader);
                await _taskService.UpdateTask(taskReq, userId);
                return Ok(SystemMessages.UpdateTaskMessage);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetTasksByUserId()
        {
            try
            {
                string authorizationHeader = Request.Headers[HeaderNames.Authorization];
                long userId = JwtMethods.GetUserIdFromJWT(authorizationHeader);
                List<Domain.Entities.Task> result = await _taskService.GetTaskByUserId(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
