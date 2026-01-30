using HackerNewsApi.Models;

namespace HackerNewsApi.Services;

public interface IHackerNewsClient
{
    Task<IReadOnlyList<BestStoryDto>> GetBestStoriesAsync(int count, CancellationToken cancellationToken);
}
