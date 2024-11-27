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
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest("Invalid post data");
            }

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
    }
}