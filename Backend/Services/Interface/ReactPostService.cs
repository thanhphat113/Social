using Backend.Models;

namespace Backend.Services.Interface;

public class ReactPostService : IReactPostService
{
    public Task<IEnumerable<ReactsPost>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ReactsPost>> GetListById(int userid)
    {
        throw new NotImplementedException();
    }

    public Task<ReactsPost> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ReactsPost> Add(ReactsPost value)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Update(ReactsPost value)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(int id)
    {
        throw new NotImplementedException();
    }
}