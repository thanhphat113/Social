using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Repository.Interface;

using Backend.Services.Interface;


namespace Backend.Services
{
    public class RelationshipService : IRelationshipService
    {
        private readonly IUnitOfWork _unit;
        public RelationshipService(IUnitOfWork unit)
        {
            _unit = unit;
        }

        // kiem tra xem co ton tai trong bang relationship va bang friendrequest chua
        public async Task<bool> CheckExist(int fromUserId, int toUserId)
        {
            // Kiểm tra sự tồn tại trong bảng Relationship
            var exists = await _unit.Relationship.FindAsync<object>(query =>
                query.Where(x =>
                    (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
                    (x.FromUserId == toUserId && x.ToUserId == fromUserId)));

            if (exists.Any())
                return true;

            // Kiểm tra yêu cầu đang chờ xử lý trong bảng RequestNotification
            var pendingRequest = await _unit.RequestNotification.FindAsync<object>(query =>
                query.Where(x =>
                    x.FromUserId == fromUserId &&
                    x.ToUserId == toUserId &&
                    x.IsAccept == null));

            return pendingRequest.Any();
        }
        public async Task<int> CheckRelationshipType(int fromUserId, int toUserId)
        {
            // Truy vấn để lấy TypeRelationship
            var relationshipType = await _unit.Relationship.FindAsync<int?>(query =>
                query.Where(x =>
                    (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
                    (x.FromUserId == toUserId && x.ToUserId == fromUserId))
                    .Select(x => x.TypeRelationship));

            // Nếu có kết quả, trả về giá trị TypeRelationship; nếu không, trả về 0
            return relationshipType.FirstOrDefault() ?? 0;
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
            try
            {
                // Tìm các mối quan hệ cần xóa bằng cách sử dụng query
                var relationships = await _unit.Relationship.FindAsync<Relationship>(query =>
                    query.Where(x =>
                        (x.FromUserId == fromUserId && x.ToUserId == toUserId) ||
                        (x.FromUserId == toUserId && x.ToUserId == fromUserId)
                    ));

                // Nếu không tìm thấy quan hệ nào, trả về false
                if (!relationships.Any())
                    return false;

                // Xóa từng mối quan hệ tìm được
                foreach (var relationship in relationships)
                {
                    await _unit.Relationship.DeleteAsync(x => x.FromUserId == relationship.FromUserId && x.ToUserId == relationship.ToUserId);
                }

                // Lưu thay đổi
                var isDeleted = await _unit.CompleteAsync();
                return isDeleted;
            }
            catch (Exception ex)
            {
                // Ném ngoại lệ với thông tin chi tiết
                throw new Exception($"Failed to delete relationship between User {fromUserId} and User {toUserId}.", ex);
            }
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

        public Task<bool> Accept(int user1, int user2)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}