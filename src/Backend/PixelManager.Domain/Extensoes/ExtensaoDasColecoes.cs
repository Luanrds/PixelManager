using PixelManager.Domain.Entidades;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace PixelManager.Domain.Extensoes;

public static class ExtensaoDasColecoes
{
    public static ListaPaginada<T> ObterPaginacao<T>(this IRavenQueryable<T> query, IDocumentSession session, FiltroBaseCarregarMais filtroBaseCarregarMais)
    {
        return new ListaPaginada<T>()
            .DefinirTotalFiltrado(query)
            .DefinirTotal(session)
            .DefinirDadosPaginados(query, filtroBaseCarregarMais);
    }
}
