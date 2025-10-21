using PixelManager.Domain.Interfaces;

namespace PixelManager.Domain.Entidades;

public class ListaPaginada<T> : IPaginacao
{
    public const int LINHAS_POR_PAGINA = 10;
    public const int PAGINA_PADRAO = 1;

    private int linhasPorPagina;
    public int LinhasPorPagina
    {
        get => linhasPorPagina;
        set => linhasPorPagina = value == default(int) ? LINHAS_POR_PAGINA : value;
    }

    private int pagina;
    public int Pagina
    {
        get => pagina;
        set => pagina = value == default(int) ? PAGINA_PADRAO : value;
    }

    public List<T> Dados { get; set; }
    public int QuantidadeTotal { get; set; }
    public int TotalFiltrado { get; set; }
    public Dictionary<string, object> DadosAdicionais { get; set; } = [];
}