using PixelManager.Application.Validadores;
using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Dto;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.MetadadosImagens;

public class ServicoMetadadosImagens
{
    private readonly IMetadadosDeImagemRepository _metadadosDeImagemRepository;
    private readonly MetadadosDeImagemValidator _validatorDeMetadadosImagem;

    public ServicoMetadadosImagens(IMetadadosDeImagemRepository repository, MetadadosDeImagemValidator validator)
    {
        _metadadosDeImagemRepository = repository;
        _validatorDeMetadadosImagem = validator;
    }

    public async Task<ResponseMetadadosDeImagemJson> Criar(RequestMetadadosDeImagemJson request)
    {
        _validatorDeMetadadosImagem.ValideOuLance(request);

        var entidade = request.ConverterParaMetadadosDeImagem();

        await _metadadosDeImagemRepository.Adicione(entidade);

        return ResponseMetadadosDeImagemJson.ConvertaDeEntidade(entidade);
    }

    public async Task<List<ResponseMetadadosDeImagemJson>> ObterTodos(DtoFiltroMetadadosDeImagem filtro)
    {
        var metadados = await _metadadosDeImagemRepository.ObterPorFiltroAsync(filtro);

        return [.. metadados.Select(ResponseMetadadosDeImagemJson.ConvertaDeEntidade)];
    }

    public async Task<ResponseMetadadosDeImagemJson> ObterPorId(string id)
    {
        var metadados = await _metadadosDeImagemRepository.ObterPorId(id)
            ?? throw new RecursoNaoEncontradoException();

        return ResponseMetadadosDeImagemJson.ConvertaDeEntidade(metadados);
    }

    public async Task Atualizar(string id, RequestMetadadosDeImagemJson request)
    {
        _validatorDeMetadadosImagem.ValideOuLance(request);

        var metadados = await _metadadosDeImagemRepository.ObterPorId(id)
            ?? throw new RecursoNaoEncontradoException();

        metadados.NomeDoArquivo = request.NomeDoArquivo;
        metadados.TipoDoArquivo = request.TipoDoArquivo;
        metadados.Altura = request.Altura;
        metadados.Comprimento = request.Comprimento;

        await _metadadosDeImagemRepository.Atualize(metadados);
    }

    public async Task Deletar(string id)
    {
        if (await _metadadosDeImagemRepository.ObterPorId(id) is null)
        {
            throw new RecursoNaoEncontradoException();
        }

        await _metadadosDeImagemRepository.Remova(id);
    }
}
