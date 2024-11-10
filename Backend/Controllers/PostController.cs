using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Backend.DTO;

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
        public async Task<ActionResult<List<PostDTO>>> GetAllPosts()
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

            var result = await _postService.UpdatePost(post); 
            if (!result)
            {
                return StatusCode(500, "A database error occurred while updating the post.");
            }
            return NoContent(); 
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _postService.DeletePost(id); 
            if (!result)
            {
                return NotFound(); 
            }
            return NoContent(); 
        }
    }
}