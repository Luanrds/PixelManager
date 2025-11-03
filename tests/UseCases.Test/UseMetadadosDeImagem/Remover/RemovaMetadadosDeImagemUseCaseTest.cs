using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.Validadores;
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
		var (servico, repositoryMock) = CreateUseCase(entidade);

		await servico.Deletar(entidade.Id);

		repositoryMock.Verify(r => r.Remova(entidade.Id), Times.Once);
	}

	[Fact]
	public async Task Error_Recurso_Nao_Encontrado()
	{
		var (servico, repositoryMock) = CreateUseCase(null);
		var action = async () => await servico.Deletar("idInexistente");

		await action.Should().ThrowAsync<RecursoNaoEncontradoException>();

		repositoryMock.Verify(r => r.Remova(It.IsAny<string>()), Times.Never);
	}

	private static (ServicoMetadadosImagens, Mock<IMetadadosDeImagemRepository>) CreateUseCase(MetadadosDeImagem? entidade)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();

		if (entidade is not null)
		{
			repositoryMock.Setup(r => r.ObterPorId(entidade.Id)).ReturnsAsync(entidade);
		}

        var validator = new MetadadosDeImagemValidator();

        var useCase = new ServicoMetadadosImagens(repositoryMock.Object, validator);
		return (useCase, repositoryMock);
	}
}
