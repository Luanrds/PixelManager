namespace PixelManager.Communication.Responses;

public class ResponseListaPaginada<T>
{
    public List<T> Dados { get; set; } = [];
    public int QuantidadeTotal { get; set; }
    public int TotalFiltrado { get; set; }
    public int Pagina { get; set; }
    public int LinhasPorPagina { get; set; }
}
