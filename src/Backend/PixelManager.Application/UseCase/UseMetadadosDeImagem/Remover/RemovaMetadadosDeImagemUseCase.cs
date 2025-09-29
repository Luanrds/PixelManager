using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.UseCase.UseMetadadosDeImagem.Remover;
public class RemovaMetadadosDeImagemUseCase : IRemovaMetadadosDeImagemUseCase
{
	private readonly IMetadadosDeImagemRepository _repository;

	public RemovaMetadadosDeImagemUseCase(IMetadadosDeImagemRepository repository)
	{
		_repository = repository;
	}

	public async Task Execute(string id)
	{
		MetadadosDeImagem? metadados = await _repository.ConsultePorId(id) 
			?? throw new RecursoNaoEncontradoException();

		await _repository.Remova(id);
	}
}
