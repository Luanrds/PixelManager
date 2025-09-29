using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.ConsultarPorId;
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
		var (useCase, _) = CreateUseCase(entidade);

		var result = await useCase.Execute(entidade.Id);

		result.Should().NotBeNull();
		result.Id.Should().Be(entidade.Id);
		result.NomeDoArquivo.Should().Be(entidade.NomeDoArquivo);
	}

	[Fact]
	public async Task Error_Recurso_Nao_Encontrado()
	{
		var (useCase, _) = CreateUseCase(null);

		var action = async () => await useCase.Execute("idInexistente");

		await action.Should().ThrowAsync<RecursoNaoEncontradoException>();
	}

	private static (ConsulteMetadadosDeImagemPorIdUseCase, Mock<IMetadadosDeImagemRepository>) CreateUseCase(MetadadosDeImagem? entidade)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();

		if (entidade is not null)
			repositoryMock.Setup(r => r.ConsultePorId(entidade.Id)).ReturnsAsync(entidade);

		var useCase = new ConsulteMetadadosDeImagemPorIdUseCase(repositoryMock.Object);
		return (useCase, repositoryMock);
	}
}
