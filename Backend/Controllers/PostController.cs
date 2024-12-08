using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Backend.Helper;
using Backend.Services.Interface;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly ILogger<PostController> _logger;
        
        public PostController(IPostService postService, ILogger<PostController> logger)
        {
            _postService = postService;
            _logger = logger;
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPostsByUserId(int userId)
        {
            try
            {
                var posts = await _postService.GetPostsByCreatedByUserId(userId);

                if (posts == null || !posts.Any())
                {
                    return NotFound(new { Message = "Không tìm thấy bài viết nào cho người dùng này." });
                }

                return Ok(posts);
            }
            catch (Exception ex)
            {
                // Log lỗi
                return StatusCode(500, new { Message = "Đã xảy ra lỗi khi lấy danh sách bài viết.", Error = ex.Message });
            }
        }

        #region thêm sửa xóa bài viết
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetAllPost()
        {
            try
            {
                var posts = await _postService.GetAllPostsWithMedia();
                return Ok(posts); // Trả về danh sách bài viết cùng với media
            }
            catch (Exception ex)
            {
                throw;

            }
        }
        
        [HttpGet("search-by-username")]
        public async Task<IActionResult> SearchPostsByUserName([FromQuery] string searchTerm)
        {
            var posts = await _postService.SearchPostByUserNameAsync(searchTerm);
            return Ok(posts);
        }
        
        [HttpGet("UserId")]
        public async Task<IActionResult> GetUserPostMedia([FromQuery]int userId)
        {
            var mediaList = await _postService.GetProfileUser(userId);
            return Ok(mediaList);
        }
        
        
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromForm] Post post)
        {
            if (post == null)
            {
                return BadRequest("Invalid post data");
            }


            var userId = MiddleWare.GetUserIdFromCookie(Request);

            var token = Request.Cookies["YourCookieName"];


            Console.WriteLine($"User id: {userId}");
            Console.WriteLine("Token từ cookie: " + token);            
            post.CreatedByUserId = userId;

            post.DateCreated = DateTime.Now;
            post.DateUpdated = DateTime.Now;

            try
            {
                var result = await _postService.Add(post);
                if (result == null)
                {
                    return StatusCode(500, "An error occurred while saving the post");
                }

                return CreatedAtAction(nameof(CreatePost), new { id = post.PostId }, post);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating post");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("WithMedia")]
        public async Task<IActionResult> CreatePostWithMedia([FromForm] Post post, [FromForm] List<IFormFile> files)
        {
            
            var userId = MiddleWare.GetUserIdFromCookie(Request);

            var token = Request.Cookies["YourCookieName"];

            // Xử lý avatar (ảnh đại diện)
            if (post.IsPictureProfile == true)
            {
                try
                {
                    // Lấy ID bài viết của ảnh đại diện hiện tại
                    var currentAvatarPostId = await _postService.GetProfilePicturePostId(userId);

                    if (currentAvatarPostId.HasValue)
                    {
                        // Xóa bài viết cũ chứa ảnh đại diện
                        var deleteResult = await _postService.Delete(currentAvatarPostId.Value);
                        if (!deleteResult)
                        {
                            Console.WriteLine("Không thể xóa bài viết ảnh đại diện cũ.");
                            return BadRequest("Không thể xóa bài viết ảnh đại diện cũ.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi xử lý avatar: {ex.Message}");
                    return StatusCode(500, "Lỗi xử lý avatar.");
                }
            }

            // Xử lý cover photo (ảnh bìa)
            if (post.IsCoverPhoto == true)
            {
                try
                {
                    // Lấy ID bài viết của ảnh bìa hiện tại
                    var currentCoverPhotoPostId = await _postService.GetCoverPhotoPostId(userId);

                    if (currentCoverPhotoPostId.HasValue)
                    {
                        // Xóa bài viết cũ chứa ảnh bìa
                        var deleteResult = await _postService.Delete(currentCoverPhotoPostId.Value);
                        if (!deleteResult)
                        {
                            Console.WriteLine("Không thể xóa bài viết ảnh bìa cũ.");
                            return BadRequest("Không thể xóa bài viết ảnh bìa cũ.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Lỗi xử lý cover photo: {ex.Message}");
                    return StatusCode(500, "Lỗi xử lý cover photo.");
                }
            }


            Console.WriteLine($"User id: {userId}");
            Console.WriteLine("Token từ cookie: " + token);            
            post.CreatedByUserId = userId;
            
            
            if (files == null || !files.Any())
            {
                Console.WriteLine("Không nhận được files");
                return BadRequest("Không nhận được files");
            }

            Console.WriteLine($"Content: {post.Content}");
            Console.WriteLine($"Number of files: {files.Count}");

            foreach (var file in files)
            {
                Console.WriteLine($"File name: {file.FileName}");
            }

            var result = await _postService.CreatePostWithMedia(post, files);

            if (result)
                return Ok(new { message = "Post created successfully." });

            return BadRequest(new { message = "Failed to create post." });
        }
        

        [HttpPut]
        public async Task<IActionResult> UpdatePost([FromForm] Post post)
        {
            if (post == null)
            {
                return BadRequest("Dữ liệu lỗi");
            }

            var userId = MiddleWare.GetUserIdFromCookie(Request);
            
            Console.WriteLine( "PostId: " + post.PostId);
            Console.WriteLine( "Content: " + post.Content);
            
            post.CreatedByUserId = userId;
            
            var result = await _postService.UpdatePost(post);
            if (result)
            {
                return Ok(new {message = "Post updated successfully"});
            }

            return BadRequest(new { message = "Failed to update post" });
        }
        
        [HttpDelete]
        public async Task<IActionResult> DeletePost([FromQuery] int postId)
        {
            
            Console.WriteLine("Da do cai xoa bai viet");
            Console.WriteLine("PostId: " + postId);

            try 
            {
                // Lấy userId từ cookie để kiểm tra quyền xóa
                var userId = MiddleWare.GetUserIdFromCookie(Request);

                var result = await _postService.Delete(postId);

                if (result)
                {
                    return Ok(new { message = "Post deleted successfully" });
                }

                return BadRequest(new { message = "Failed to delete post" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting post");
                return StatusCode(500, "Internal server error");
            }
        }
        
        #endregion

        
        #region tương tác bài viết
        // api/Post/likeuser?postId=1
        [HttpGet("likeuser")]
        public async Task<bool> GetLikesUser([FromQuery]int postId)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);

            if (userId <= 0)
            {
                return false;
            }
            try
            {
                var likesCount = await _postService.GetLikesUser(postId, userId);
                if (likesCount == false)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting likes count");
                return false;
            }
        }
        
        [HttpGet("likes")]
        public async Task<ActionResult<ReactsPost>> GetLikesCount([FromQuery]int postId)
        {
            try
            {
                var likesCount = await _postService.GetLikesCount(postId);
                if (likesCount == null)
                {
                    return BadRequest("Failed to get likes count");
                }
                return Ok(likesCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting likes count");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpGet("comment")]
        public async Task<ActionResult<int>> GetCommentCount([FromQuery] int postId)
        {
            _logger.LogInformation("Received request to get comment count for postId: {PostId}", postId);

            try
            {
                if (postId <= 0)
                {
                    _logger.LogWarning("Invalid postId: {PostId}", postId);
                    return BadRequest("Invalid postId.");
                }

                var commentCount = await _postService.GetCommentCount(postId);

                if (commentCount == null)
                {
                    _logger.LogWarning("No comments found for postId: {PostId}", postId);
                    return NotFound("No comments found.");
                }

                _logger.LogInformation("Successfully retrieved comment count: {Count} for postId: {PostId}", commentCount, postId);
                return Ok(commentCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting comment count for postId: {PostId}", postId);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikePost([FromQuery]int postId)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request); // Lấy userId từ cookie hoặc session
            if (userId <= 0)
            {
                return BadRequest("User  not found.");
            }

            try
            {
                var result = await _postService.AddLike(postId, userId);
                if (result)
                {
                    return Ok();
                }
                return BadRequest("Failed to like the post.");
            }
            catch (Exception ex)
            {
                // Ghi log lỗi
                _logger.LogError(ex, "Error liking post with ID {PostId}", postId);
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("delete")]
        public async Task<IActionResult> UnlikePost([FromQuery]int postId)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request); // Lấy userId từ cookie hoặc session
            Console.WriteLine("User id trong unlike" + userId); 
            if (await _postService.RemoveLike(postId, userId))
            {
                return Ok();
            }

            return BadRequest("Failed to unlike the post.");
        }
        
        #endregion
        
    }
}