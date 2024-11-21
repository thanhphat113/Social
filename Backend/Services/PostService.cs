// namespace Backend.Services;

using Backend.Models;
using Backend.Repositories;
using Backend.DTO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Backend.Data;

public class PostService
{
    private readonly PostRepository _postRepository;
    private readonly IWebHostEnvironment _hostEnvironment;
    private readonly SocialMediaContext _context;

    public PostService(PostRepository postRepository, IWebHostEnvironment hostEnvironment, SocialMediaContext context)
    {
        _postRepository = postRepository;
        _hostEnvironment = hostEnvironment;
        _context = context;
    }

    public async Task<List<PostDTO>> GetAllPost()
    {
        return await _postRepository.GetAllUser();
    }

    public async Task<PostDTO> GetPostById(int id)
    {
        return await _postRepository.GetById(id);
    }

    public async Task<bool> CreatePost(PostDTO post)
    {
        return await _postRepository.Add(post);
    }

    public async Task<bool> CreatePostWithMedia(PostDTO postDTO, List<IFormFile> mediaFiles)
    {
        if (string.IsNullOrEmpty(_hostEnvironment.WebRootPath))
        {
            throw new InvalidOperationException("WebRootPath is not set.");
        }

        var mediaPath = Path.Combine(_hostEnvironment.WebRootPath, "media");

        // Tạo thư mục media nếu chưa tồn tại
        if (!Directory.Exists(mediaPath))
        {
            Directory.CreateDirectory(mediaPath);
        }

        var mediaList = new List<MediaDTO>();
        if (mediaFiles != null && mediaFiles.Any())
        {
            foreach (var file in mediaFiles)
            {
                var fileName = Path.GetFileName(file.FileName);
                var filePath = Path.Combine(_hostEnvironment.WebRootPath, "media", fileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                mediaList.Add(new MediaDTO
                {
                    Src = filePath,
                    PostId = postDTO.PostId
                });
            }
        }

        return await _postRepository.AddPostWithMedia(postDTO, mediaList);
    }

    public async Task<bool> UpdatePost(int id, PostDTO postDTO)
    {
        return await _postRepository.Update(id, postDTO);
    }

    /*public async Task<bool> DeletePost(int id)
    {
        return await _postRepository.Delete(id);
    }*/
}
