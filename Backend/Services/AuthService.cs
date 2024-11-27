using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Backend.DTO;
using Microsoft.IdentityModel.Tokens;
using Backend.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;


namespace Backend.Services;

public class AuthService
{
    private readonly UserService _user;
    private readonly JwtService _jwtService;
    private readonly PasswordHasher<User> _passwordHasher;



    public AuthService(UserService user, JwtService jwtService)
    {
        _user = user;
        _jwtService = jwtService;
        _passwordHasher = new PasswordHasher<User>(); // Khởi tạo PasswordHasher
    }

    // Đăng ký
    // public async Task<(string jwtToken, string refreshToken)> Register(string email, string password, string lastname, string firstname)
    // {
    //     // var existingUser = await _userRepository.GetUserByEmail(email);
    //     // if (existingUser != null) throw new Exception("Email đã tồn tại");

    //     var newUser = new User
    //     {
    //         Email = email,
    //         LastName = lastname,
    //         FirstName = firstname
    //     };

    //     // Băm mật khẩu và lưu vào User
    //     newUser.Password = _passwordHasher.HashPassword(newUser, password);

    //     var userAdded = await _userRepository.Add(newUser); // Thêm await

    //     if (userAdded == null) throw new Exception("Lỗi khi thêm người dùng vào cơ sở dữ liệu");

    //     // var newJwtToken = _jwtService.GenerateAccessToken(user);
    //     // var newRefreshToken = _jwtService.GenerateRefreshToken(user);cx

    //     // return (newJwtToken, newRefreshToken);
    //     return ("", "");
    // }

    // Đăng nhập
    public async Task<string> Login(string email, string password)
    {

        User user = await _user.FindToLogin(email, password); // Sử dụng await
        if (user == null) throw new Exception("Email hoặc mật khẩu không đúng");
        Console.WriteLine("user đã tìm thâyts");
        // Xác minh mật khẩu
        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
        if (passwordVerificationResult == PasswordVerificationResult.Failed)
            throw new Exception("Email hoặc mật khẩu không đúng");
        Console.WriteLine("Chưa chạy tạo token");
        var jwtToken = _jwtService.GenerateJwtTokenAccess(user.UserId.ToString());
        Console.WriteLine("Chưa chạy tạo token");

        // var refreshToken = _jwtService.GenerateJwtTokenRefesh(user.UserId.ToString());
        Console.WriteLine("Đã `chạy tạo token");


        return jwtToken;
    }

    // Refresh token
    public async Task<(string newJwtToken, string newRefreshToken)> RefreshToken(string refreshToken)
    {
        var principal = _jwtService.ValidateToken(refreshToken);
        if (principal == null || _jwtService.IsTokenExpired(principal))
            throw new SecurityTokenException("Refresh token không hợp lệ hoặc đã hết hạn");

        var userId = int.Parse(principal.Identity.Name);
        UserLogin user = await _user.GetLoginById(userId);

        // var newJwtToken = _jwtService.GenerateAccessToken(user);
        // var newRefreshToken = _jwtService.GenerateRefreshToken(user);

        // return (newJwtToken, newRefreshToken);
        return ("", "");
    }
}
