using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Backend.DTO;
using Microsoft.Extensions.Logging;

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
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPost();
            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(PostDTO postDTO)
        {
            if (postDTO == null)
            {
                return BadRequest("PostDTO cannot be null.");
            }

            if (postDTO.CreatedByUser == null)
            {
                return BadRequest("CreatedByUser cannot be null.");
            }

            try
            {
                var post = new PostDTO
                {
                    Content = postDTO.Content,
                    DateCreated = DateTime.Now,
                    CreatedByUserId = postDTO.CreatedByUser.UserId
                };

                var success = await _postService.CreatePost(post); // Đảm bảo đợi kết quả từ service
                if (success)
                {
                    return Ok("Thành công");
                }
                return StatusCode(500, "Internal server error: Failed to create post");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("CreateWithMedia")]
        public async Task<IActionResult> CreatePostWithMedia([FromForm] PostDTO postDTO, [FromForm] List<IFormFile> mediaFiles)
        {
            if (postDTO.CreatedByUser == null)
            {
                return BadRequest("CreateByUser không được null");
            }

            try
            {

                var result = await _postService.CreatePostWithMedia(postDTO, mediaFiles);
                if (result)
                {
                    return Ok("Bài viết đăng thành công");
                }

                return StatusCode(500, "Đã có lỗi xảy ra khi tạo bài viết");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi tạo bài đăng với media");
                return StatusCode(500, $"Lỗi từ máy chủ: {ex.Message}");
            }
        }

        /*[HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _postService.GetPostById(id);
            if (post == null)
            {
                return NotFound(); // Return 404 if post doesn't exist
            }
            return Ok(post); // Return the post
        }*/


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostDTO postDTO)
        {
            if (postDTO == null || id <= 0)
            {
                return BadRequest("Invalid post data.");
            }

            try
            {
                var success = await _postService.UpdatePost(id, postDTO);
                if (success)
                {
                    return Ok("Bài viết đã được cập nhật thành công.");
                }

                return NotFound("Không tìm thấy bài viết để cập nhật.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi cập nhật bài viết");
                return StatusCode(500, $"Lỗi từ máy chủ: {ex.Message}");
            }
        }

        /*[HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var result = await _postService.DeletePost(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }*/
    }
}