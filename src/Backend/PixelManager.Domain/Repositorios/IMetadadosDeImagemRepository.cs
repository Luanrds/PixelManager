using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;

namespace PixelManager.Domain.Repositorios;
public interface IMetadadosDeImagemRepository
{
	Task Adicione(MetadadosDeImagem metadados);
	Task Atualize(MetadadosDeImagem metadados);
	Task<MetadadosDeImagem?> ObterPorId(string id);
	Task<IList<MetadadosDeImagem>> ObterTodos();
	Task<IList<MetadadosDeImagem>> ObterPorFiltroAsync(DtoFiltroMetadadosDeImagem filtro);
    Task Remova(string id);
}