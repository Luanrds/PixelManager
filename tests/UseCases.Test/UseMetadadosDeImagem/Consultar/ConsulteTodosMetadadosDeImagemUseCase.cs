using CommomTestUtilities.Repositorios;
using FluentAssertions;
using Moq;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.Validadores;
using PixelManager.Domain.Dto;
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
		var (validator, _) = CreateUseCase(listaEntidades);
		var filtro = new DtoFiltroMetadadosDeImagem();

        var result = await validator.ObterTodos(filtro);

		result.Should().HaveCount(2);
	}

	[Fact]
	public async Task Success_Lista_Vazia()
	{
		var (servico, _) = CreateUseCase([]);
		var filtro = new DtoFiltroMetadadosDeImagem();

        var result = await servico.ObterTodos(filtro);

		result.Should().BeEmpty();
	}

	private static (ServicoMetadadosImagens, Mock<IMetadadosDeImagemRepository>) CreateUseCase(IList<MetadadosDeImagem> entidades)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();
		repositoryMock
			.Setup(r => r.ObterPorFiltroAsync(It.IsAny<DtoFiltroMetadadosDeImagem>()))
			.ReturnsAsync(entidades);

        var validator = new MetadadosDeImagemValidator();

        var useCase = new ServicoMetadadosImagens(repositoryMock.Object, validator);
		return (useCase, repositoryMock);
	}
}