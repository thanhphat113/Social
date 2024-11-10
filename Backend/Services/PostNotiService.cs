using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class PostNotiService : IPostNotiRepository
	{
		private readonly IPostNotiRepository _repo;
		public PostNotiService(IPostNotiRepository repo)
		{
			_repo = repo;
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
				return await _repo.FindByUserId(userid); ;
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