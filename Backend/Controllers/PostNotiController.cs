using Backend.DTO;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostNotiController : ControllerBase
	{
		private readonly PostNotiService _service;
		public PostNotiController(PostNotiService service)
		{
			_service = service;
		}

		[HttpGet("findbyid")]
		public async Task<ActionResult> GetByUserId([FromQuery] int userid)
		{
			var results = await _service.FindByUserId(userid);
			return Ok(results);
		}

        //get by id 
        [HttpGet("getById")]
        public async Task<ActionResult> GetById([FromQuery] int id)
        {
            var result = await _service.GetById(id);
            if (result == null)
            {
                return BadRequest("Khong tim thay duoc noti");
            }

			Console.WriteLine("result: " + result);
            return Ok(result);
        }


        // update isread
        [HttpPost("update-isread")]
		public async Task<ActionResult> UpdateIsRead([FromQuery]  int PostNotificationId)
		{

            var result = await _service.UpdateIsRead(PostNotificationId);
            if (!result)
            {
                return BadRequest("Khong tim thay duoc noti");
            }
            return await GetById(PostNotificationId);

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