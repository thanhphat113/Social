using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PostNotification
{
    public int PostNotificationId { get; set; }

    public int PostId { get; set; }

    public int FromUserId { get; set; }

    public int TypeId { get; set; }
    public bool? IsRead { get; set; }

    public DateTime DateCreated { get; set; }

    public virtual User FromUser { get; set; } = null!;

    public virtual Post Post { get; set; } = null!;

    public virtual TypePostNotification Type { get; set; }
}
