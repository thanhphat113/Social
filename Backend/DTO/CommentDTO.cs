namespace Backend.DTO;

public class CommentDTO
{
	public int CommentId { get; set; }
	public string Content { get; set; } = null!;
	public DateTime DateCreated { get; set; }
}