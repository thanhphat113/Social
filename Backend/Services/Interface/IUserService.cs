using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services.Interface
{
	public interface IUserService : IService<User>
	{
		Task<ValidateEmail> IsHasEmail(string email);
		Task<IEnumerable<UserPrivate>> GetFriends(int id);
		Task<User> FindToLogin(string email, string password);

		Task<UserLogin> GetLoginById(int id);
		Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId);
	}
}