using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repository.Interface;

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
            //var exists = await _unit.Relationship.GetByConditionAsync<object>(
            //    x =>
            //        (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
            //        (x.FromUserId == toUserId && x.ToUserId == fromUserId)
            //);

            //if (exists != null)
            //    return true;

            //var pendingRequest = await _unit.RequestNotification.GetByConditionAsync<object>(
            //    x => x.FromUserId == fromUserId && x.ToUserId == toUserId && x.IsAccept == null
            //);

            //return pendingRequest != null;
            return true;
        }
        public async Task<int> CheckRelationshipType(int fromUserId, int toUserId)
        {
            //// Lấy quan hệ dựa trên điều kiện FromUserId và ToUserId
            //var relationship = await _unit.Relationship.GetByConditionAsync<Relationship>(
            //    x =>
            //        (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
            //        (x.FromUserId == toUserId && x.ToUserId == fromUserId)
            //);

            //// Nếu tồn tại, trả về TypeRelationship; nếu không, trả về 0 (mặc định không có quan hệ)
            //return relationship?.TypeRelationship ?? 0;
            return 0;
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
        public async Task<bool> Delete(int fromUserId, int toUserId)
        {
            //try
            //{
            //    // Tìm mối quan hệ giữa hai người dùng
            //    var relationship = await _unit.Relationship.GetByConditionAsync<Relationship>(
            //        x =>
            //            (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
            //            (x.FromUserId == toUserId && x.ToUserId == fromUserId)
            //    );

            //    if (relationship == null)
            //        return false;

            //    // Sử dụng DeleteAsync để xóa
            //    await _unit.Relationship.DeleteAsync(x =>
            //        (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
            //        (x.FromUserId == toUserId && x.ToUserId == fromUserId)
            //    );

            //    // Hoàn tất và kiểm tra kết quả
            //    bool isDeleted = await _unit.CompleteAsync();
            //return isDeleted;
            //}
            //catch (Exception ex)
            //{
            //    // Bảo toàn thông tin lỗi gốc
            //    throw new Exception($"Failed to delete relationship between User {fromUserId} and User {toUserId}.", ex);
            //}
            return true;
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