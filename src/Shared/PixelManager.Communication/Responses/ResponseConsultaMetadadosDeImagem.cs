namespace PixelManager.Communication.Responses;

public class ResponseConsultaMetadadosDeImagem
{
    public int TotalGeral { get; set; }
    public int TotalFiltrado { get; set; }
    public List<ResponseMetadadosDeImagemJson> Itens { get; set; } = [];
}
