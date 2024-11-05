using Backend.Data;
using Backend.Models;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;

public class UserRepositories : IRepositories<User>
{
    private readonly SocialMediaContext _context;

    public UserRepositories(SocialMediaContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetAll()
    {
        try
        {
            return await _context.Users.ToListAsync();
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return new List<User>(); // Trả về danh sách rỗng khi có lỗi
        }
    }

    public async Task<List<User>> GetListById(int id)
    {
        try
        {
            throw new NotImplementedException();
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return new List<User>();
        }
    }

    public async Task<User> GetById(int id)
    {
        try
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id);
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return null; // Trả về null khi có lỗi
        }
    }

    public async Task<bool> Add(User user)
    {
        try
        {
            await _context.Users.AddAsync(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return false; // Trả về false khi có lỗi
        }
    }

    public async Task<bool> Delete(int id)
    {
        try
        {
            var user = await GetById(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<bool> Update(User user)
    {
        try
        {
            _context.Users.Update(user);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<User> GetUserByEmail(string email)
    {
        try
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return null; // Trả về null khi có lỗi
        }
    }

    public async Task<User> GetUserById(int id)
    {
        try
        {
            return await GetById(id);
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return null; // Trả về null khi có lỗi
        }
    }

    public async Task<bool> AddUser(User user)
    {
        try
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // Ghi log lỗi
            Console.WriteLine(ex.Message);
            return false;
        }
    }

    public async Task<bool> isHasEmail(string email)
    {
        try
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(p => p.Email == email);

            if (user != null)
            {
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.InnerException?.Message);
            return false;
        }
    }
}
