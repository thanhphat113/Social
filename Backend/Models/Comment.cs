﻿using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int? PostId { get; set; }

    public int UserId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime DateCreated { get; set; }

    public DateTime DateUpdated { get; set; }

    public int? ChildOf { get; set; }

    public virtual Comment? ChildOfNavigation { get; set; }

    public virtual ICollection<Comment> InverseChildOfNavigation { get; set; } = new List<Comment>();

    public virtual Post? Post { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<React> Reacts { get; set; } = new List<React>();
}
