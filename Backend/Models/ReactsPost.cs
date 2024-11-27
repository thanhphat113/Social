using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ReactsPost
{
    public int UserId { get; set; }

    public int PostId { get; set; }

    public virtual Post? Post { get; set; } = null!;

    public virtual User? User { get; set; } = null!;
}
