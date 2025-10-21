using PixelManager.Domain.Entidades;
using PixelManager.Domain.Enum;

namespace PixelManager.Domain.Dto;

public class DtoFiltromMetadadosDeImagem : FiltroBaseCarregarMais
{
    public string NomeDoArquivo { get; set; } = string.Empty;
    public TipoArquivo? TipoDoArquivo { get; set; }
    public DateTime? DataDeCriacaoInicial { get; set; }
    public DateTime? DataDeCriacaoFinal { get; set; }
}
