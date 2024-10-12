using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class TypeRelationship
{
    public int TypeId { get; set; }

    public string? TypeName { get; set; }

    public virtual ICollection<Relationship> Relationships { get; set; } = new List<Relationship>();
}
