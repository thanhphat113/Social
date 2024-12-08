using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.DTO;

using Backend.Repository.Interface;
using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;


namespace Backend.Services
{
	public class HistorySearchService : IHistorySearchService
	{
		private readonly IUnitOfWork _unit;
		private readonly IMapper _mapper;

		public HistorySearchService(IUnitOfWork unit, IMapper mapper)
		{
			_unit = unit;
			_mapper = mapper;
		}
		public async Task<HistorySearch> Add(HistorySearch value)
		{
			try
			{

				var Item = await _unit.HistorySearch.AddAsync(value);
				await _unit.CompleteAsync();
				return Item;
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
				Console.WriteLine("Trong delee: " + id);
				await _unit.HistorySearch.DeleteAsync(h => h.HistoryId == id);
				return await _unit.CompleteAsync();
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

		public async Task<IEnumerable<HistoryWithUser>> GetHistorySearchByUserId(int userid)
		{
			try
			{
				var items = await _unit.HistorySearch.FindAsync(query => query
							.Where(h => h.FromUserId == userid)
							.OrderByDescending(h => h.DateSearch)
							.Include(h => h.FromUser)
							.ProjectTo<HistoryWithUser>(_mapper.ConfigurationProvider));

				return items;
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

		public async Task<bool> UpdateTime(int FromUserId, int OtherUserId)
		{
			try
			{
				var item = await _unit.HistorySearch.GetByConditionAsync<HistorySearch>(query => query.Where(h => h.FromUserId == FromUserId && h.OtherUserId == OtherUserId));
				var vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
				var vietnamTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);

				item.DateSearch = vietnamTime;

				return await _unit.CompleteAsync();
			}
			catch (System.Exception ex)
			{
				Console.WriteLine("Lỗi: " + ex.Message);
				throw;
			}
		}
	}
}