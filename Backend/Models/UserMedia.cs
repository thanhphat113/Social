using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class UserMedia
{
	[JsonIgnore]

	public int UserId { get; set; }
	[JsonIgnore]
	public int MediaId { get; set; }
	public bool? IsProfilePicture { get; set; } = false;
	public bool? IsCoverPicture { get; set; } = false;


	public virtual Media Media { get; set; } = null!;

	[JsonIgnore]
	public virtual User User { get; set; } = null!;

}
