using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;

namespace PixelManager.Domain.Repositorios;
public interface IMetadadosDeImagemRepository
{
    Task Adicione(MetadadosDeImagem metadados);
    Task<IList<MetadadosDeImagem>> ConsulteTodos();
    Task<int> ObtenhaContagemTotal();
    Task<MetadadosDeImagem?> ConsultePorId(string id);
    Task Atualize(MetadadosDeImagem metadados);
    Task Remova(string id);
    Task<IList<MetadadosDeImagem>> ConsultePorFiltroAsync(DtoFiltromMetadadosDeImagem filtro);
}