using Backend.Models;
using Backend.Services.Interface;

namespace Backend.Services;

public class CommentService : ICommentService
{
    public Task<IEnumerable<Comment>> GetAll()
    {  
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Comment>> GetListById(int userid)
    {
        throw new NotImplementedException();
    }

    public Task<Comment> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Comment> Add(Comment value)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Update(Comment value)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(int id)
    {
        throw new NotImplementedException();
    }
}