
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DTO;
using Backend.Helper;


namespace Backend.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class RelationshipController : ControllerBase
	{
		private readonly RelationshipService _RelaContext;
		private readonly RequestNotiService _RequestNotiContext;

        public RelationshipController(RelationshipService relaContext, RequestNotiService reRequestNoti)

        {
			_RelaContext = relaContext;
            _RequestNotiContext = reRequestNoti;
        }

        [HttpPost("request")]
        public async Task<IActionResult> SendFriendRequest([FromBody] FriendRequestDto request)
        {
            var fromUserId = MiddleWare.GetUserIdFromCookie(Request);
            if (fromUserId == -1)
                return Unauthorized("hahahahaha");

            if (fromUserId == request.ToUserId)
                return BadRequest("Cannot send friend request to yourself.");

            // Kiểm tra sự tồn tại trong cả hai bảng
            var isExist = await _RelaContext.CheckExist(fromUserId, request.ToUserId);
            if (isExist)
                return BadRequest("Relationship or friend request already exists.");

            // Thêm mối quan hệ mới
            var newRelationship = new Relationship
            {
                FromUserId = fromUserId,
                ToUserId = request.ToUserId,
                TypeRelationship = 1,
                DateCreated = DateTime.UtcNow
            };

            var relationshipResult = await _RelaContext.Add(newRelationship);

            // Thêm thông báo mới
            var requestNotification = new RequestNotification
            {
                FromUserId = fromUserId,
                ToUserId = request.ToUserId,
                IsAccept = null,
                IsRead = false,
                DateCreated = DateTime.UtcNow
            };

            var notificationResult = await _RequestNotiContext.Add(requestNotification);

            if (relationshipResult != null && notificationResult != null)
                return Ok(new { message = "Friend request sent successfully." });

            return BadRequest("An error occurred while sending the friend request.");
        }


        [HttpGet]
		public ActionResult<IEnumerable<string>> Get()
		{
			return new string[] { "value1", "value2" };
		}

		[HttpGet("{id}")]
		public ActionResult<IEnumerable<string>> GetFriend()
		{
			return new string[] { "value1", "value2" };
		}

		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}