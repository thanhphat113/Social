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
	public class RelationshipRepository : IRelationshipRepository
	{
		private readonly SocialMediaContext _context;
		public RelationshipRepository(SocialMediaContext context)
		{
			_context = context;
		}
		public async Task<bool> Accept(int user1, int user2)
		{
			var item = await _context.Relationships
					.FirstOrDefaultAsync(r =>
						(r.FromUserId == user1 && r.ToUserId == user2) ||
						(r.FromUserId == user2 && r.ToUserId == user1));

			if (item == null)
			{
				Console.WriteLine("Hình như là lỗi");
				return false;
			}

			item.TypeRelationship = 2;
			await _context.SaveChangesAsync();
			return true;
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

		public Task<IEnumerable<Relationship>> GetListById(int user)
		{
			throw new NotImplementedException();
		}

		public Task<bool> Update(Relationship value)
		{
			throw new NotImplementedException();
		}
	}
}