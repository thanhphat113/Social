// // namespace Backend.Services;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Backend.Services.Interface;

namespace Backend.Services
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unit;
        private readonly IWebHostEnvironment  _hostEnvironment;
        private readonly SocialMediaContext _dbContext;
        public PostService(IUnitOfWork unit, IWebHostEnvironment  hostEnvironment, SocialMediaContext dbContext)
        {
            _unit = unit;
            _hostEnvironment = hostEnvironment;
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Post>> GetAll()
        {
            try
            {
                // Lấy toàn bộ dữ liệu từ repository của Post
                var posts = await _unit.Post.GetAll();
                return posts;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                Console.WriteLine("Lỗi khi lấy dữ liệu: " + ex.Message);
                throw;
            }
        }

        public async Task<Post> GetListById(int id)
        {
            try
            {
                // Lấy toàn bộ dữ liệu từ repository của Post
                var posts = await _unit.Post.GetByIdAsync(id);
                return posts;
            }
            catch (Exception ex)
            {
                // Xử lý lỗi
                Console.WriteLine("Lỗi khi lấy dữ liệu: " + ex.Message);
                throw;
            }
        }

        public Task<Post> GetById(int id)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<Post>> IService<Post>.GetListById(int userid)
        {
            throw new NotImplementedException();
        }

        public async Task<Post> Add(Post post)
        {
            var posts = await _unit.Post.AddAsync(post);
            var result = await _unit.CompleteAsync();
            if(result) return posts;
            return null;
        }

        public Task<bool> Update(Post value)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }


        public async Task<IEnumerable<Post>> GetAllPostsWithMedia()
        {
            var posts = await _unit.Post.GetAll();

            foreach (var post in posts)
            {
                // Tìm các PostMedia liên quan đến bài viết và bao gồm thông tin Media
                var postMedias = await _unit.PostMedia.FindAsync(pm => pm.PostId == post.PostId, pm => new { pm.PostId, pm.Media });

                // Gán media vào bài viết
                post.PostMedia = postMedias.Select(pm => new PostMedia
                {
                    PostId = post.PostId, // Gán PostId
                    MediaId = pm.Media.MediaId, // Gán MediaId từ Media
                    Media = pm.Media // Gán đối tượng Media vào PostMedia
                }).ToList(); // Chuyển đổi thành danh sách PostMedia
            }

            return posts;
        }

        public async Task<bool> CreatePostWithMedia(Post post, List<IFormFile> mediaFiles)
        {
            if (string.IsNullOrEmpty(_hostEnvironment.WebRootPath))
            {
                throw new InvalidOperationException("WebRootPath is not set.");
            }

            var mediaPath = Path.Combine(_hostEnvironment.WebRootPath, "media");

            // Tạo thư mục media nếu chưa tồn tại
            if (!Directory.Exists(mediaPath))
            {
                Directory.CreateDirectory(mediaPath);
            }

            var mediaList = new List<Media>();

            if (mediaFiles != null && mediaFiles.Any())
            {
                foreach (var file in mediaFiles)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var filePath = Path.Combine(_hostEnvironment.WebRootPath, "media", fileName);

                    Console.WriteLine(filePath);

                    try
                    {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error saving file: {ex.Message}");
                        throw;
                    }

                    var media = new Media
                    {
                        Src = filePath
                    };

                    mediaList.Add(media);
                }
            }

            foreach (var i in mediaList)
            {
                Console.WriteLine("================" + i);
            }

            if (mediaList.Any())
            {
                await _dbContext.Media.AddRangeAsync(mediaList);
                await _unit.CompleteAsync();
            }

            await _unit.Post.AddAsync(post);
            await _unit.CompleteAsync();

            var postMediaList = mediaList.Select(media => new PostMedia
            {
                PostId = post.PostId,
                MediaId = media.MediaId
            }).ToList();

            if (postMediaList.Any())
            {
                await _dbContext.PostMedia.AddRangeAsync(postMediaList);
                await _unit.CompleteAsync();
            }

            return true;
        }

        public async Task<bool> UpdatePost(Post post)
        {
            var userExists = _dbContext.Users.Any(u => u.UserId == post.CreatedByUserId);
            if (!userExists)
            {
                throw new Exception($"User với ID {post.CreatedByUserId} không tồn tại.");
            }

            try
            {
                var postUpdate = await _unit.Post.GetByIdAsync(post.PostId);

                if (postUpdate != null)
                {
                    // Cập nhật các thuộc tính cần thiết
                    postUpdate.Content = post.Content;
                    postUpdate.DateUpdated = DateTime.Now;
                    postUpdate.CreatedByUserId = post.CreatedByUserId;

                    _unit.Post.UpdateAsync(postUpdate);
                    var postCheck = await _unit.CompleteAsync();
                    return postCheck;
                }

                return false;
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException != null ? ex.InnerException.Message : string.Empty;
                throw new Exception($"Có lỗi khi thực hiện cập nhật: {ex.Message} {innerExceptionMessage}");
            }
        }
    }
}