using System.Collections.Concurrent;
using Backend.Helper;
using Microsoft.AspNetCore.SignalR;

namespace Backend.RealTime;
public class OnlineHub : Hub
{
	public static readonly Dictionary<int, string> UserIdConnections = new();

	public static bool IsOnline(int userId)
	{
		foreach (var item in UserIdConnections)
		{
			Console.WriteLine("đây là user: " + item);
		}

		return UserIdConnections.ContainsKey(userId);
	}

	public override async Task OnConnectedAsync()
	{
		Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
		int UserId = GetUserIdFromContext();
		var connectionId = Context.ConnectionId;
		Console.WriteLine(connectionId + " hêhheheh");
		UserIdConnections[UserId] = Context.ConnectionId;

		NotifyOnlineStatus(UserId, true);
		await base.OnConnectedAsync();
	}

	public override async Task OnDisconnectedAsync(Exception exception)
	{
		var userId = GetUserIdFromContext();
		UserIdConnections.Remove(userId);
		NotifyOnlineStatus(userId, false); // Thông báo trạng thái offline cho các client khác
		await base.OnDisconnectedAsync(exception);
	}

	public async Task SendMessage(int receiverUserId, string mess)
	{
		if (IsOnline(receiverUserId))
		{
			var connectionId = OnlineHub.UserIdConnections[receiverUserId];
			Console.WriteLine("đây là: " + connectionId);
			await Clients.All.SendAsync("ReceiveMessage", mess);
		}
	}


	private async Task NotifyOnlineStatus(int userId, bool isOnline)
	{
		await Clients.All.SendAsync("UpdateOnlineStatus", userId, isOnline); // Gửi trạng thái online cho tất cả các client
	}

	private int GetUserIdFromContext()
	{
		return MiddleWare.GetUserIdFromCookie(Context.GetHttpContext()?.Request);
	}
}
