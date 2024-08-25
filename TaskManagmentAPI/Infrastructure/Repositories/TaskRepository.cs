using Application.Interfaces;
using Application.Models;
using Application.Utils;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{   
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _context;
        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AddTask(Domain.Entities.Task task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteTask(long taskId,long userId)
        {
            Domain.Entities.Task task = _context.Tasks.FirstOrDefault(t => t.Id == taskId && t.User.Id == userId);
            if(task != null)
            {
                _context.Tasks.Remove(task);
                _context.SaveChanges();
                return true;
            }
            throw new Exception(SystemMessages.TaskNotExist);
        }

        public async Task<List<Domain.Entities.Task>> GetListTasksByUserId(long userId)
        {
            List<Domain.Entities.Task> tasks = _context.Tasks.Where(t => t.User.Id == userId).ToList();
            return tasks;
        }

        public async Task<bool> UpdateTask(TaskModel task,long userId)
        {
            Domain.Entities.Task taskFromDb = _context.Tasks.FirstOrDefault(t => t.Id == task.TaskId && t.User.Id == userId);
            if (task.DueDate != taskFromDb.DueDate && task.DueDate < DateTime.Now)
                throw new Exception(SystemMessages.WrongTaskPriority);
            if(task != null)
            {
                taskFromDb.Title = task.Title;
                taskFromDb.Description = task.Description;
                taskFromDb.DueDate = task.DueDate;
                taskFromDb.Priority = task.Priority;
                _context.SaveChanges();
                return true;
            }
            throw new Exception(SystemMessages.TaskNotExist);
        }
    }
}
