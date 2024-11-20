using System;

namespace Backend.DTO
{
    public class UserDTO
    {
        public int UserId { get; set; }
        public string? FirstName { get; set; } = null!;
        public string? LastName { get; set; } = null!;
        public int? ProfilePicture { get; set; }
    }
}