using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;
public class RemovaMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository) : IRemovaMetadadosDeImagemUseCase
{
	private readonly IMetadadosDeImagemRepository _repository = repository;

	public async Task Execute(string id)
	{
		_ = await _repository.ConsultePorId(id)
			?? throw new RecursoNaoEncontradoException();

		await _repository.Remova(id);
	}
}
