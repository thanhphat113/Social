using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class RequestNotiService : INotificationsRepository
	{
		private readonly INotificationsRepository _Repo;
		public RequestNotiService(INotificationsRepository Repo)
		{
			_Repo = Repo;
		}

		public async Task<bool> Accept(int user1, int user2)
		{
			try
			{
				return await _Repo.Accept(user1, user2);
			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return false;
			}
		}

		public Task<bool> Add(RequestNotification product)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> Delete(int id)
		{
			try
			{
				return await _Repo.Delete(id);
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
				return await _Repo.FindByUserId(id);
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

		public Task<IEnumerable<RequestNotification>> GetListByType(int condition, string type)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(RequestNotification product)
		{
			throw new NotImplementedException();
		}
	}
}