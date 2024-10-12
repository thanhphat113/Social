using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class TypeMedia
{
    public int TypeId { get; set; }

    public string? TypeName { get; set; }

    public virtual ICollection<Media> Media { get; set; } = new List<Media>();
}
