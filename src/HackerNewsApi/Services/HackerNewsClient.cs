using System.Net.Http.Json;
using HackerNewsApi.Models;
using HackerNewsApi.Options;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace HackerNewsApi.Services;

public sealed class HackerNewsClient : IHackerNewsClient
{
    private const string BestStoriesCacheKey = "hackernews.beststories";
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _memoryCache;
    private readonly HackerNewsOptions _options;

    public HackerNewsClient(HttpClient httpClient, IMemoryCache memoryCache, IOptions<HackerNewsOptions> options)
    {
        _httpClient = httpClient;
        _memoryCache = memoryCache;
        _options = options.Value;
    }

    public async Task<IReadOnlyList<BestStoryDto>> GetBestStoriesAsync(int count, CancellationToken cancellationToken)
    {
        var ids = await GetBestStoryIdsAsync(cancellationToken);
        var selectedIds = ids.Take(count).ToArray();

        var throttler = new SemaphoreSlim(_options.MaxConcurrentRequests);
        var tasks = selectedIds.Select(async id =>
        {
            await throttler.WaitAsync(cancellationToken);
            try
            {
                return await GetStoryAsync(id, cancellationToken);
            }
            finally
            {
                throttler.Release();
            }
        });

        var stories = await Task.WhenAll(tasks);

        return stories
            .Where(story => story is not null)
            .Select(story => story!)
            .OrderByDescending(story => story.Score)
            .ToList();
    }

    private async Task<IReadOnlyList<int>> GetBestStoryIdsAsync(CancellationToken cancellationToken)
    {
        if (_memoryCache.TryGetValue(BestStoriesCacheKey, out IReadOnlyList<int>? cachedIds))
        {
            return cachedIds;
        }

        var ids = await _httpClient.GetFromJsonAsync<List<int>>("beststories.json", cancellationToken)
            ?? new List<int>();

        _memoryCache.Set(BestStoriesCacheKey, ids, _options.BestStoriesCacheDuration);

        return ids;
    }

    private async Task<BestStoryDto?> GetStoryAsync(int id, CancellationToken cancellationToken)
    {
        var cacheKey = $"hackernews.item.{id}";
        if (_memoryCache.TryGetValue(cacheKey, out BestStoryDto? cachedStory))
        {
            return cachedStory;
        }

        var item = await _httpClient.GetFromJsonAsync<HackerNewsItem>($"item/{id}.json", cancellationToken);
        if (item is null || !string.Equals(item.Type, "story", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var story = new BestStoryDto
        {
            Title = item.Title,
            Uri = item.Url,
            PostedBy = item.By,
            Time = DateTimeOffset.FromUnixTimeSeconds(item.Time).ToString("O"),
            Score = item.Score,
            CommentCount = item.Descendants
        };

        _memoryCache.Set(cacheKey, story, _options.StoryCacheDuration);

        return story;
    }
}
