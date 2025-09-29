using CommomTestUtilities.Requests;
using FluentAssertions;
using PixelManager.Communication.Responses;
using System.Net;
using System.Net.Http.Json;

namespace WebApi.Test.MetadadosDeImagem.Consultar;
public class ConsulteTodosTest(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
	private readonly HttpClient _httpClient = factory.CreateClient();

	[Fact]
	public async Task Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		await _httpClient.PostAsJsonAsync("MetadadosDeImagem", request);

		var response = await _httpClient.GetAsync("MetadadosDeImagem");

		response.StatusCode.Should().Be(HttpStatusCode.OK);
		var responseBody = await response.Content.ReadFromJsonAsync<List<ResponseMetadadosDeImagemJson>>();
		responseBody.Should().NotBeNull().And.HaveCount(1);
	}

	[Fact]
	public async Task Success_Returns_NoContent_When_Empty()
	{
		var response = await _httpClient.GetAsync("MetadadosDeImagem");

		response.StatusCode.Should().Be(HttpStatusCode.NoContent);
	}
}