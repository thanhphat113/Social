using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Services;
using Backend.Helper;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;
        private readonly ILogger<PostController> _logger;
        
        public PostController(PostService postService, ILogger<PostController> logger)
        {
            _postService = postService;
            _logger = logger;
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

            var result = await _postService.UpdatePost(post);
            if (result)
            {
                return Ok(new {message = "Post updated successfully"});
            }

            return BadRequest(new { message = "Failed to update post" });
        }
        
        #endregion

        
        #region tương tác bài viết
        // api/Post/likeuser?postId=1
        [HttpGet("likeuser")]
        public async Task<bool> GetLikesUser([FromQuery]int postId)
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            Console.WriteLine("User id trong getlikeduser" + userId);
            
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

            if (await _postService.RemoveLike(postId, userId))
            {
                return Ok();
            }

            return BadRequest("Failed to unlike the post.");
        }
        
        #endregion
        
    }
}
