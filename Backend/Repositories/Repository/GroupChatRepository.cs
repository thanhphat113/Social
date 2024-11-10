using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories.Repository
{
	public class GroupChatRepository : IGroupChatRepository
	{
		private readonly SocialMediaContext _context;
		public GroupChatRepository(SocialMediaContext context)
		{
			_context = context;
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
			var result = await _context.GroupChats
					.Where(g => g.Users.Any(u => u.UserId == UserId))
					.ToListAsync();

			Console.WriteLine("Đây là userid:" + UserId);

			foreach (var item in result)
			{
				Console.WriteLine("Đây là: " + item.GroupChatName);
			}

			return result;

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