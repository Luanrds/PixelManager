using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;

namespace PixelManager.Domain.Repositorios;
public interface IMetadadosDeImagemRepository
{
    Task Adicione(MetadadosDeImagem metadados);
    Task Atualize(MetadadosDeImagem metadados);
    Task<MetadadosDeImagem?> ConsultePorId(string id);
    Task<IList<MetadadosDeImagem>> ConsulteTodos();
    Task<IList<MetadadosDeImagem>> ConsultePorFiltroAsync(DtoFiltroMetadadosDeImagem filtro);
    Task Remova(string id);
}