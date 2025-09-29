using CommomTestUtilities.Requests;
using FluentAssertions;
using PixelManager.Communication.Responses;
using System.Net;
using System.Net.Http.Json;

namespace WebApi.Test.MetadadosDeImagem.Criar;
public class CrieMetadadosDeImagem : IClassFixture<CustomWebApplicationFactory>
{
	private readonly HttpClient _httpClient;

	public CrieMetadadosDeImagem(CustomWebApplicationFactory factory)
	{
		_httpClient = factory.CreateClient();
	}

	[Fact]
	public async Task Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();

		var response = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", request);

		response.StatusCode.Should().Be(HttpStatusCode.Created);

		var responseBody = await response.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();

		responseBody.Should().NotBeNull();
		responseBody.NomeDoArquivo.Should().Be(request.NomeDoArquivo);
		responseBody.Id.Should().NotBeEmpty();
	}

	[Fact]
	public async Task Error_Request_Invalido()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.NomeDoArquivo = string.Empty;

		var response = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", request);

		response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

		var responseBody = await response.Content.ReadFromJsonAsync<ResponseErros>();

		responseBody.Should().NotBeNull();
		responseBody.Errors.Should().ContainSingle()
			.And.Contain("O nome do arquivo é obrigatório.");
	}
}
