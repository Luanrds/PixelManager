using PixelManager.Domain.Entidades;

namespace PixelManager.Domain.Repositorios;
public interface IMetadadosDeImagemRepository
{
	Task Adicione(MetadadosDeImagem metadados);
	Task<IList<MetadadosDeImagem>> ConsulteTodos();
	Task<MetadadosDeImagem?> ConsultePorId(string id);
	Task Atualize(MetadadosDeImagem metadados);
	Task Remova(string id);
}