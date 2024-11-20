namespace Backend.DTO;

public class CreatePostDTO
{
    public string Content { get; set; }
    public List<IFormFile> Files { get; set; }
}