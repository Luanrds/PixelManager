using PixelManager.Domain.Dto;
using PixelManager.Domain.Entidades;
using Raven.Client.Documents.Session;

namespace PixelManager.Domain.Repositorios;
public interface IMetadadosDeImagemRepository
{
	Task Adicione(MetadadosDeImagem metadados);
	Task<IList<MetadadosDeImagem>> ConsulteTodos();
	Task<MetadadosDeImagem?> ConsultePorId(string id);
	Task Atualize(MetadadosDeImagem metadados);
	Task Remova(string id);
	T ObterTodos<T>(Func<IDocumentSession, T> execucao);
	ListaPaginada<MetadadosDeImagem> ObterPorFiltroPaginacao(IDocumentSession sessao, DtoFiltromMetadadosDeImagem filtro);
}