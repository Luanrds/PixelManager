using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.Validadores;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace UseCases.Test.UseMetadadosDeImagem.ConsultarPorId;
public class ConsulteMetadadosDeImagemPorIdUseCaseTest
{
	[Fact]
	public async Task Success()
	{
		var entidade = new MetadadosDeImagem { Id = "123", NomeDoArquivo = "teste.png" };
		var (servico, _) = CreateUseCase(entidade);

		var result = await servico.ObterPorId(entidade.Id);

		result.Should().NotBeNull();
		result.Id.Should().Be(entidade.Id);
		result.NomeDoArquivo.Should().Be(entidade.NomeDoArquivo);
	}

	[Fact]
	public async Task Error_Recurso_Nao_Encontrado()
	{
		var (servico, _) = CreateUseCase(null);

		var action = async () => await servico.ObterPorId("idInexistente");

		await action.Should().ThrowAsync<RecursoNaoEncontradoException>();
	}

	private static (ServicoMetadadosImagens, Mock<IMetadadosDeImagemRepository>) CreateUseCase(MetadadosDeImagem? entidade)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();

		if (entidade is not null)
		{
			repositoryMock.Setup(r => r.ConsultePorId(entidade.Id)).ReturnsAsync(entidade);
		}

        var validator = new MetadadosDeImagemValidator();

        var useCase = new ServicoMetadadosImagens(repositoryMock.Object, validator);
		return (useCase, repositoryMock);
	}
}
