using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.UseCase.UseMetadadosDeImagem.Consultar;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;

namespace UseCases.Test.UseMetadadosDeImagem.Consultar;
public class ConsulteTodosMetadadosDeImagemUseCaseTest
{
	[Fact]
	public async Task Success()
	{
		var listaEntidades = new List<MetadadosDeImagem>
		{
			new() { Id = "1", NomeDoArquivo = "imagem1.jpg" },
			new() { Id = "2", NomeDoArquivo = "imagem2.png" }
		};
		var (useCase, _) = CreateUseCase(listaEntidades);

		var result = await useCase.Execute();

		result.Should().HaveCount(2);
	}

	[Fact]
	public async Task Success_Lista_Vazia()
	{
		var (useCase, _) = CreateUseCase([]);

		var result = await useCase.Execute();

		result.Should().BeEmpty();
	}

	private static (ConsulteTodosMetadadosDeImagemUseCase, Mock<IMetadadosDeImagemRepository>) CreateUseCase(IList<MetadadosDeImagem> entidades)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();
		repositoryMock.Setup(r => r.ConsulteTodos()).ReturnsAsync(entidades);

		var useCase = new ConsulteTodosMetadadosDeImagemUseCase(repositoryMock.Object);
		return (useCase, repositoryMock);
	}
}