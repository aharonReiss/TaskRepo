using Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ITaskService
    {
        Task<bool> AddTask(TaskModel task,long userId);
        Task<bool> DeleteTask(long taskId, long userId);
        Task<bool> UpdateTask(TaskModel task, long userId);
        Task<List<Domain.Entities.Task>> GetTaskByUserId(long userId);
    }
}
