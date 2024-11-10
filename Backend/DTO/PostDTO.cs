using System;
using System.Collections.Generic;

namespace Backend.DTO
{
    public class PostDTO
    {
        public int PostId { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public UserDTO CreatedByUser { get; set; }
        public List<string> ImageUrls { get; set; }
    }
}