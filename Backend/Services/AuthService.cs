using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Backend.Models;
using Microsoft.IdentityModel.Tokens;

public class AuthService
{
    private readonly UserRepositories _userRepository;
    private readonly JwtService _jwtService;
    private readonly PasswordHasher<User> _passwordHasher;



    public AuthService(UserRepositories userRepository, JwtService jwtService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _passwordHasher = new PasswordHasher<User>(); // Khởi tạo PasswordHasher
    }

    // Đăng ký
    public async Task<(string jwtToken, string refreshToken)> Register(string email, string password, string lastname, string firstname)
    {
        var existingUser = await _userRepository.GetUserByEmail(email);
        if (existingUser != null) throw new Exception("Email đã tồn tại");

        var newUser = new User
        {
            Email = email,
            LastName = lastname,
            FirstName = firstname
        };

        // Băm mật khẩu và lưu vào User
        newUser.Password = _passwordHasher.HashPassword(newUser, password);

        bool userAdded = await _userRepository.AddUser(newUser); // Thêm await

        if (!userAdded) throw new Exception("Lỗi khi thêm người dùng vào cơ sở dữ liệu");

        var jwtToken = _jwtService.GenerateAccessToken(newUser);
        var refreshToken = _jwtService.GenerateRefreshToken(newUser);

        return (jwtToken, refreshToken);
    }

    // Đăng nhập
    public async Task<(string jwtToken, string refreshToken)> Login(string email, string password)
    {
        User user = await _userRepository.GetUserByEmail(email); // Sử dụng await
        if (user == null) throw new Exception("Email hoặc mật khẩu không đúng");

        // Xác minh mật khẩu
        var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
        if (passwordVerificationResult == PasswordVerificationResult.Failed)
            throw new Exception("Email hoặc mật khẩu không đúng");

        var jwtToken = _jwtService.GenerateAccessToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken(user);

        return (jwtToken, refreshToken);
    }

    // Refresh token
    public async Task<(string newJwtToken, string newRefreshToken)> RefreshToken(string refreshToken)
    {
        var principal = _jwtService.ValidateToken(refreshToken);
        if (principal == null || _jwtService.IsTokenExpired(principal))
            throw new SecurityTokenException("Refresh token không hợp lệ hoặc đã hết hạn");

        var userId = int.Parse(principal.Identity.Name);
        User user = await _userRepository.GetUserById(userId);

        var newJwtToken = _jwtService.GenerateAccessToken(user);
        var newRefreshToken = _jwtService.GenerateRefreshToken(user);

        return (newJwtToken, newRefreshToken);
    }
}
