using Backend.Models;
using Backend.Repositories.Interface;
using Backend.Repository.Interface;
using Backend.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class CommentService : ICommentService
{
    private readonly IUnitOfWork _unit;
    
    public CommentService(IUnitOfWork unit)
    {
        _unit = unit;
    }
    
    public async Task<IEnumerable<Comment>> GetAll()
    {  
        Console.WriteLine("Da vao Service");
        var data = await _unit.Comment.GetAll();
        Console.WriteLine("Da lay du lieu tu repository");
        return data;
    }

    public Task<IEnumerable<Comment>> GetListById(int userid)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Comment>> GetCommentsByPostId(int postId)
    {
        return await _unit.Comment.FindAsync<Comment>(query =>
            query.Where(c => c.PostId == postId)
                .Include(c => c.Post)
                .Include(c => c.User)
                .OrderByDescending(c => c.DateCreated));
    }

    public async Task<Comment> GetById(int id)
    {
        return await _unit.Comment.GetByIdAsync(id);
    }
    public Task<Comment> Add(Comment value)
    {
        throw new NotImplementedException();
    }

    public async Task<Comment> AddComment(Comment comment)
    {
        try
        {
            // Log dữ liệu comment trước khi thêm
            Console.WriteLine("Adding comment...");
            Console.WriteLine($"PostId: {comment.PostId}, UserId: {comment.UserId}, Content: {comment.Content}");

            if (comment.PostId == null || comment.PostId <= 0)
            {
                throw new Exception("PostId is null or invalid.");
            }

            if (comment.UserId <= 0)
            {
                throw new Exception("UserId is invalid.");
            }

            if (string.IsNullOrWhiteSpace(comment.Content))
            {
                throw new Exception("Content is null or empty.");
            }


            // Thêm comment vào database
            var addedComment = await _unit.Comment.AddAsync(comment);
            await _unit.CompleteAsync();

            // Log kết quả sau khi thêm
            Console.WriteLine($"Comment added successfully with Id: {addedComment.CommentId}");
            return addedComment;
        }
        catch (Exception ex)
        {
            // Log lỗi
            Console.WriteLine($"Error in Add method: {ex.Message}");
            throw;
        }
    }

    public async Task<bool> Update(Comment comment)
    {
        comment.DateUpdated = DateTime.UtcNow;
        _unit.Comment.UpdateAsync(comment);
        return await _unit.CompleteAsync();
    }
    public Task<bool> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteAsync(int commentId, int userId) 
    {
        await _unit.Comment.DeleteAsync(r => r.CommentId == commentId && r.UserId == userId);
        return await _unit.CompleteAsync();
    }

    // Thêm method để lấy comment con (reply)
    public async Task<IEnumerable<Comment>> GetChildComments(int parentCommentId)
    {
        return await _unit.Comment.FindAsync<Comment>(query =>
            query.Where(c => c.ChildOf == parentCommentId)
                .OrderByDescending(c => c.DateCreated));
    }

    #region Tương tác với comment

    public async Task<int> GetLikesCount(int commentId)
    {
        var data = await _unit.ReactsComment.GetAll();
        var count = data.Count(r => r.CommentId == commentId);
        return count;
    }
    
    public async Task<bool> GetLikesUser(int commentId, int userId)
    {
        var data = await _unit.ReactsComment.GetByConditionAsync(query =>
            query.Where(r => r.CommentId == commentId && r.UserId == userId));

        if (data == null)
        {
            return false;
        }

        Console.WriteLine("==================================================================");
        Console.WriteLine(data);
        return true;
    }
    
    
    public async Task<bool> ReactToComment(int commentId, int userId)
    {
        var react = new ReactsComment
        {
            CommentId = commentId,
            UserId = userId
        };
        
        await _unit.ReactsComment.AddAsync(react);
        await _unit.CompleteAsync();
        return true;
    }
    public async Task<bool> RemoveReactFromComment(int commentId, int userId)
    {
        await _unit.ReactsComment.DeleteAsync(r => r.CommentId == commentId && r.UserId == userId);
        await _unit.CompleteAsync();
        return true;
    }
    
    #endregion
}