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

        // kiem tra xem co ton tai trong bang relationship va bang friendrequest chua
        public async Task<bool> CheckExist(int fromUserId, int toUserId)
        {
            var exists = await _unit.Relationship.GetByConditionAsync<object>(
                x =>
                    (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
                    (x.FromUserId == toUserId && x.ToUserId == fromUserId)
            );

            if (exists != null)
                return true;

            var pendingRequest = await _unit.RequestNotification.GetByConditionAsync<object>(
                x => x.FromUserId == fromUserId && x.ToUserId == toUserId && x.IsAccept == null
            );

            return pendingRequest != null;
        }



        // tao moi 1 quan he
        public async Task<Relationship> Add(Relationship value)
        {
            try
            {
                var result = await _unit.Relationship.AddAsync(value);
                await _unit.CompleteAsync();
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to add relationship.", ex);
            }
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