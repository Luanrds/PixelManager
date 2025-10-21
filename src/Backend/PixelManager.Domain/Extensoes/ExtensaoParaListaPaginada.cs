using PixelManager.Domain.Entidades;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace PixelManager.Domain.Extensoes;

public static class ExtensaoParaListaPaginada
{
    public static ListaPaginada<T> DefinirTotalFiltrado<T>(this ListaPaginada<T> paginacao, IRavenQueryable<T> query)
    {
        paginacao.TotalFiltrado = query.Count();
        return paginacao;
    }

    public static ListaPaginada<T> DefinirDadosPaginados<T>(this ListaPaginada<T> paginacao, IRavenQueryable<T> query,FiltroBaseCarregarMais filtro)
    {
        paginacao.Dados = query
            .Skip(filtro.Skip)
            .Take(filtro.Take)
            .ToList();

        return paginacao;
    }

    public static ListaPaginada<T> DefinirTotal<T>( this ListaPaginada<T> paginacao, IDocumentSession session)
    {
        paginacao.QuantidadeTotal = session.Query<T>().Count();
        return paginacao;
    }
}
