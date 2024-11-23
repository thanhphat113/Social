using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
	public class MainTopicService : IService<MainTopic>
	{
		private readonly IUnitOfWork _unit;
		public MainTopicService(IUnitOfWork unit)
		{
			_unit = unit;
		}
		public Task<MainTopic> Add(MainTopic value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<IEnumerable<MainTopic>> GetAll()
		{
			return await _unit.MainTopic.GetAll();
		}

		public async Task<MainTopic> GetById(int id)
		{
			return await _unit.MainTopic.GetByIdAsync(id);
		}

		public Task<IEnumerable<MainTopic>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(MainTopic value)
		{
			throw new NotImplementedException();
		}
	}
}