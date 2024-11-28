// // namespace Backend.Services;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;

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
                    // Tạo tên file duy nhất để tránh trùng lặp
                    var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                    var filePath = Path.Combine(mediaPath, uniqueFileName);

                    Console.WriteLine($"Saving file to: {filePath}");

                    try
                    {
                        // Lưu file
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fileStream);
                        }

                        // Tạo hash code
                        string hashCode;
                        using (var stream = new FileStream(filePath, FileMode.Open))
                        {
                            using (var sha256 = SHA256.Create())
                            {
                                var hashBytes = await sha256.ComputeHashAsync(stream);
                                hashCode = BitConverter.ToString(hashBytes)
                                    .Replace("-", "")
                                    .ToLowerInvariant();
                            }
                        }

                        // Tạo đối tượng Media
                        var media = new Media
                        {
                            Src = $"/media/{uniqueFileName}", // Lưu đường dẫn tương đối
                            HashCode = hashCode,
                        };

                        mediaList.Add(media);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error saving file '{file.FileName}': {ex.Message}");
                        throw;
                    }
                }
            }

            // Lưu Post trước
            await _unit.Post.AddAsync(post);
            await _unit.CompleteAsync(); // Lưu để có PostId

            // Lưu Media
            if (mediaList.Any())
            {
                await _dbContext.Media.AddRangeAsync(mediaList);
                await _unit.CompleteAsync(); // Lưu các Media đã thêm
            }

            // Tạo liên kết PostMedia
            var postMediaList = mediaList.Select(media => new PostMedia
            {
                PostId = post.PostId, // Sử dụng PostId đã lưu
                MediaId = media.MediaId
            }).ToList();

            if (postMediaList.Any())
            {
                await _dbContext.PostMedia.AddRangeAsync(postMediaList);
                await _unit.CompleteAsync(); // Lưu các liên kết PostMedia
            }

            return true;
        }
        
        /*public async Task<bool> CreatePostWithMedia(Post post, List<IFormFile> mediaFiles)
        {
            // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try 
                {
                    // 1. Tìm và xác nhận user
                    var user = await _dbContext.Users
                        .FirstOrDefaultAsync(u => u.UserId == post.CreatedByUserId);

                    if (user == null)
                    {
                        throw new Exception($"User with ID {post.CreatedByUserId} not found");
                    }

                    // 3. Đặt các giá trị mặc định
                    post.DateCreated = DateTime.Now;
                    post.DateUpdated = DateTime.Now;

                    // 4. Thêm post vào context
                    var addedPost = await _dbContext.Posts.AddAsync(post);
                    await _dbContext.SaveChangesAsync();

                    // 5. Xử lý media
                    var mediaList = new List<Media>();
                    var postMediaList = new List<PostMedia>();

                    if (mediaFiles != null && mediaFiles.Any())
                    {
                        foreach (var file in mediaFiles)
                        {
                            // Lưu file
                            var fileName = Path.GetFileName(file.FileName);
                            var filePath = Path.Combine(_hostEnvironment.WebRootPath, "media", fileName);

                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }

                            // Tạo media
                            var media = new Media
                            {
                                Src = filePath
                            };
                            mediaList.Add(media);
                        }

                        // Thêm media vào context
                        await _dbContext.Media.AddRangeAsync(mediaList);
                        await _dbContext.SaveChangesAsync();

                        // Tạo PostMedia
                        postMediaList = mediaList.Select(media => new PostMedia
                        {
                            PostId = post.PostId,
                            MediaId = media.MediaId
                        }).ToList();

                        await _dbContext.PostMedia.AddRangeAsync(postMediaList);
                        await _dbContext.SaveChangesAsync();
                    }

                    // 6. Commit transaction
                    await transaction.CommitAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    // Rollback nếu có lỗi
                    await transaction.RollbackAsync();

                    // Log lỗi
                    Console.WriteLine($"Error in CreatePostWithMedia: {ex.Message}");
                    Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                    return false;
                }
            }
        }*/

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