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

        // doi a bia 
        public async Task<bool> ChangeCover(int userId, int mediaId)
        {
            try
            {
                // Kiểm tra người dùng tồn tại
                var user = await _unit.Users.GetByConditionAsync<User>(x => x.UserId == userId);
                if (user == null)
                    return false;

                // Kiểm tra media thuộc về người dùng
                var media = await _unit.UserMedia.GetByConditionAsync<UserMedia>(
                    x => x.UserId == userId && x.MediaId == mediaId
                );

                if (media == null)
                    return false; // Media không thuộc về user

                // Hủy ảnh bìa hiện tại nếu có
                var currentCover = await _unit.UserMedia.GetByConditionAsync<UserMedia>(
                    x => x.UserId == userId && x.IsCoverPicture == true
                );

                if (currentCover != null)
                {
                    currentCover.IsCoverPicture = false;
                    _unit.UserMedia.UpdateAsync(currentCover);
                }

                // Đặt media mới làm ảnh bìa
                media.IsCoverPicture = true;
                _unit.UserMedia.UpdateAsync(media);

                // Lưu thay đổi
                return await _unit.CompleteAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine("Lỗi: " + e.Message);
                return false;
            }
        }

    }
}