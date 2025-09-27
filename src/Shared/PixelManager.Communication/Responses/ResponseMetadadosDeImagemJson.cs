using PixelManager.Domain.Enum;

namespace PixelManager.Communication.Responses;
public class ResponseMetadadosDeImagemJson
{
	public long Id { get; set; }
	public string NomeDoArquivo { get; set; } = string.Empty;
	public TipoArquivo TipoDoArquivo { get; set; }
	public int Altura { get; set; }
	public int Comprimento { get; set; }
	public float Proporcao { get; set; }
	public DateTime DataDeCriacao { get; set; }
}
