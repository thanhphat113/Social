using System.Security.Cryptography;
using Backend.Helper;
using Backend.Models;
using Backend.Services;
using Backend.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MediaController : ControllerBase
	{
		private readonly MediaService _media;
		private readonly IWebHostEnvironment _env;

		public MediaController(MediaService media, IWebHostEnvironment env)
		{
			_env = env;
			_media = media;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] int MessageId, string? Type = "media")
		{
			return Ok(await _media.FindByMessageId(MessageId, Type));
		}


        //[HttpPost("change-profile-picture")]
        //public async Task<IActionResult> ChangeProfilePicture([FromForm] IFormFile newProfilePicture)
        //{
        //    if (newProfilePicture == null || newProfilePicture.Length == 0)
        //    {
        //        return BadRequest("Profile picture file is required.");
        //    }

        //    var userId = MiddleWare.GetUserIdFromCookie(Request);
        //    if (userId == null)
        //    {
        //        return Unauthorized("User not logged in.");
        //    }

        //    bool result = await _media.ChangeProfilePicture(userId, newProfilePicture);
        //    if (result)
        //    {
        //        return Ok(new { message = "Profile picture updated successfully." });
        //    }

        //    return StatusCode(500, "Failed to update profile picture.");
        //}


        //[HttpPost("change-cover-photo")]
        //public async Task<IActionResult> ChangeCoverPhoto([FromForm] IFormFile newCoverPhoto)
        //{
        //    if (newCoverPhoto == null || newCoverPhoto.Length == 0)
        //    {
        //        return BadRequest("Cover photo file is required.");
        //    }

        //    var userId = MiddleWare.GetUserIdFromCookie(Request);
        //    if (userId == null)
        //    {
        //        return Unauthorized("User not logged in.");
        //    }

        //    bool result = await _media.ChangeProfilePicture(userId, newCoverPhoto);
        //    if (result)
        //    {
        //        return Ok(new { message = "Cover photo updated successfully." });
        //    }

        //    return StatusCode(500, "Failed to update cover photo.");
        //}
    }
}