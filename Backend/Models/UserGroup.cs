using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UserGroup
{
    public int GroupId { get; set; }

    public string GroupName { get; set; } = null!;

    public string? Bio { get; set; }

    public string? ProfilePicture { get; set; }

    public int? MemberCount { get; set; }

    public string? CoverPhoto { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime DateUpdated { get; set; }

    public int CreatedByUserId { get; set; }

    public int? PrivacyId { get; set; }

    public virtual User CreatedByUser { get; set; } = null!;

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual PrivacySetting? Privacy { get; set; }

    public virtual ICollection<UserInGroup> UserInGroups { get; set; } = new List<UserInGroup>();
}
