using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class TypePostNotification
{
    public int TypeId { get; set; }

    public string TypeName { get; set; } = null!;

    public string Content { get; set; } = null!;

    public virtual ICollection<PostNotification> PostNotifications { get; set; } = new List<PostNotification>();
}
