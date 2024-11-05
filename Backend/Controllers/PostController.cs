using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPost()
        {
            var posts = await _postService.GetAllPost();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _postService.GetPostById(id);
            if (post == null)
            {
                return NotFound(); // Return 404 if post doesn't exist
            }
            return Ok(post); // Return the post
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest("Post data is null.");
            }

            post.DateCreated = DateTime.UtcNow;
            post.DateUpdated = DateTime.UtcNow;

            // Giả sử CreatedByUserId đã được cung cấp trong post
            // post.CreatedByUser = await _context.Users.FindAsync(post.CreatedByUserId);

            var result = await _postService.AddPost(post); // Sử dụng service để thêm bài đăng
            if (!result)
            {
                return StatusCode(500, "A database error occurred while creating the post.");
            }
            return CreatedAtAction(nameof(GetPostById), new { id = post.PostId }, post);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post post)
        {
            if (post == null || post.PostId != id)
            {
                return BadRequest("Post data is invalid.");
            }

            var result = await _postService.UpdatePost(post); // Sử dụng service để cập nhật bài đăng
            if (!result)
            {
                return StatusCode(500, "A database error occurred while updating the post.");
            }
            return NoContent(); // Return 204 No Content
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _postService.DeletePost(id); // Sử dụng service để xóa bài đăng
            if (!result)
            {
                return NotFound(); // Return 404 if post doesn't exist
            }
            return NoContent(); // Return 204 No Content
        }

        /*private readonly SocialMediaContext _context;
        private readonly ILogger<PostController> _logger;

        public PostController(SocialMediaContext context, ILogger<PostController> logger)
        {
            _context = context;
            _logger = logger; // Khởi tạo logger
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound(); // Return 404 if post doesn't exist
            }

            return Ok(post); // Return the post
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest("Post data is null.");
            }

            post.DateCreated = DateTime.UtcNow;
            post.DateUpdated = DateTime.UtcNow;

            // Nếu CreatedByUserId đã được cung cấp, hãy thiết lập CreatedByUser
            post.CreatedByUser = await _context.Users.FindAsync(post.CreatedByUserId);

            if (post.CreatedByUser == null)
            {
                return BadRequest("Invalid CreatedByUserId.");
            }

            try
            {
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPostById), new { id = post.PostId }, post);
            }
            catch (DbUpdateException dbEx) // Bắt lỗi DB cụ thể
            {
                _logger.LogError(dbEx, "Database error occurred while creating post.");
                return StatusCode(500, "A database error occurred while creating the post.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating the post.");
                return StatusCode(500, "An error occurred while creating the post.");
            }
        }



        // GET: api/post/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            // Retrieve the post including comments and media
            var post = await _context.Posts
                .Include(p => p.Comments)
                .Include(p => p.Media)
                .FirstOrDefaultAsync(p => p.PostId == id);

            if (post == null)
            {
                return NotFound(); // Return 404 if post doesn't exist
            }

            _context.Posts.Remove(post); // Remove the post
            await _context.SaveChangesAsync(); // Save changes to the database

            return NoContent(); // Return 204 No Content status
        }

        [HttpGet("check-connection")]
        public async Task<IActionResult> CheckConnection()
        {
            var canConnect = await _context.CanConnectAsync();
            if (canConnect)
            {
                return Ok("Connected to the database.");
            }
            return StatusCode(500, "Unable to connect to the database.");
        }*/

    }
}