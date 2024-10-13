using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Post
{
    public int PostId { get; set; }

    public string? Content { get; set; }

    public int? PrivacyId { get; set; }

    public int? GroupId { get; set; }

    public int CreatedByUserId { get; set; }

    public DateTime DateCreated { get; set; }

    public DateTime DateUpdated { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual User CreatedByUser { get; set; } = null!;

    public virtual UserGroup? Group { get; set; }

    public virtual ICollection<Media> Media { get; set; } = new List<Media>();

    public virtual ICollection<PostNotification> PostNotifications { get; set; } = new List<PostNotification>();

    public virtual PrivacySetting? Privacy { get; set; }

    public virtual ICollection<SharePost> SharePosts { get; set; } = new List<SharePost>();
}
