using Backend.Controllers;
using Backend.Models;
using Backend.Repository.Interface;
using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services
{

	public class MediaService : IService<Media>
	{
		private readonly IUnitOfWork _unit;
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly IWebHostEnvironment  _hostEnvironment;

		public MediaService(IUnitOfWork unit, IHttpContextAccessor httpContextAccessor, IWebHostEnvironment hostEnvironment)
		{
			_unit = unit;
            _httpContextAccessor = httpContextAccessor;
            _hostEnvironment = hostEnvironment;
        }

		public Task<bool> Delete(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Media>> GetAll()
		{
			throw new NotImplementedException();
		}

		public string GetFullSrc(string value, string? type = "media")
		{
			return $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}/{type}/{value}";
		}


        //public async Task<bool> ChangeProfilePicture(int userId, IFormFile newProfilePicture)
        //{
        //    try
        //    {
        //        Console.WriteLine("Step 1: Checking environment paths...");
        //        if (string.IsNullOrEmpty(_hostEnvironment.WebRootPath))
        //            throw new InvalidOperationException("WebRootPath is not set.");

        //        var mediaPath = Path.Combine(_hostEnvironment.WebRootPath, "media");

        //        // Tạo thư mục nếu chưa tồn tại
        //        if (!Directory.Exists(mediaPath))
        //        {
        //            Console.WriteLine("Step 2: Media folder does not exist. Creating folder...");
        //            Directory.CreateDirectory(mediaPath);
        //        }

        //        Console.WriteLine("Step 3: Validating user...");
        //        var user = await _unit.Users.GetByConditionAsync<User>(x => x.UserId == userId);
        //        if (user == null)
        //        {
        //            Console.WriteLine($"Step 3.1: User with ID {userId} not found.");
        //            return false;
        //        }

        //        Console.WriteLine("Step 4: Checking for old profile picture...");
        //        var oldProfileMedia = await _unit.UserMedia.GetByConditionAsync<UserMedia>(
        //            x => x.UserId == userId && x.IsProfilePicture == true
        //        );

        //        if (oldProfileMedia != null)
        //        {
        //            Console.WriteLine("Step 5: Old profile picture found. Deleting...");
        //            var oldMedia = await _unit.Media.GetByConditionAsync<Media>(x => x.MediaId == oldProfileMedia.MediaId);

        //            if (oldMedia != null)
        //            {
        //                var oldFilePath = Path.Combine(mediaPath, oldMedia.Src);
        //                Console.WriteLine($"Step 5.1: Deleting old media file at {oldFilePath}...");
        //                if (File.Exists(oldFilePath))
        //                {
        //                    File.Delete(oldFilePath);
        //                }

        //                Console.WriteLine("Step 5.2: Deleting old media and user-media records...");
        //                await _unit.Media.DeleteAsync(m => m.MediaId == oldMedia.MediaId);
        //                await _unit.UserMedia.DeleteAsync(um => um.UserId == userId && um.MediaId == oldMedia.MediaId);
        //            }
        //        }
        //        else
        //        {
        //            Console.WriteLine("Step 5: No old profile picture found.");
        //        }

        //        Console.WriteLine("Step 6: Saving new profile picture...");
        //        var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(newProfilePicture.FileName)}";
        //        var filePath = Path.Combine(mediaPath, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            Console.WriteLine($"Step 6.1: Writing file to path {filePath}...");
        //            await newProfilePicture.CopyToAsync(stream);
        //        }

        //        Console.WriteLine("Step 7: Creating new media record...");
        //        var newMedia = new Media
        //        {
        //            Src = fileName,
        //            MediaType = 1, // Giả định loại ảnh
        //            HashCode = Guid.NewGuid().ToString() // Có thể thêm cơ chế hash code cụ thể
        //        };

        //        await _unit.Media.AddAsync(newMedia);
        //        await _unit.CompleteAsync();

        //        Console.WriteLine("Step 8: Creating new user-media record...");
        //        var newUserMedia = new UserMedia
        //        {
        //            UserId = userId,
        //            MediaId = newMedia.MediaId,
        //            IsProfilePicture = true,
        //            IsCoverPicture = false
        //        };

        //        await _unit.UserMedia.AddAsync(newUserMedia);
        //        return await _unit.CompleteAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error changing profile picture: {ex.Message}");
        //        Console.WriteLine($"StackTrace: {ex.StackTrace}");
        //        return false;
        //    }
        //}



        //public async Task<bool> ChangeCoverPhoto(int userId, IFormFile newCoverPhoto)
        //{
        //    try
        //    {
        //        // Kiểm tra đường dẫn thư mục lưu ảnh
        //        if (string.IsNullOrEmpty(_hostEnvironment.WebRootPath))
        //            throw new InvalidOperationException("WebRootPath is not set.");

        //        var mediaPath = Path.Combine(_hostEnvironment.WebRootPath, "media");

        //        // Tạo thư mục nếu chưa tồn tại
        //        if (!Directory.Exists(mediaPath))
        //        {
        //            Directory.CreateDirectory(mediaPath);
        //        }

        //        // Kiểm tra người dùng tồn tại
        //        var user = await _unit.Users.GetByConditionAsync<User>(x => x.UserId == userId);
        //        if (user == null)
        //            return false;

        //        // Xóa ảnh bìa cũ (nếu có)
        //        var oldCoverMedia = await _unit.UserMedia.GetByConditionAsync<UserMedia>(
        //            x => x.UserId == userId && x.IsCoverPicture == true
        //        );

        //        if (oldCoverMedia != null)
        //        {
        //            // Xóa file ảnh cũ
        //            var oldMedia = await _unit.Media.GetByConditionAsync<Media>(x => x.MediaId == oldCoverMedia.MediaId);
        //            if (oldMedia != null)
        //            {
        //                var oldFilePath = Path.Combine(mediaPath, oldMedia.Src);
        //                if (File.Exists(oldFilePath))
        //                {
        //                    File.Delete(oldFilePath);
        //                }

        //                // Xóa media và user_media record
        //                await _unit.Media.DeleteAsync(m => m.MediaId == oldMedia.MediaId);
        //                await _unit.UserMedia.DeleteAsync(um => um.UserId == userId && um.MediaId == oldMedia.MediaId);
        //            }
        //        }

        //        // Lưu ảnh mới
        //        var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(newCoverPhoto.FileName)}";
        //        var filePath = Path.Combine(mediaPath, fileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await newCoverPhoto.CopyToAsync(stream);
        //        }

        //        // Tạo record mới trong bảng Media
        //        var newMedia = new Media
        //        {
        //            Src = fileName,
        //            MediaType = 1, // Giả định loại ảnh
        //            HashCode = Guid.NewGuid().ToString() // Có thể thêm cơ chế hash code cụ thể
        //        };

        //        await _unit.Media.AddAsync(newMedia);
        //        await _unit.CompleteAsync();

        //        // Tạo record mới trong bảng UserMedia
        //        var newUserMedia = new UserMedia
        //        {
        //            UserId = userId,
        //            MediaId = newMedia.MediaId,
        //            IsProfilePicture = false,
        //            IsCoverPicture = true
        //        };

        //        await _unit.UserMedia.AddAsync(newUserMedia);
        //        return await _unit.CompleteAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error changing cover photo: {ex.Message}");
        //        return false;
        //    }
        //}





        //      public async Task<Media> FindProfilePictureByUserId(int UserId)
        //{
        //	var UserMedia = await _unit.UserMedia.GetByConditionAsync<UserMedia>(u => u.UserId == UserId && u.IsProfilePicture == true);
        //	if (UserMedia == null) return null;
        //	var item = await _unit.Media.GetByConditionAsync<Media>(m => m.MediaId == UserMedia.MediaId);
        //	item.Src = GetFullSrc(item.Src);

        // 	return item;
        // }

        // public async Task<Media> FindCoverPictureByUserId(int UserId)
        // {
        // 	var UserMedia = await _unit.UserMedia.GetByConditionAsync<UserMedia>(u => u.UserId == UserId && u.IsCoverPicture == true);
        // 	if (UserMedia == null) return null;
        // 	return await _unit.Media.GetByConditionAsync<Media>(m => m.MediaId == UserMedia.MediaId);
        // }

        public async Task<IEnumerable<Media>> FindByUserId(int UserId)
		{
			return await _unit.Users.FindAsync<Media>(query => query
						.Where(u => u.UserId == UserId)
						.SelectMany(u => u.Posts.SelectMany(p => p.Medias))
						);
		}

		public async Task<IEnumerable<Media>> FindByMessageId(int MessageId, string? type = "media")
		{
			if (MessageId <= 0) throw new ArgumentException("Mã đoạn chat không hợp lệ");
			try
			{
				var item = await _unit.Message
						.FindAsync(query => query.Where(m => m.MessagesId == MessageId)
						.SelectMany(m => m.ChatInMessages)
						.Where(m => m.MediaId != null)
						.Include(m => m.Media)
						.Where(cm => cm.Media.MediaType == 1 || cm.Media.MediaType == 2)
						.Select(m => m.Media)
						.GroupBy(m => m.MediaId)
						.Select(group => group.First()));

				if (type == "file")
				{
					item = await _unit.Message
						.FindAsync(query => query.Where(m => m.MessagesId == MessageId)
						.SelectMany(m => m.ChatInMessages)
						.Where(m => m.MediaId != null)
						.Include(m => m.Media)
						.Where(cm => cm.Media.MediaType == 3)
						.Select(m => m.Media)
						.GroupBy(m => m.MediaId)
						.Select(group => group.First()));
				}

				foreach (var media in item)
				{
					if (media.MediaType == 3) media.Src = GetFullSrc(media.Src, "file");
					else media.Src = GetFullSrc(media.Src);
				}

				return item;
			}
			catch (System.Exception ex)
			{
				throw new ArgumentException("Lỗi: " + ex);
			}
		}

		public Task<Media> GetById(int id)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Media>> GetListById(int id)
		{
			throw new NotImplementedException();
		}

		public async Task<Media> Add(Media value)
		{
			try
			{
				var item = await _unit.Media.AddAsync(value);
				var result = await _unit.CompleteAsync();
				if (result) return item;
				return null;
			}
			catch (System.Exception ex)
			{
				throw new ArgumentException("Lỗi: " + ex);
			}
		}

		public Task<bool> Update(Media value)
		{
			throw new NotImplementedException();
		}

		public async Task<int> IsHas(string hash)
		{
			try
			{
				var item = await _unit.Media.GetByConditionAsync<Media>(query => query.Where(m => m.HashCode == hash));
				if (item == null) return -1;
				return item.MediaId;
			}
			catch (System.Exception ex)
			{
				throw new ArgumentException("Lỗi: " + ex);
			}
		}
	}
        
}