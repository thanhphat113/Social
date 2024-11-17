using System.Linq.Expressions;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services.Interface;

namespace Backend.Services
{
	public class UserMediaService : IUserMediaService
	{
		private readonly IUnitOfWork _unit;
		public UserMediaService(IUnitOfWork unit)
		{
			_unit = unit;
		}
		public Task<UserMedia> Add(UserMedia value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<UserMedia>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<UserMedia> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<UserMedia>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(UserMedia value)
		{
			throw new NotImplementedException();
		}
	}
}