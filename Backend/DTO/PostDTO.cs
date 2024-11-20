using System;
using System.Collections.Generic;

namespace Backend.DTO
{
    public class PostDTO
    {
        public int PostId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime DateCreated { get; set; }
        public int CreatedByUserId { get; set; }
        public UserDTO? CreatedByUser { get; set; } = null!;
        public IEnumerable<MediaDTO> Media { get; set; } = new List<MediaDTO>();
        public IEnumerable<CommentDTO> Comments { get; set; } = new List<CommentDTO>();
    }
}