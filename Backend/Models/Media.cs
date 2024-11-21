using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class Media
{
    public int MediaId { get; set; }


    public string Src { get; set; } = null!;

    public int? MediaType { get; set; }

    public virtual TypeMedia? MediaTypeNavigation { get; set; }

    [JsonIgnore]
    public virtual ICollection<PostMedia> PostMedia { get; set; }


    [JsonIgnore]
    public virtual ICollection<UserMedia> UserMedia { get; set; } = new List<UserMedia>();
}
