using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

using Backend.Services.Interface;

namespace Backend.Services
{
	public class GroupChatService
	{
		private readonly IUnitOfWork _unit;

		public GroupChatService(IUnitOfWork unit)
		{
			_unit = unit;
		}
		public Task<GroupChat> Add(GroupChat value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<Object>> FindByUserId(int UserId)
		{
			try
			{
				return await _unit.GroupChat.FindAsync<object>(g => g.Users.Any(u => u.UserId == UserId));
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi đây nè: " + ex);
				throw;
			}
		}

		public Task<IEnumerable<GroupChat>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<GroupChat> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<GroupChat>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(GroupChat value)
		{
			throw new NotImplementedException();
		}
	}
}