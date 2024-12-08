using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services.Interface
{
	public interface IGroupService : IService<UserGroup>
	{
		Task<dynamic> GetAllByCondition(int OffSet, int Limit);
		Task<dynamic> GetByName(string Name);
	}
}