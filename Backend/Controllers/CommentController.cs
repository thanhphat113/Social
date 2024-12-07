using Backend.Helper;
using Backend.Models;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ICommentService _commentService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<CommentController> _logger;

    public CommentController(ICommentService commentService, IHttpContextAccessor httpContextAccessor, ILogger<CommentController> logger)
    {
        _commentService = commentService;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsByPostId([FromQuery]int postId)
    {
        try
        {
            var comments = await _commentService.GetCommentsByPostId(postId);
            
            return Ok(comments);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{commentId}/replies")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetReplies(int commentId)
    {
        try
        {
            var replies = await _commentService.GetChildComments(commentId);
            return Ok(replies);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("create")]
    public async Task<ActionResult<Comment>> CreateComment([FromBody] Comment comment, [FromQuery] int postId)
    {
        try
        {
            
            Console.WriteLine($"PostId: {postId}, Content: {comment.Content}");
            
            // Kiểm tra comment có null không
            if (comment == null)
            {
                return BadRequest("Comment data is missing.");
            }

            // Lấy UserId từ cookie
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            if (userId <= 0)
            {
                return BadRequest("User is not authenticated.");
            }
            Console.WriteLine("===================================");
            Console.WriteLine("UserId from cookie: " + userId);

            // Gán UserId cho comment
            comment.UserId = userId;
            comment.PostId = postId;
            Console.WriteLine(comment.DateCreated);

            // Log dữ liệu comment trước khi thêm
            Console.WriteLine("Comment data: " + 
                              $"PostId: {comment.PostId}, Content: {comment.Content}, UserId: {comment.UserId}");

            // Gọi service thêm comment
            var createdComment = await _commentService.AddComment(comment);
            if (createdComment == null)
            {
                return StatusCode(500, "Failed to create comment.");
            }

            // Trả về kết quả thành công
            return Ok(createdComment);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Exception: " + ex.Message);
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateComment([FromQuery]int commentId, [FromBody] Comment comment)
    {

        Console.WriteLine(comment.PostId);
        
        try
        {
            var userId = 11;   
            comment.CommentId = commentId;
            comment.UserId = userId;    
            Console.WriteLine($"commentId: {commentId}, comment content: {comment.Content}");
            var updated = await _commentService.Update(comment);
            if (updated)
            {
                return Ok();
            }
            return StatusCode(500, "Failed to update comment");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteComment([FromQuery]int commentId)
    {
        try
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            var deleted = await _commentService.DeleteAsync(commentId, userId);
            return deleted ? Ok() : StatusCode(500, "Failed to delete comment");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


    #region Tương tác với comment
    
    [HttpGet("userlikecomment")]
    public async Task<bool> GetLikesUser([FromQuery]int commentId)
    {
        var userId = MiddleWare.GetUserIdFromCookie(Request);
        Console.WriteLine("User id trong userlikecomment" + userId);
        if (userId <= 0)
        {
            return false;
        }
        try
        {
            var likesCount = await _commentService.GetLikesUser(commentId, userId);
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
    public async Task<ActionResult<ReactsPost>> GetLikesCount([FromQuery]int commentId)
    {
        try
        {
            var likesCount = await _commentService.GetLikesCount(commentId);
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
    
    [HttpPost("react")]
    public async Task<IActionResult> ReactToComment([FromQuery] int commentId)
    {
        try
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            Console.WriteLine("===================================");
            Console.WriteLine("UserId from cookie: " + userId);
            Console.WriteLine("CommentId: " + commentId);
            if (userId <= 0)
            {
                return BadRequest("User không được xác thực");
            }

            var result = await _commentService.ReactToComment(commentId, userId);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Failed to like the comment.");   
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("unlike")]
    public async Task<IActionResult> RemoveReactFromComment([FromQuery]int commentId)
    {
        try
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            Console.WriteLine("===================================");
            Console.WriteLine("UserId from cookie: " + userId);
            Console.WriteLine("CommentId: " + commentId);
            if (userId <= 0)
            {
                return BadRequest("User  is not authenticated.");
            }

            var result = await _commentService.RemoveReactFromComment(commentId, userId);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Failed to like the comment.");   
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    [HttpPost("reply")]
    public async Task<ActionResult<Comment>> ReplyToComment([FromBody] Comment comment, [FromQuery] int commentId)
    {
        try
        {
            var userId = MiddleWare.GetUserIdFromCookie(Request);
            if (userId <= 0)
            {
                return BadRequest("User is not authenticated.");
            }

            comment.UserId = userId;
            comment.ChildOf = commentId;

            var createdComment = await _commentService.AddComment(comment);
            if (createdComment == null)
            {
                return StatusCode(500, "Failed to create comment.");
            }
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /*[HttpGet("checkUserLikeComment")]
    public async Task<IActionResult> CheckUserLikeComment([FromQuery] int commentId)
    {
        var userId = MiddleWare.GetUserIdFromCookie(Request);   
        if (userId <= 0)
        {
            return BadRequest("User is not authenticated.");
        }  
        var result = await _commentService.GetLikesUser(commentId, userId);
    }*/

    #endregion

    // Phương thức để lấy UserId hiện tại (bạn cần implement)
    // private int GetCurrentUserId()
    // {
    //     var userIdClaim = _httpContextAccessor.HttpContext.User
    //         .FindFirst(ClaimTypes.NameIdentifier);
    //     return userIdClaim != null 
    //         ? int.Parse(userIdClaim.Value) 
    //         : throw new UnauthorizedAccessException("User not authenticated");
    // }
}