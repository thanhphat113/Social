using Backend.Models;
using Backend.Services.Interface;
using Backend.Repositories.Interface;
using Backend.Services;
using AutoMapper;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unit;


        public UserService(IUnitOfWork unit, IMapper mapper)
        {
            _mapper = mapper;
            _unit = unit;
        }
        public async Task<User> Add(User value)
        {
            try
            {
                await _unit.Users.AddAsync(value);
                if (await _unit.CompleteAsync())
                {
                    return value;
                }
                throw new ArgumentException("Thêm vào database không thành công");
            }
            catch (System.Exception ex)
            {
                throw new Exception("Thêm sản phẩm không thành công.", ex);
            }
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<User>> FriendsWithChat(int UserId, IEnumerable<User> friends)
        {
            foreach (var item in friends)
            {
                var predicate = (Expression<Func<Message, bool>>)(m =>
                (m.User1 == item.UserId && m.User2 == UserId) ||
                (m.User1 == UserId && m.User2 == item.UserId));
                var selector = (Expression<Func<Message, IEnumerable<ChatInMessage>>>)
                            (m => m.ChatInMessages);
                var mess = (ICollection<ChatInMessage>)await _unit.Message.FindAsyncMany(predicate, selector);


                item.ChatInMessages = mess;
            }


            return friends;
        }

        public async Task<User> FindToLogin(string email, string password)
        {
            var user = await _unit.Users.GetByConditionAsync(u => u.Email == email);

            if (user == null) return null;

            var passHasher = new PasswordHasher<User>();
            var passwordVerificationResult = passHasher.VerifyHashedPassword(user, user.Password, password);

            if (passwordVerificationResult == PasswordVerificationResult.Success)
            {
                return user;
            }
            else
            {
                return null;
            }
        }

        public Task<IEnumerable<User>> GetAll()
        {
            return _unit.Users.GetAll();
        }

        public async Task<UserLogin> GetLoginById(int id)
        {
            var item = await _unit.Users.GetByIdAsync(id);
            return _mapper.Map<UserLogin>(item);
        }

        public Task<IEnumerable<User>> GetListById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ValidateEmail> IsHasEmail(string email)
        {
            if (!email.EndsWith("@gmail.com") && !email.EndsWith("@gmail.com.vn"))
                return new ValidateEmail("Email phải có đuôi là @gmail.com hoặc @gmail.com.vn", false);
            if (string.IsNullOrEmpty(email))
                return new ValidateEmail("Vui lòng nhập email", false);

            var item = await _unit.Users.GetByConditionAsync(u => u.Email == email);

            if (item != null)
                return new ValidateEmail("Email này đã được đăng ký vui lòng nhập lại", false);

            return new ValidateEmail("Email hợp lệ", true);
        }

        public Task<bool> Update(User value)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserPrivate>> GetFriends(int id)
        {
            var predicate = (Expression<Func<Relationship, bool>>)(r =>
            (r.FromUserId == id || r.ToUserId == id) && r.TypeRelationship == 2);
            var selector = (Expression<Func<Relationship, User>>)
                    (r => r.FromUserId == id ? r.ToUser : r.FromUser);

            var users = await _unit.Relationship.FindAsync<User>(predicate, selector);

            foreach (var item in users)
            {
                var UserMedia = await _unit.UserMedia.GetByConditionAsync(u => u.UserId == item.UserId && u.IsProfilePicture == true);
                if (UserMedia == null)
                {
                    continue;
                };

                Console.WriteLine(item.LastName + " " + item.UserId + " có ảnh");
                var profilePicture = await _unit.Media.GetByConditionAsync(m => m.MediaId == UserMedia.MediaId);

                item.ProfilePicture = profilePicture;
            }

            var withChat = await FriendsWithChat(id, users);

            var result = withChat.Select(user => _mapper.Map<UserPrivate>(user));

            return result;
        }


        public Task<User> GetById(int id)
        {
            throw new NotImplementedException();
        }


        public async Task<IEnumerable<UserPrivate>> GetListByName(string name, int UserId)
        {
            var users = await _unit.Users.FindAsync<User>(u => u.UserId != UserId &&
                    (u.LastName.Contains(name) || u.FirstName.Contains(name)));
            var result = _mapper.Map<IEnumerable<UserPrivate>>(users);
            return result;
        }
    }

}