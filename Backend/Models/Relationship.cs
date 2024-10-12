using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Relationship
{
    public int RelationshipId { get; set; }

    public int? TypeRelationship { get; set; }

    public int FromUserId { get; set; }

    public int ToUserId { get; set; }

    public DateTime DateCreated { get; set; }

    public virtual User FromUser { get; set; } = null!;

    public virtual User ToUser { get; set; } = null!;

    public virtual TypeRelationship? TypeRelationshipNavigation { get; set; }
}
