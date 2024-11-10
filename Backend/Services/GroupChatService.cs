using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class GroupChatService : IGroupChatRepository
	{
		private readonly IGroupChatRepository _repo;

		public GroupChatService(IGroupChatRepository repo)
		{
			_repo = repo;
		}
		public Task<GroupChat> Add(GroupChat value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<GroupChat>> FindByUserId(int UserId)
		{
			try
			{
				return await _repo.FindByUserId(UserId);
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