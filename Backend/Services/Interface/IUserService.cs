using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTO;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Services.Interface
{
	public interface IUserService : IService<User>
	{
		Task<bool> ChangePassword(int id, string oldPassword, string newPassword);

		Task<UserPrivate> FindById(int id);

		Task<ValidateEmail> IsHasEmail(string email);
		Task<IEnumerable<UserPrivate>> GetFriends(int id);
		Task<User> FindToLogin(string email, string password);
		Task<UserLogin> GetLoginById(int id);
		Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId);
		Task<UserPrivate> GetUserById(int id);

	}
}