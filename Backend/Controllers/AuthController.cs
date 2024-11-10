using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                var (jwtToken, refreshToken) = await _authService.Register(model.Email, model.Password, model.LastName, model.FirstName);
                return Ok(new { JwtToken = jwtToken, RefreshToken = refreshToken });
            }
            catch (DbUpdateException dbEx)
            {
                var innerExceptionMessage = dbEx.InnerException != null ? dbEx.InnerException.Message : dbEx.Message;
                return BadRequest(new { Message = "Error saving changes: " + innerExceptionMessage });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login loginRequest) // Đổi sang async Task<IActionResult>
        {
            Console.WriteLine("Đây là: " + loginRequest.Email + " " + loginRequest.Password);
            try
            {
                var (jwtToken, refreshToken) = await _authService.Login(loginRequest.Email, loginRequest.Password);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true, // Bảo vệ cookie khỏi truy cập từ JavaScript
                    Expires = DateTime.UtcNow.AddDays(7) // Thời gian hết hạn cookie
                };
                Response.Cookies.Append("jwt", jwtToken, cookieOptions); // Thêm JWT vào cookie

                // Có thể thêm Refresh token nếu muốn
                Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
                return Ok(new { JwtToken = jwtToken, RefreshToken = refreshToken });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken) // Đổi sang async Task<IActionResult>
        {
            try
            {
                var (newJwtToken, newRefreshToken) = await _authService.RefreshToken(refreshToken);
                return Ok(new { JwtToken = newJwtToken, RefreshToken = newRefreshToken });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt"); // Xóa cookie chứa JWT
            Response.Cookies.Delete("refreshToken"); // Xóa cookie chứa Refresh token

            return Ok(new { Message = "Đăng xuất thành công" });
        }
    }
}


