using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class PostMedia
{
    public int PostId { get; set; }

    public int MediaId { get; set; }

    public virtual Media Media { get; set; } = null!;

    public virtual Post Post { get; set; } = null!;
}
