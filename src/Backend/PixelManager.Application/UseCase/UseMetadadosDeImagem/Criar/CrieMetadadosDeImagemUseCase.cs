using FluentValidation.Results;
using PixelManager.Application.Conversores;
using PixelManager.Application.Validadores;
using PixelManager.Communication.Request;
using PixelManager.Communication.Responses;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Criar;
public class CrieMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository, MetadadosDeImagemValidator validator) : ICrieMetadadosDeImagemUseCase
{
	private readonly IMetadadosDeImagemRepository _repository = repository;
	private readonly MetadadosDeImagemValidator _validator = validator;

	public async Task<ResponseMetadadosDeImagemJson> Execute(RequestMetadadosDeImagemJson request)
	{
		ValidationResult resultado = _validator.Validate(request);
		if (!resultado.IsValid)
		{
			List<string> mensagensDeErro = resultado.Errors.Select(e => e.ErrorMessage).ToList();
			throw new ErrosDeValidacaoException(mensagensDeErro);
		}

		MetadadosDeImagem entidade = request.Converta();

		await _repository.Adicione(entidade);

		return entidade.Converta();
	}
}
