using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Repositories.Interface
{
	public interface IRelationshipRepository : IRepository<Relationship>
	{
		Task<bool> Accept(int user1, int user2);
	}
}