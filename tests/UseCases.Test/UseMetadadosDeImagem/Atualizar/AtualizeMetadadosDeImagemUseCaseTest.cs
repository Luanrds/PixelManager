using CommomTestUtilities.Repositorios;
using CommomTestUtilities.Requests;
using FluentAssertions;
using Moq;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.Validadores;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace UseCases.Test.UseMetadadosDeImagem.Atualizar;
public class AtualizeMetadadosDeImagemUseCaseTest
{
	[Fact]
	public async Task Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		var entidade = new PixelManager.Domain.Entidades.MetadadosDeImagem { Id = "123" };
		var (servico, repositoryMock) = CreateUseCase(entidade);

		Func<Task> act = async () => await servico.Atualizar(entidade.Id, request);

		await act.Should().NotThrowAsync();
		repositoryMock.Verify(r => r.Atualize(It.IsAny<PixelManager.Domain.Entidades.MetadadosDeImagem>()), Times.Once);
		entidade.NomeDoArquivo.Should().Be(request.NomeDoArquivo);
		entidade.TipoDoArquivo.Should().Be(request.TipoDoArquivo);
	}

	[Fact]
	public async Task Error_Request_Invalido()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.NomeDoArquivo = string.Empty;
		var entidade = new PixelManager.Domain.Entidades.MetadadosDeImagem { Id = "123" };

		var (servico, repositoryMock) = CreateUseCase(entidade);

		Func<Task> action = async () => await servico.Atualizar(entidade.Id, request);

		(await action.Should().ThrowAsync<ErrosDeValidacaoException>())
			.Where(e => e.GetMensagensDeErro().Count == 1 && e.GetMensagensDeErro().Contains("O nome do arquivo é obrigatório."));

		repositoryMock.Verify(r => r.Atualize(It.IsAny<PixelManager.Domain.Entidades.MetadadosDeImagem>()), Times.Never);
	}

	[Fact]
	public async Task Error_Recurso_Nao_Encontrado()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();

		var (servico, repositoryMock) = CreateUseCase(null);

		Func<Task> action = async () => await servico.Atualizar("idInexistente", request);

		await action.Should().ThrowAsync<RecursoNaoEncontradoException>();

		repositoryMock.Verify(r => r.Atualize(It.IsAny<PixelManager.Domain.Entidades.MetadadosDeImagem>()), Times.Never);
	}

	private static (ServicoMetadadosImagens, Mock<IMetadadosDeImagemRepository>) CreateUseCase(PixelManager.Domain.Entidades.MetadadosDeImagem? entidade)
	{
		var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();
		var validator = new MetadadosDeImagemValidator();

		if (entidade is not null)
			repositoryMock.Setup(r => r.ObterPorId(entidade.Id)).ReturnsAsync(entidade);

		var servico = new ServicoMetadadosImagens(repositoryMock.Object, validator);

		return (servico, repositoryMock);
	}
}