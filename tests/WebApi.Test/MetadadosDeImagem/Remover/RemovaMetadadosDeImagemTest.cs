using CommomTestUtilities.Requests;
using FluentAssertions;
using PixelManager.Communication.Responses;
using System.Net;
using System.Net.Http.Json;

namespace WebApi.Test.MetadadosDeImagem.Remover;
public class RemovaMetadadosDeImagemTest(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
	private readonly HttpClient _httpClient = factory.CreateClient();

	[Fact]
	public async Task Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		var responseInicial = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", request);
		var metadadoCriado = await responseInicial.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();

		var response = await _httpClient.DeleteAsync($"MetadadosDeImagem/{metadadoCriado!.Id}");

		response.StatusCode.Should().Be(HttpStatusCode.NoContent);

		var getResponse = await _httpClient.GetAsync($"MetadadosDeImagem/{metadadoCriado.Id}");
		getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}

	[Fact]
	public async Task Error_NotFound()
	{
		var idInexistente = "metadados/999-A";

		var response = await _httpClient.DeleteAsync($"MetadadosDeImagem/{idInexistente}");

		response.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}
}
