using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories;

namespace Backend.Repositories.Interface
{
	public interface IUserRepository : IRepository<User>
	{
		public Task<IEnumerable<User>> GetListFriends(int condition);

		public Task<User> FindToLogin(string email, string password);
		public Task<IEnumerable<Object>> GetUsersByName(string name);
		public Task<IEnumerable<User>> GetFriendByName(int userid, string name);
	}
}