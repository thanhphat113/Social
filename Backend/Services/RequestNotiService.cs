using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

using Backend.Services.Interface;

namespace Backend.Services
{
	public class RequestNotiService : INotificationsService
	{
		private readonly IUnitOfWork _unit;
		public RequestNotiService(IUnitOfWork unit)
		{
			_unit = unit;
		}

		public async Task<bool> Accept(int user1, int user2)
		{
			try
			{
				var item = await _unit.RequestNotification.GetByConditionAsync<RequestNotification>(r =>
							(r.FromUserId == user1 && r.ToUserId == user2) ||
					 		(r.FromUserId == user2 && r.ToUserId == user1));
				if (item == null) return false;

				item.IsAccept = true;
				item.IsRead = true;

				var relation = await _unit.Relationship.GetByConditionAsync<Relationship>(r =>
							(r.FromUserId == user1 && r.ToUserId == user2) ||
					 		(r.FromUserId == user2 && r.ToUserId == user1));

				relation.TypeRelationship = 2;

				return await _unit.CompleteAsync();
			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return false;
			}
		}

		public Task<RequestNotification> Add(RequestNotification product)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> Delete(int id)
		{
			try
			{
				_unit.RequestNotification.DeleteAsync(r => r.NotificationId == id);
				return await _unit.CompleteAsync();
			}
			catch
			{
				Console.WriteLine("Lỗi rầu");
				return false;
			}
		}

		public async Task<IEnumerable<Object>> FindByUserId(int id)
		{
			try
			{
				var items = await _unit.RequestNotification.FindAsync(r => r.ToUserId == id, u => new
				{
					u.FromUser.UserId,
					u.FromUser.LastName,
					u.FromUser.FirstName,
					u.FromUser.GenderId,
					u.IsAccept,
					u.NotificationId,
					u.IsRead
				});
				return items;
			}
			catch
			{
				return null;
			}
		}

		public Task<IEnumerable<RequestNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<RequestNotification> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<RequestNotification>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(RequestNotification product)
		{
			throw new NotImplementedException();
		}
	}
}