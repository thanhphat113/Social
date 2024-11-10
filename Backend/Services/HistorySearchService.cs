using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

namespace Backend.Services
{
	public class HistorySearchService : IHistorySearchRepository
	{
		private readonly IHistorySearchRepository _repo;

		public HistorySearchService(IHistorySearchRepository repo)
		{
			_repo = repo;
		}
		public async Task<HistorySearch> Add(HistorySearch value)
		{
			try
			{
				return await _repo.Add(value);
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}

		public async Task<bool> Delete(int id)
		{
			try
			{
				return await _repo.Delete(id);
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}

		public Task<IEnumerable<HistorySearch>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<HistorySearch> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<object>> GetHistorySearchByUserId(int userid)
		{
			try
			{
				return await _repo.GetHistorySearchByUserId(userid);
			}
			catch (System.Exception)
			{
				throw;
			}
		}

		public Task<IEnumerable<HistorySearch>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(HistorySearch value)
		{
			throw new NotImplementedException();
		}

		public async Task<bool> UpdateTime(int historyid)
		{
			try
			{
				return await _repo.UpdateTime(historyid);
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}
	}
}