using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Abstractions;

namespace crud_dotnet_api.Data
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbcontext;
        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbcontext = appDbContext; // Initialize the _appDbcontext field
        }
        public async Task AddEmployeeAsync(Employee employee)
        {
            await _appDbcontext.Set<Employee>().AddAsync(employee);
            await _appDbcontext.SaveChangesAsync();
        }
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _appDbcontext.Employees.ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _appDbcontext.Employees.FindAsync(id);
        }

        public async Task UpdateEmployeeAsync(int id, Employee model)
        {
            //var employee = await _appDbcontext.Employees.FindAsync(id); //Find employee of given id either exists or not.
            //if(employee == null)
            //{
            //    throw new Exception("Employee isn't exist");
            //}
            ////Name
            //if(model.Name == null)
            //{
            //    employee.Name = employee.Name;
            //}
            //else
            //{
            //    employee.Name = model.Name;
            //}

            ////Email
            //if(model.Email == null)
            //{
            //    employee.Email = employee.Email;    
            //}
            //else
            //{
            //    employee.Email = model.Email;
            //}

            ////Phone
            //if (model.Phone == null)
            //{
            //   employee.Phone = employee.Phone;
            //}
            //else
            //{
            //    employee.Phone = model.Phone;
            //}

            ////Age
            //if(model.Age == 0)
            //{
            //    employee.Age = employee.Age;
            //}
            //else
            //{
            //    employee.Age = model.Age;
            //}

            ////Salary
            //if(employee.Salary == 0)
            //{
            //    employee.Salary = employee.Salary;
            //}
            //else
            //{
            //    employee.Salary = model.Salary;
            //}

            //employee.Phone = model.Phone;
            //employee.Age = model.Age;
            //employee.Email = model.Email; // -->we willnot update email because we dont want to user update his'/her emailid so it's readonly.
            //employee.Salary = model.Salary;

            var employee = await _appDbcontext.Employees.FindAsync(id); // Find employee of given id either exists or not.
            if (employee == null)
            {
                throw new Exception("Employee doesn't exist");
            }

            // Use null-coalescing operator to simplify the property updates
            employee.Name = model.Name ?? employee.Name;
            employee.Email = model.Email ?? employee.Email;
            employee.Phone = model.Phone ?? employee.Phone;
            employee.Age = model.Age != 0 ? model.Age : employee.Age;
            employee.Salary = model.Salary != 0 ? model.Salary : employee.Salary;

            await _appDbcontext.SaveChangesAsync();
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await _appDbcontext.Employees.FindAsync(id); //Find employee of given id either exists or not.
            if (employee == null)
            {
                throw new Exception("Employee isn't exist");
            }
            _appDbcontext.Employees.Remove(employee);
            await _appDbcontext.SaveChangesAsync();
        }
    }
}
