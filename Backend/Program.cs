using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using Backend.Data;

using Backend.Repository.Repository;
using Backend.Repository.Interface;
using Backend.Repository;
using Backend.Models;
using Backend.Services;
using Backend.Helper;
using Backend.Services.Interface;
using ReactPostService = Backend.Services.ReactPostService;
using Backend.RealTime;

//var builder = WebApplication.CreateBuilder(args);
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    WebRootPath = "wwwroot" // Đặt WebRootPath tại đây
});

builder.Services.AddSignalR();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SocialMediaContext>(options =>
    options.UseLazyLoadingProxies()
        .EnableSensitiveDataLogging() // Bật logging nhạy cảm
        .LogTo(Console.WriteLine, LogLevel.Information)
        .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.WriteIndented = true; // Nếu muốn JSON dễ đọc hơn
    });
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<GroupRepositories>();
/*builder.Services.AddScoped<IRepositories<UserGroup>, GroupRepositories>();*/

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IChatInMessService, ChatInMessageService>();
builder.Services.AddScoped<RequestNotiService>();
builder.Services.AddScoped<PostNotiService>();
builder.Services.AddScoped<RelationshipService>();
builder.Services.AddScoped<IService<MainTopic>, MainTopicService>();

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<MediaService>();
builder.Services.AddScoped<MainTopicService>();

builder.Services.AddScoped<GroupService>();
builder.Services.AddScoped<JwtService>();

builder.Services.AddScoped<HistorySearchService>();
builder.Services.AddScoped<GroupChatService>();
builder.Services.AddScoped<ReactPostService>();

//Post

/*builder.Services.AddScoped<PostService>();*/

//Comment
builder.Services.AddScoped<ICommentService, CommentService>();

builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

//Post

// builder.Services.AddScoped<PostService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var token = context.Request.Cookies["jwt"];
            if (!string.IsNullOrEmpty(token))
            {
                context.Token = token;
            }

            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<SocialMediaContext>();
        // Kiểm tra kết nối
        context.Database.EnsureCreated(); // Hoặc context.Database.Migrate(); nếu bạn muốn áp dụng các migration
        if (context.Database.CanConnect())
        {
            Console.WriteLine("Kết nối đến cơ sở dữ liệu thành công!");
        }
        else
        {
            Console.WriteLine("Không thể kết nối đến cơ sở dữ liệu.");
        }
    }
    catch (Exception ex)
    {
        // Xử lý lỗi (nếu cần)
        Console.WriteLine($"Lỗi khi kết nối đến cơ sở dữ liệu: {ex.Message}");
    }
}

app.UseRouting();
app.UseHttpsRedirection();



app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<OnlineHub>("/onlinehub");
});

app.MapControllers();

app.UseStaticFiles();

app.Run();
