using PixelManager.Application.Conversores;
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
        var resultado = _validatorDeMetadadosImagem.Validate(request);
        if (!resultado.IsValid)
        {
            var mensagensDeErro = resultado.Errors.Select(e => e.ErrorMessage).ToList();
            throw new ErrosDeValidacaoException(mensagensDeErro);
        }

        var entidade = request.Converta();

        await _metadadosDeImagemRepository.Adicione(entidade);

        return entidade.Converta();
    }

    public async Task<List<ResponseMetadadosDeImagemJson>> ObterTodos(DtoFiltroMetadadosDeImagem filtro)
    {
        var metadados = await _metadadosDeImagemRepository.ConsultePorFiltroAsync(filtro);

        return [.. metadados.Select(m => m.Converta())];
    }

    public async Task<ResponseMetadadosDeImagemJson> ObterPorId(string id)
    {
        var metadados = await _metadadosDeImagemRepository.ConsultePorId(id)
            ?? throw new RecursoNaoEncontradoException();

        return metadados.Converta();
    }

    public async Task Atualizar(string id, RequestMetadadosDeImagemJson request)
    {
        var resultado = _validatorDeMetadadosImagem.Validate(request);
        if (!resultado.IsValid)
        {
            var mensagensDeErro = resultado.Errors.Select(e => e.ErrorMessage).ToList();
            throw new ErrosDeValidacaoException(mensagensDeErro);
        }

        var metadados = await _metadadosDeImagemRepository.ConsultePorId(id)
            ?? throw new RecursoNaoEncontradoException();

        metadados.NomeDoArquivo = request.NomeDoArquivo;
        metadados.TipoDoArquivo = request.TipoDoArquivo;
        metadados.Altura = request.Altura;
        metadados.Comprimento = request.Comprimento;

        await _metadadosDeImagemRepository.Atualize(metadados);
    }

    public async Task Deletar(string id)
    {
        if (await _metadadosDeImagemRepository.ConsultePorId(id) is null)
        {
            throw new RecursoNaoEncontradoException();
        }

        await _metadadosDeImagemRepository.Remova(id);
    }
}
