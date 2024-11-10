using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class JwtService
{
    private readonly IConfiguration _config;
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _accessTokenExpirationMinutes;
    private readonly int _refreshTokenExpirationDays;

    public JwtService(IConfiguration config)
    {
        _config = config;
        _secretKey = _config["Jwt:Key"];
        _issuer = _config["Jwt:Issuer"];
        _audience = _config["Jwt:Audience"];
        _accessTokenExpirationMinutes = int.Parse(_config["Jwt:AccessTokenExpirationMinutes"]);
        _refreshTokenExpirationDays = int.Parse(_config["Jwt:RefreshTokenExpirationDays"]);
    }

    // Tạo Access Token
    public string GenerateJwtTokenAccess(string userId)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JTI mới cho mỗi token
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()), // Thêm thời gian phát hành
        };

        var keyValue = _config["Jwt:SecretKey"];

        if (string.IsNullOrEmpty(keyValue))
        {
            Console.WriteLine("Jwt:Key cannot be null or empty");
        }


        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:AccessTokenExpirationMinutes"])), // Thời gian hết hạn
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // Tạo Refresh Token (JWT)
    public string GenerateJwtTokenRefesh(string userId)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // JTI mới cho mỗi token
            new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()), // Thêm thời gian phát hành
        };

        var keyValue = _config["Jwt:SecretKey"];

        if (string.IsNullOrEmpty(keyValue))
        {
            Console.WriteLine("Jwt:Key cannot be null or empty");
        }


        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyValue));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:RefreshTokenExpirationDays"])), // Thời gian hết hạn
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
				// Sử dụng ClaimTypes.NameIdentifier thay cho ClaimTypes.Id
				new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays),
            Issuer = _issuer,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    // Xác thực và giải mã JWT
    public ClaimsPrincipal ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = false,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return principal;
        }
        catch
        {
            return null;
        }
    }

    public bool IsTokenExpired(ClaimsPrincipal principal)
    {
        var expirationClaim = principal.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
        if (expirationClaim == null) return true;

        var exp = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expirationClaim.Value));
        return exp.UtcDateTime <= DateTime.UtcNow;
    }
}


