using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;
using Backend.Repositories.Interface;

namespace Backend.Repositories.Repository;
public class UserRepository : IUserRepository
{

	private readonly SocialMediaContext _context;
	public UserRepository(SocialMediaContext context)
	{
		_context = context;
	}

	public async Task<IEnumerable<User>> GetAll()
	{
		try
		{
			return await _context.Users.ToListAsync();
		}
		catch
		{
			return null;
		}
	}

	public async Task<IEnumerable<User>> GetListByType(int condition, string type)
	{
		throw new NotImplementedException();
	}

	public async Task<User> GetById(int id)
	{
		try
		{
			return await _context.Users.FirstOrDefaultAsync(p => id == p.UserId);
		}
		catch
		{
			return null;
		}
	}
	public async Task<bool> Add(User user)
	{
		try
		{
			var passHasher = new PasswordHasher<User>();
			user.Password = passHasher.HashPassword(user, user.Password);

			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();

			return true;
		}
		catch (Exception ex)
		{
			Console.WriteLine("Đây là lỗi: " + ex.Message);
			return false;
		}
	}
	public async Task<bool> Update(User value)
	{
		throw new NotImplementedException();
	}
	public async Task<bool> Delete(int id)
	{
		throw new NotImplementedException();
	}

	public async Task<User> FindToLogin(string email, string password)
	{

		try
		{
			var user = await _context.Users
				.FirstOrDefaultAsync(p => p.Email == email);

			if (user == null)
			{
				return null;
			}

			var passHasher = new PasswordHasher<User>();
			var passwordVerificationResult = passHasher.VerifyHashedPassword(user, user.Password, password);

			if (passwordVerificationResult == PasswordVerificationResult.Success)
			{
				return user;
			}
			else
			{
				return null;
			}
		}
		catch (Exception ex)
		{
			return null;
		}

	}

	public async Task<bool> IsHasEmail(string email)
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

	public async Task<IEnumerable<User>> GetListFriends(int condition)
	{
		return await _context.Relationships
				.Where(u => u.FromUserId == condition || u.ToUserId == condition)
				.Where(u => u.TypeRelationship == 2)
				.Select(u => u.FromUserId == condition ? u.ToUser : u.FromUser)
				.ToListAsync();
	}

	public async Task<IEnumerable<Object>> GetUsersByName(string name)
	{
		return await _context.Users.Where(u => u.FirstName.Contains(name) || u.LastName.Contains(name))
				.Select(u => new
				{
					u.UserId,
					u.LastName,
					u.FirstName,
					u.ProfilePicture,
					u.GenderId
				})
				.ToListAsync();
	}
}