using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Repository.Interface;
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
        private readonly ILogger<PostService> _logger;

        public PostService(IUnitOfWork unit, IWebHostEnvironment  hostEnvironment, SocialMediaContext dbContext, ILogger<PostService> logger)
        {
            _logger = logger;
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

        public async Task<int?> GetProfilePicturePostId(int userId)
        {
            try
            {
                // Truy vấn bài viết là ảnh đại diện
                var profilePicturePost = await _dbContext.Posts
                    .Where(p => p.CreatedByUserId == userId && p.IsPictureProfile == true)
                    .OrderByDescending(p => p.DateCreated)
                    .FirstOrDefaultAsync();

                return profilePicturePost?.PostId;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving profile picture post ID for user {userId}: {ex.Message}");
                throw;
            }
        }


        public async Task<int?> GetCoverPhotoPostId(int userId)
        {
            try
            {
                // Truy vấn bài viết là ảnh bìa
                var coverPhotoPost = await _dbContext.Posts
                    .Where(p => p.CreatedByUserId == userId && p.IsCoverPhoto == true)
                    .OrderByDescending(p => p.DateCreated)
                    .FirstOrDefaultAsync();

                return coverPhotoPost?.PostId;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving cover photo post ID for user {userId}: {ex.Message}");
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

        public async Task<List<string>> GetProfileUser(int userId)
        {
            var mediaList = await _dbContext.Users
                .Where(u => u.UserId == userId)
                .SelectMany(u => u.Posts)
                .Where(p => p.IsPictureProfile == true)  // Chỉ lấy ảnh profile
                .SelectMany(p => p.Medias)
                .Select(m => m.Src)
                .ToListAsync();

            return mediaList;
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
            if(result) 
                return posts;
            return null;
        }

        public async Task<IEnumerable<Post>> GetPostsByGroupId(int groupId)
        {
            try
            {
                // Truy vấn dữ liệu sử dụng LINQ
                var posts = await (from post in _dbContext.Posts
                                   where post.GroupId == groupId
                                   orderby post.DateCreated descending
                                   select new Post
                                   {
                                       PostId = post.PostId,
                                       Content = post.Content,
                                       CreatedByUserId = post.CreatedByUserId,
                                       DateCreated = post.DateCreated,
                                       DateUpdated = post.DateUpdated,
                                       GroupId = post.GroupId,
                                       Comments = post.Comments.Select(c => new Comment
                                       {
                                           CommentId = c.CommentId,
                                           Content = c.Content,
                                           DateCreated = c.DateCreated,
                                           DateUpdated = c.DateUpdated,
                                           PostId = c.PostId,
                                           UserId = c.UserId
                                       }).ToList(),
                                       CreatedByUser = post.CreatedByUser != null ? new User
                                       {
                                           UserId = post.CreatedByUser.UserId,
                                           FirstName = post.CreatedByUser.FirstName,
                                           LastName = post.CreatedByUser.LastName
                                       } : null,
                                       Medias = post.Medias.Select(m => new Media
                                       {
                                           MediaId = m.MediaId,
                                           Src = m.Src
                                       }).ToList()
                                   }).ToListAsync();

                return posts;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving posts for group {groupId}: {ex.Message}");
                throw;
            }
        }

        public async Task<IEnumerable<Post>> GetPostsByCreatedByUserId(int userId)
        {
            try
            {
                // Truy vấn dữ liệu sử dụng LINQ
                var posts = await (from post in _dbContext.Posts
                                   where post.CreatedByUserId == userId
                                   orderby post.DateCreated descending
                                   select new Post
                                   {
                                       PostId = post.PostId,
                                       Content = post.Content,
                                       CreatedByUserId = post.CreatedByUserId,
                                       DateCreated = post.DateCreated,
                                       DateUpdated = post.DateUpdated,
                                       Comments = post.Comments.Select(c => new Comment
                                       {
                                           CommentId = c.CommentId,
                                           Content = c.Content,
                                           DateCreated = c.DateCreated,
                                           DateUpdated = c.DateUpdated,
                                           PostId = c.PostId,
                                           UserId = c.UserId
                                       }).ToList(),
                                       CreatedByUser = post.CreatedByUser != null ? new User
                                       {
                                           UserId = post.CreatedByUser.UserId,
                                           FirstName = post.CreatedByUser.FirstName,
                                           LastName = post.CreatedByUser.LastName
                                       } : null,
                                       Medias = post.Medias.Select(m => new Media
                                       {
                                           MediaId = m.MediaId,
                                           Src = m.Src
                                       }).ToList()
                                   }).ToListAsync();

                return posts;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving posts for user {userId}: {ex.Message}");
                throw;
            }
        }

        public Task<bool> Update(Post value)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Delete(int postId)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try 
                {
                    // Tìm post
                    var post = await _dbContext.Posts
                        .Include(p => p.Comments)
                        .Include(p => p.Medias)
                        .Include(p => p.PostNotifications)
                        .Include(p => p.SharePosts)
                        .FirstOrDefaultAsync(p => p.PostId == postId);

                    if (post == null)
                        return false;

                    // Xóa các reacts của comments
                    var commentIds = post.Comments.Select(c => c.CommentId).ToList();
                    var reactsComments = await _dbContext.ReactsComments
                        .Where(rc => commentIds.Contains(rc.CommentId))
                        .ToListAsync();
                    _dbContext.ReactsComments.RemoveRange(reactsComments);

                    // Xóa comments
                    _dbContext.Comments.RemoveRange(post.Comments);

                    // Xóa media
                    if (post.Medias != null)
                        _dbContext.Media.RemoveRange(post.Medias);

                    // Xóa notifications
                    _dbContext.PostNotifications.RemoveRange(post.PostNotifications);

                    // Xóa share posts
                    _dbContext.SharePosts.RemoveRange(post.SharePosts);

                    // Xóa post
                    _dbContext.Posts.Remove(post);

                    await _dbContext.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return true;
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    _logger.LogError($"Error deleting post {postId}: {ex.Message}");
                    return false;
                }
            }
        }
        
        public async Task<IEnumerable<Post>> GetAllPostsWithMedia()
        {
            var posts = await _dbContext.Posts
                .Include(p => p.Comments) // Tải các bình luận
                .Include(p => p.Medias)   // Tải các media
                .Include(p => p.CreatedByUser )
                .OrderByDescending(p =>  p.DateCreated)
                .ToListAsync();

            return posts.Select(p => new Post 
            {
                PostId = p.PostId,
                Content = p.Content,
                CreatedByUserId = p.CreatedByUserId,
                DateCreated = p.DateCreated,
                DateUpdated = p.DateUpdated,
                IsVisible = p.IsVisible,
                IsPictureProfile = p.IsPictureProfile,
                IsCoverPhoto = p.IsCoverPhoto,
                Comments = p.Comments?.Select(c => new Comment 
                {
                    CommentId = c.CommentId,
                    Content = c.Content,
                    DateCreated = c.DateCreated,
                    DateUpdated = c.DateUpdated,
                    PostId = c.PostId,
                    UserId = c.UserId
                }).ToList() ?? new List<Comment>(),
                CreatedByUser  = p.CreatedByUser  != null ? new User 
                {
                    UserId = p.CreatedByUser .UserId,
                    FirstName = p.CreatedByUser .FirstName,
                    LastName = p.CreatedByUser .LastName,
                    GenderId = p.CreatedByUser.GenderId
                } : null,
                Medias = p.Medias?.Select(m => new Media 
                {
                    MediaId = m.MediaId,
                    Src = m.Src
                }).ToList() ?? new List<Media>()
            }).ToList();
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
                        var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                        var filePath = Path.Combine(mediaPath, uniqueFileName);

                        try
                        {
                            using (var fileStream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                            }

                            // Tạo mã băm
                            string hashCode;
                            using (var stream = new FileStream(filePath, FileMode.Open))
                            {
                                using (var sha256 = SHA256.Create())
                                {
                                    var hashBytes = await sha256.ComputeHashAsync(stream);
                                    hashCode = BitConverter.ToString(hashBytes).Replace("-", "").ToLowerInvariant();
                                }
                            }

                            // Tạo đối tượng Media
                            var media = new Media
                            {
                                Src = $"{uniqueFileName}",
                                HashCode = hashCode,
                            };

                            mediaList.Add(media);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Lỗi khi lưu tệp '{file.FileName}': {ex.Message}");
                            throw;
                        }
                    }
                }

                // Lưu Post trước
                await _unit.Post.AddAsync(post);
                await _unit.CompleteAsync(); // Lưu để lấy PostId

                // Lưu Media
                if (mediaList.Any())
                {
                    await _dbContext.Media.AddRangeAsync(mediaList);
                    await _unit.CompleteAsync(); // Lưu các Media đã thêm
                }

                // Liên kết Post và Media
                foreach (var media in mediaList)
                {
                    post.Medias.Add(media); // Thêm media vào bộ sưu tập Medias của bài viết
                }

                // Lưu Post đã cập nhật với các liên kết Media
                await _unit.CompleteAsync(); // Lưu Post với Media liên kết

                return true;
            }
        
        public async Task<bool> GetLikesUser(int postId, int userId)
        {
            // Sử dụng GetByConditionAsync với selector để truy vấn bảng ReactPost
            var existingReact = await _unit.ReactsPost.GetByConditionAsync<ReactsPost>(query => 
                query.Where(r => r.PostId == postId && r.UserId == userId));

            // Kiểm tra nếu tồn tại ReactPost thì trả về true, ngược lại false
            return existingReact != null;
        }

        
        public async Task<int> GetLikesCount(int postId)
        {
            var data = await _unit.ReactsPost.GetAll();
            var count = data.Count(r => r.PostId == postId);
            return count;
        }
        
        public async Task<int> GetCommentCount(int postId)
        {
            var data = await _unit.Comment.GetAll();
            var count = data.Count(r => r.PostId == postId);
            return count;
        }
        
        public async Task<bool> AddLike(int postId, int userId)
        {
            var react = new ReactsPost
            {
                PostId = postId,
                UserId = userId
            };

            await _unit.ReactsPost.AddAsync(react);
            return await _unit.CompleteAsync();
        }
        public async Task<IEnumerable<Post>> SearchPostByUserNameAsync(string searchTerm)
        {
            return await _unit.Post.FindAsync<Post>(
                query => query.Include(p => p.CreatedByUser)
                    .Where(p => p.CreatedByUser.FirstName.ToLower().Contains(searchTerm.ToLower()) ||
                                p.CreatedByUser.LastName.ToLower().Contains(searchTerm.ToLower()) ||
                                (p.CreatedByUser.FirstName + " " + p.CreatedByUser.LastName).ToLower().Contains(searchTerm.ToLower()))
                    .OrderByDescending(p => p.DateCreated)
            );
        }

        public async Task<bool> RemoveLike(int postId, int userId)
        {
            await _unit.ReactsPost.DeleteAsync(r => r.PostId == postId && r.UserId == userId);
            return await _unit.CompleteAsync();
        }

        public async Task<bool> UpdatePost(Post post)
        {
            /*var userExists = _dbContext.Users.Any(u => u.UserId == post.CreatedByUserId);
            if (!userExists)
            {
                throw new Exception($"User với ID {post.CreatedByUserId} không tồn tại.");
            }*/

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