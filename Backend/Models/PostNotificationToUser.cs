using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class PostNotificationToUser
{
    public int ToUserId { get; set; }

    public int PostNotificationId { get; set; }

    public bool? IsRead { get; set; }

    public virtual PostNotification PostNotification { get; set; } = null!;

    public virtual User ToUser { get; set; } = null!;
}
