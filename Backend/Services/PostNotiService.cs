using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repository.Interface;

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
				var item = await _unit.PostNotification.FindAsync(query => query
									.Where(p => p.Post.CreatedByUserId == userid)
									.Select(u => new
									{
										u.PostNotificationId,
										u.PostId,
										u.FromUser,
										u.Type,
										u.IsRead
									}));
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
			try
			{
				var item = _unit.PostNotification.GetByIdAsync(id);
				return item;

			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return null;
			}

		}

		public Task<IEnumerable<PostNotification>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(PostNotification product)
		{
			throw new NotImplementedException();
		}

		// update isread
		public async Task<bool> UpdateIsRead(int PostNotificationId)
		{
			try
			{
				Console.WriteLine("Service PostNotificationId: " + PostNotificationId);
				var item = await _unit.PostNotification.GetByIdAsync(PostNotificationId);

				if (item == null)
				{
					return false;
				}
				item.IsRead = true;
				_unit.PostNotification.UpdateAsync(item);
				return await _unit.CompleteAsync();


			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return false;
			}
		}
	}
}