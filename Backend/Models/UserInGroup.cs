using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class UserInGroup
{
    public int UserId { get; set; }

    public int GroupId { get; set; }

    public DateTime DateIn { get; set; }

    public virtual UserGroup Group { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
