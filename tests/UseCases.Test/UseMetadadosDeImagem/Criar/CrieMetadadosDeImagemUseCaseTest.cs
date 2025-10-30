using CommomTestUtilities.Repositorios;
using CommomTestUtilities.Requests;
using FluentAssertions;
using Moq;
using PixelManager.Application.MetadadosImagens;
using PixelManager.Application.Validadores;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace UseCases.Test.UseMetadadosDeImagem.Criar;
public class CrieMetadadosDeImagemUseCaseTest
{
    [Fact]
    public async Task Success()
    {
        var request = RequestMetadadosDeImagemJsonBuilder.Build();

        var (servico, repositoryMock) = CreateUseCase();

        var result = await servico.Criar(request);

        repositoryMock.Verify(r => r.Adicione(It.IsAny<MetadadosDeImagem>()), Times.Once);

        result.Should().NotBeNull();
        result.NomeDoArquivo.Should().Be(request.NomeDoArquivo);
        result.TipoDoArquivo.Should().Be(request.TipoDoArquivo);
        result.Altura.Should().Be(request.Altura);
        result.Comprimento.Should().Be(request.Comprimento);
    }

    [Fact]
    public async Task Error_Request_Invalido()
    {
        var request = RequestMetadadosDeImagemJsonBuilder.Build();
        request.NomeDoArquivo = string.Empty;

        var (servico, repositoryMock) = CreateUseCase();

        Func<Task> action = async () => await servico.Criar(request);

        (await action.Should().ThrowAsync<ErrosDeValidacaoException>())
            .Where(e => e.GetMensagensDeErro().Count == 1 && e.GetMensagensDeErro().Contains("O nome do arquivo é obrigatório."));

        repositoryMock.Verify(r => r.Adicione(It.IsAny<MetadadosDeImagem>()), Times.Never);
    }

    private static (ServicoMetadadosImagens, Mock<IMetadadosDeImagemRepository>) CreateUseCase()
    {
        var repositoryMock = MetadadosDeImagemRepositorybuilder.Build();
        var validator = new MetadadosDeImagemValidator();

        var useCase = new ServicoMetadadosImagens(repositoryMock.Object, validator);

        return (useCase, repositoryMock);
    }
}
