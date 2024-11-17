using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

using Backend.Services.Interface;

namespace Backend.Services
{
	public class PostNotiService : IPostNotiService
	{
		private readonly IUnitOfWork _unit;
		public PostNotiService(IUnitOfWork unit)
		{
			_unit = unit;
		}

		public Task<PostNotification> Add(PostNotification product)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Add(RequestNotification product)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}


		public async Task<IEnumerable<Object>> FindByUserId(int userid)
		{
			try
			{
				var item = await _unit.PostNotification.FindAsync(p => p.Post.CreatedByUserId == userid, u => new
				{
					u.PostNotificationId,
					u.PostId,
					u.FromUser,
					u.Type,
					u.IsRead
				});
				return item;
			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return null;
			}
		}

		public Task<IEnumerable<PostNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<PostNotification> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<PostNotification>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(PostNotification product)
		{
			throw new NotImplementedException();
		}


	}
}