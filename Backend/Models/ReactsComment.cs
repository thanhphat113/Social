using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class ReactsComment
{
    public int UserId { get; set; }

    public int CommentId { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
