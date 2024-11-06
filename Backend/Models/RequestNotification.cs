using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class RequestNotification
{
    public int NotificationId { get; set; }

    public int FromUserId { get; set; }

    public int ToUserId { get; set; }

    public bool? IsAccept { get; set; }

    public bool? IsRead { get; set; }

    public DateTime DateCreated { get; set; }

    public virtual User FromUser { get; set; } = null!;

    public virtual User ToUser { get; set; } = null!;
}
