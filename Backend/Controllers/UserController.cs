using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService; // Sử dụng UserService
        private readonly JwtService _jwtService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var jwtToken = Request.Cookies["jwt"]; // Đọc JWT từ cookie
            if (string.IsNullOrEmpty(jwtToken))
            {
                return Unauthorized(new { Message = "Người dùng chưa đăng nhập" });
            }

            // Giải mã token và xử lý
            var principal = _jwtService.ValidateToken(jwtToken);
            if (principal == null)
            {
                return Unauthorized(new { Message = "Token không hợp lệ" });
            }

           
            // Giả định rằng bạn đã có phương thức GetAll trong UserRepositories
            var users = await _userService.GetAllUsers(); // Cần implement phương thức GetAll trong UserService
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUserById(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message); // Trả về thông báo lỗi nếu không tìm thấy người dùng
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User newUser)
        {
            if (newUser == null)
            {
                return BadRequest("Người dùng không hợp lệ");
            }

            // Gọi phương thức thêm người dùng trong UserRepositories
            bool userAdded = await _userService.AddUser(newUser); // Cần implement phương thức AddUser trong UserService
            if (!userAdded)
            {
                return StatusCode(500, "Lỗi khi thêm người dùng vào cơ sở dữ liệu");
            }

            return CreatedAtAction(nameof(GetUser), new { id = newUser.UserId }, newUser); // Giả định rằng User có thuộc tính Id
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest("Thông tin người dùng không hợp lệ" + updatedUser.UserId + updatedUser.LastName);
            }

            try
            {
                bool userUpdated = await _userService.UpdateUser(id, updatedUser);
                if (!userUpdated)
                {
                    return StatusCode(500, "Lỗi khi cập nhật người dùng");
                }

                return StatusCode(200,"Updated");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message); // Trả về thông báo lỗi nếu không tìm thấy người dùng
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Kiểm tra xem người dùng có tồn tại không
            var existingUser = await _userService.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound("Người dùng không tồn tại");
            }

            // Xóa người dùng
            bool userDeleted = await _userService.DeleteUser(id); // Cần implement phương thức DeleteUser trong UserService
            if (!userDeleted)
            {
                return StatusCode(500, "Lỗi khi xóa người dùng");
            }

            return NoContent();
        }
    }
}
