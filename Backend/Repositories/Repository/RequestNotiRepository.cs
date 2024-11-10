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
	public class RequestNotiRepository : INotificationsRepository
	{
		private readonly SocialMediaContext _context;
		public RequestNotiRepository(SocialMediaContext context)
		{
			_context = context;
		}

		public async Task<bool> Accept(int user1, int user2)
		{
			var item = await _context.RequestNotifications
				.FirstOrDefaultAsync(r =>
					 (r.FromUserId == user1 && r.ToUserId == user2) ||
					 (r.FromUserId == user2 && r.ToUserId == user1));

			if (item == null) return false;

			item.IsAccept = true;
			item.IsRead = true;

			await _context.SaveChangesAsync();
			return true;
		}

		public Task<RequestNotification> Add(RequestNotification value)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> Delete(int id)
		{
			Console.WriteLine("Đây mã cần xoá:" + id);
			var item = await GetById(id);

			if (item == null)
			{
				Console.WriteLine("Tìm không thấy");
				return false;
			}

			_context.RequestNotifications.Remove(item);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<IEnumerable<Object>> FindByUserId(int id)
		{
			return await _context.RequestNotifications
					.Where(u => u.ToUserId == id)
					.Select(u => new
					{
						u.FromUser.UserId,
						u.FromUser.LastName,
						u.FromUser.FirstName,
						u.FromUser.GenderId,
						u.FromUser.ProfilePicture,
						u.IsAccept,
						u.NotificationId,
						u.IsRead
					})
					.ToListAsync();
		}

		public Task<IEnumerable<RequestNotification>> GetAll()
		{
			throw new NotImplementedException();
		}

		public async Task<RequestNotification> GetById(int id)
		{
			return await _context.RequestNotifications
				.FirstOrDefaultAsync(r => r.NotificationId == id);
		}

		public Task<IEnumerable<RequestNotification>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(RequestNotification value)
		{
			throw new NotImplementedException();
		}

	}
}