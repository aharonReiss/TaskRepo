using Application.Interfaces;
using Application.Models;
using Application.Utils;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IUserRepository _userRepository;
        private readonly IValidationService _validationService;
        public TaskService(ITaskRepository taskRepository, IUserRepository userRepository, IValidationService validationService)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
            _validationService = validationService;
        }
        public async Task<bool> AddTask(TaskModel task,long userId)
        {   
            try
            {
                User user = await _userRepository.GetUserById(userId);
                if(user != null)
                {
                    if (!_validationService.ThereIsValue(task.Title))
                        throw new Exception(SystemMessages.WrongTaskTitle);
                    if (!_validationService.ThereIsValue(task.Description))
                        throw new Exception(SystemMessages.WrongTaskDescription);
                    if (!_validationService.ValidDueDate(task.DueDate))
                        throw new Exception(SystemMessages.WrongTaskDueDate);
                    if(!_validationService.ValidPriority(task.Priority))
                        throw new Exception(SystemMessages.WrongTaskPriority);
                    Domain.Entities.Task newTask = new Domain.Entities.Task
                    {
                        Description = task.Description,
                        Priority = task.Priority,
                        DueDate = task.DueDate,
                        Title = task.Title,
                        User = user
                    };
                    _taskRepository.AddTask(newTask);
                    return true;
                }
                throw new Exception(SystemMessages.TaskAddFailed);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        public async Task<bool> DeleteTask(long taskId,long userId)
        {
            await _taskRepository.DeleteTask(taskId,userId);
            return true;
        }
        public async Task<List<Domain.Entities.Task>> GetTaskByUserId(long userId)
        {
            List<Domain.Entities.Task> tasks = await _taskRepository.GetListTasksByUserId(userId);
            return tasks;
        }
        public async Task<bool> UpdateTask(TaskModel task,long userId)
        {
            if (!_validationService.ThereIsValue(task.Title))
                throw new Exception(SystemMessages.WrongTaskTitle);
            if (!_validationService.ThereIsValue(task.Description))
                throw new Exception(SystemMessages.WrongTaskDescription);
            if (!_validationService.ValidPriority(task.Priority))
                throw new Exception(SystemMessages.WrongTaskPriority);
            bool result = await _taskRepository.UpdateTask(task, userId);
            return result;
        }
    }
}
