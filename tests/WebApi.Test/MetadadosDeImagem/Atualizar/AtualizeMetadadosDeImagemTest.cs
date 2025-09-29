using CommomTestUtilities.Requests;
using FluentAssertions;
using PixelManager.Communication.Responses;
using System.Net;
using System.Net.Http.Json;

namespace WebApi.Test.MetadadosDeImagem.Atualizar;
public class AtualizeMetadadosDeImagemTest(CustomWebApplicationFactory factory) : IClassFixture<CustomWebApplicationFactory>
{
	private readonly HttpClient _httpClient = factory.CreateClient();

	[Fact]
	public async Task Success()
	{
		var requestInicial = RequestMetadadosDeImagemJsonBuilder.Build();
		var responseInicial = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", requestInicial);
		var metadadoCriado = await responseInicial.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();

		var requestAtualizacao = RequestMetadadosDeImagemJsonBuilder.Build();

		var response = await _httpClient.PutAsJsonAsync($"MetadadosDeImagem/{metadadoCriado!.Id}", requestAtualizacao);

		response.StatusCode.Should().Be(HttpStatusCode.NoContent);
	}

	[Fact]
	public async Task Error_NotFound()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		var idInexistente = "metadados/999-A";

		var response = await _httpClient.PutAsJsonAsync($"MetadadosDeImagem/{idInexistente}", request);

		response.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}

	[Fact]
	public async Task Error_Request_Invalido()
	{
		var requestInicial = RequestMetadadosDeImagemJsonBuilder.Build();
		var responseInicial = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", requestInicial);
		var metadadoCriado = await responseInicial.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();

		var requestAtualizacao = RequestMetadadosDeImagemJsonBuilder.Build();
		requestAtualizacao.NomeDoArquivo = string.Empty;

		var response = await _httpClient.PutAsJsonAsync($"MetadadosDeImagem/{metadadoCriado!.Id}", requestAtualizacao);

		response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
		var responseBody = await response.Content.ReadFromJsonAsync<ResponseErros>();
		responseBody!.Errors.Should().ContainSingle().And.Contain("O nome do arquivo é obrigatório.");
	}
}
