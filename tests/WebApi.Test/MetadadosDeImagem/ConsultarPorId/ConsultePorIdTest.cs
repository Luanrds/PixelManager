using CommomTestUtilities.Requests;
using FluentAssertions;
using PixelManager.Communication.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Test.MetadadosDeImagem.ConsultarPorId;
public class ConsultePorIdTest : IClassFixture<CustomWebApplicationFactory>
{
	private readonly HttpClient _httpClient;

	public ConsultePorIdTest(CustomWebApplicationFactory factory)
	{
		_httpClient = factory.CreateClient();
	}

	[Fact]
	public async Task Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		var responseInicial = await _httpClient.PostAsJsonAsync("MetadadosDeImagem", request);
		var metadadoCriado = await responseInicial.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();

		var response = await _httpClient.GetAsync($"MetadadosDeImagem/{metadadoCriado!.Id}");

		response.StatusCode.Should().Be(HttpStatusCode.OK);
		var responseBody = await response.Content.ReadFromJsonAsync<ResponseMetadadosDeImagemJson>();
		responseBody!.NomeDoArquivo.Should().Be(request.NomeDoArquivo);
		responseBody.Id.Should().Be(metadadoCriado.Id);
	}

	[Fact]
	public async Task Error_NotFound()
	{
		var idInexistente = "metadados/999-A";

		var response = await _httpClient.GetAsync($"MetadadosDeImagem/{idInexistente}");

		response.StatusCode.Should().Be(HttpStatusCode.NotFound);
	}
}