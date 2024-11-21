using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;

using Backend.Services.Interface;


namespace Backend.Services
{
	public class RelationshipService
	{
		private readonly IUnitOfWork _unit;
		public RelationshipService(IUnitOfWork unit)
		{
			_unit = unit;
		}

		public Task<Relationship> Add(Relationship value)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Relationship>> GetAll()
		{
			throw new NotImplementedException();
		}

		public Task<Relationship> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Relationship>> GetListById(int userid)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(Relationship value)
		{
			throw new NotImplementedException();
		}
	}
}