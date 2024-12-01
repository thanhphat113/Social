using Backend.Models;

namespace Backend.Services.Interface;

public interface ICommentService : IService<Comment>
{
    Task<IEnumerable<Comment>> GetCommentsByPostId(int postId);
    Task<Comment> AddComment(Comment comment);
    Task<IEnumerable<Comment>> GetChildComments(int commentId);
    Task<bool> ReactToComment(int commentId, int userId);
    Task<bool> RemoveReactFromComment(int commentId, int userId);
    Task<bool> GetLikesUser(int commentId, int userId);
    Task<int> GetLikesCount(int commentId);
    Task<bool> DeleteAsync(int commentId, int userId);
}