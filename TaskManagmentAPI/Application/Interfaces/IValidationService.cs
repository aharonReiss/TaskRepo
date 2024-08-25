using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IValidationService
    {
        bool ValidEmail(string mail);
        bool ValidPassword(string password);
        bool ValidTelephone(string telephone);
        bool ValidDueDate(DateTime date);
        bool ValidPriority(int priority);
        bool ThereIsValue(string input);
    }
}
