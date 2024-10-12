using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class React
{
    public int ReactId { get; set; }

    public string ReactName { get; set; } = null!;

    public string ReactIcon { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
