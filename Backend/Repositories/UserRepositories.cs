using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Data;

namespace Backend.Repositories;
	public class UserRepositories : IRepositories<User>
	{
		private readonly SocialMediaContext _context;
		public UserRepositories(SocialMediaContext context)
        {
            _context = context;
        }

		public async Task<List<User>> GetAll()
        {
			try{
				return await _context.Users.ToListAsync();
			}catch{
				throw new Exception("User list is null.");
				return new List<User>();
			}
        }

		public async Task<List<User>> GetListById(int id){
			throw new NotImplementedException();
		}
    	public async Task<User> GetById(int id){
			throw new NotImplementedException();
		}
    	public async Task<bool> Add(User product){
			throw new NotImplementedException();
		}
    	public async Task<bool> Update(User product){
			throw new NotImplementedException();
		}
    	public async Task<bool> Delete(int id){
			throw new NotImplementedException();
		}

		
	}