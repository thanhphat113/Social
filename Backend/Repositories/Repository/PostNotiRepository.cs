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
	public class PostNotiRepository : IPostNotiRepository
	{
		private readonly SocialMediaContext _context;
		public PostNotiRepository(SocialMediaContext context)
		{
			_context = context;
		}

		public Task<bool> Add(PostNotification value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<object>> FindByUserId(int userid)
		{
			return await _context.PostNotifications
					.Where(u => u.Post.CreatedByUserId == userid)
					.Select(u => new
					{
						u.PostNotificationId,
						u.PostId,
						u.FromUser.UserId,
						u.FromUser.LastName,
						u.FromUser.FirstName,
						u.FromUser.GenderId,
						u.FromUser.ProfilePicture,
						u.Type,
						u.IsRead
					})
					.ToListAsync();
		}

		public Task<IEnumerable<PostNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<PostNotification> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<PostNotification>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(PostNotification value)
		{
			throw new NotImplementedException();
		}
	}
}