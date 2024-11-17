using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IRelationshipService : IService<Relationship>
	{
		Task<bool> Accept(int user1, int user2);
	}
}