using FluentValidation.Results;
using PixelManager.Application.Validadores;
using PixelManager.Communication.Request;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Atualizar;
public class AtualizeMetadadosDeImagemUseCase :IAtualizeMetadadosDeImagemUseCase
{
	private readonly IMetadadosDeImagemRepository _repository;
	private readonly MetadadosDeImagemValidator _validator;

	public AtualizeMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository, MetadadosDeImagemValidator validator)
	{
		_repository = repository;
		_validator = validator;
	}

	public async Task Execute(long id, RequestMetadadosDeImagemJson request)
	{
		ValidationResult resultado = _validator.Validate(request);
		if (!resultado.IsValid)
		{
			List<string> mensagensDeErro = resultado.Errors.Select(e => e.ErrorMessage).ToList();
			throw new ErrosDeValidacaoException(mensagensDeErro);
		}

		MetadadosDeImagem? metadados = await _repository.ConsultePorId(id)
			?? throw new RecursoNaoEncontradoException();

		metadados.NomeDoArquivo = request.NomeDoArquivo;
		metadados.TipoDoArquivo = request.TipoDoArquivo;
		metadados.Altura = request.Altura;
		metadados.Comprimento = request.Comprimento;

		_repository.Atualize(metadados);
	}
}
