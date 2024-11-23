using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Models;

namespace Backend.DTO;

public partial class UserLogin
{
	public int UserId { get; set; }

	public string FirstName { get; set; } = null!;

	public string LastName { get; set; } = null!;

	public string? Bio { get; set; }

	public string? Location { get; set; }

	public string Email { get; set; } = null!;

	public Media? ProfilePicture { get; set; } = null;

	public int? GenderId { get; set; }

	public bool? IsOnline { get; set; } = false;

	public DateTime DateCreated { get; set; }

	public DateTime DateUpdated { get; set; }
}