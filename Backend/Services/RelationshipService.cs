using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Services;

namespace Backend.Services
{
	public class RelationshipService : IRelationshipRepository
	{
		private readonly IRelationshipRepository _repo;
		public RelationshipService(IRelationshipRepository repo)
		{
			_repo = repo;
		}
		public async Task<bool> Accept(int user1, int user2)
		{
			try
			{
				return await _repo.Accept(user1, user2);
			}
			catch (Exception e)
			{
				Console.WriteLine("Lỗi: " + e.Data);
				return false;
			}
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