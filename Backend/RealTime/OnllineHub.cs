using System.Collections.Concurrent;
using Backend.DTO;
using Backend.Helper;
using Backend.Services.Interface;
using Microsoft.AspNetCore.SignalR;

namespace Backend.RealTime;
public class OnlineHub : Hub
{
	private readonly IMessageService _mess;

	public OnlineHub(IMessageService mess)
	{
		_mess = mess;
	}

	public static readonly Dictionary<int, string> UserIdConnections = new();
	public static readonly List<int> UserIdCalling = new();

	public static bool IsOnline(int userId)
	{
		return UserIdConnections.ContainsKey(userId);
	}

	public override async Task OnConnectedAsync()
	{
		int UserId = GetUserIdFromContext();
		var connectionId = Context.ConnectionId;
		UserIdConnections[UserId] = connectionId;

		NotifyOnlineStatus(UserId, true);
		await base.OnConnectedAsync();
	}

	public override async Task OnDisconnectedAsync(Exception exception)
	{
		var userId = GetUserIdFromContext();

		UserIdConnections.Remove(userId);
		UserIdCalling.Remove(userId);
		NotifyOnlineStatus(userId, false); // Thông báo trạng thái offline cho các client khác
		await base.OnDisconnectedAsync(exception);
	}

	public async Task SendMessage(int receiverUserId, string mess)
	{
		if (IsOnline(receiverUserId))
		{
			var connectionId = UserIdConnections[receiverUserId];
			Console.WriteLine("đây là: " + connectionId);
			await Clients.All.SendAsync("ReceiveMessage", mess);
		}
	}

	private async Task NotifyOnlineStatus(int userId, bool isOnline)
	{
		await Clients.All.SendAsync("UpdateOnlineStatus", userId, isOnline); // Gửi trạng thái online cho tất cả các client
	}

	public async Task DeclineCall(int callerId)
	{
		try
		{
			var connectionId = UserIdConnections[callerId];
			UserIdCalling.Remove(callerId);
			if (string.IsNullOrEmpty(connectionId))
			{
				Console.WriteLine("Kết nối không hợp lệ, không tìm thấy connectionId");
				return;
			}

			await Clients.Client(connectionId).SendAsync("CallDeclined", new { IsAccept = false, Message = "Không chấp nhận cuộc gọi" });
		}
		catch (Exception ex)
		{
			// Log lỗi nếu có
			Console.WriteLine($"Lỗi trong DeclineCall: {ex.Message}");
		}
	}

	public async Task AcceptCall(int callerId, RTCSessionDescription offer)
	{
		try
		{
			Console.WriteLine(offer.type);
			var CalleeId = GetUserIdFromContext();
			UserIdCalling.Add(CalleeId);
			var Message = await _mess.FindBy2User(CalleeId, callerId);
			var connectionId = UserIdConnections[callerId];
			await Clients.Client(connectionId).SendAsync("RequestCall", new { CalleeId, callerId, offer = offer });
		}
		catch (Exception ex)
		{
			// Log lỗi nếu có
			Console.WriteLine($"Lỗi trong DeclineCall: {ex.Message}");
		}
	}

	public async Task LeaveCall(int callerId, int calleeId)
	{
		var item = GetUserIdFromContext();
		var connectionId = UserIdConnections[item == callerId ? calleeId : callerId];
		UserIdCalling.Remove(callerId);
		UserIdCalling.Remove(calleeId);
		await Clients.Client(connectionId).SendAsync("sendLeaveCall", null);
	}

	public async Task SendAnswer(int calleeId, RTCSessionDescription answer)
	{
		Console.WriteLine(answer.type);
		var callerId = GetUserIdFromContext();
		var connectionId = UserIdConnections[calleeId];
		await Clients.Client(connectionId).SendAsync("receiveAnswer", new { answer = answer, callerId = callerId });
	}

	public async Task SendCandidate(int sendId, object candidate)
	{
		var connectionId = UserIdConnections[sendId];
		await Clients.Client(connectionId).SendAsync("receiveCandidate", candidate);
	}


	private int GetUserIdFromContext()
	{
		return MiddleWare.GetUserIdFromCookie(Context.GetHttpContext()?.Request);
	}

	public static string GetConnectionId(int userid)
	{
		if (UserIdConnections.ContainsKey(userid))
		{
			return UserIdConnections[userid];
		}
		return null;
	}

}
