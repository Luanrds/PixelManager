using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace UseCases.Test.UseMetadadosDeImagem.Remover;
public class RemovaMetadadosDeImagemUseCaseTest
{
	[Fact]
	public async Task Success()
	{
		var entidade = new MetadadosDeImagem { Id = "123" };
		var (useCase, repositoryMock) = CreateUseCase(entidade);

		await useCase.Execute(entidade.Id);

		repositoryMock.Verify(r => r.Remova(entidade.Id), Times.Once);
	}

	[Fact]
	public async Task Error_Recurso_Nao_Encontrado()
	{
		var (useCase, repositoryMock) = CreateUseCase(null);
		var action = async () => await useCase.Execute("idInexistente");

		await action.Should().ThrowAsync<RecursoNaoEncontradoException>();

		repositoryMock.Verify(r => r.Remova(It.IsAny<string>()), Times.Never);
	}

	private static (RemovaMetadadosDeImagemUseCase, Mock<IMetadadosDeImagemRepository>) CreateUseCase(MetadadosDeImagem? entidade)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();

		if (entidade is not null)
			repositoryMock.Setup(r => r.ConsultePorId(entidade.Id)).ReturnsAsync(entidade);

		var useCase = new RemovaMetadadosDeImagemUseCase(repositoryMock.Object);
		return (useCase, repositoryMock);
	}
}
