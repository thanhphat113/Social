using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Models;

namespace Backend.DTO;

public partial class RequestUser
{
	public int UserId { get; set; }

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;


	public virtual Media? ProfilePicture { get; set; } = null;

	public int? GenderId { get; set; }
	public int NotificationId { get; set; }


	public bool? IsAccept { get; set; }

	public bool? IsRead { get; set; }


}