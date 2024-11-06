namespace Backend.Services;

using Backend.Models;
using Backend.Repositories;

public class PostService
{
    private readonly PostRepository _postRepository;

    public PostService(PostRepository postRepository)
    {
        _postRepository = postRepository;
    }

    public async Task<List<Post>> GetAllPost()
    {
        return await _postRepository.GetAll();
    }

    public async Task<Post> GetPostById(int id)
    {
        return await _postRepository.GetById(id);
    }

    public async Task<bool> AddPost(Post post)
    {
        return await _postRepository.Add(post);
    }

    public async Task<bool> UpdatePost(Post post)
    {
        return await _postRepository.Update(post);
    }

    public async Task<bool> DeletePost(int id)
    {
        return await _postRepository.Delete(id);
    }
}
