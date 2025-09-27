using PixelManager.Domain.Enum;

namespace PixelManager.Domain.Entidades;
public class MetadadosDeImagem : EntidadeBase
{
	public string NomeDoArquivo { get; set; } = string.Empty;
	public TipoArquivo TipoDoArquivo { get; set; }
	public int Altura { get; set; }
	public int Comprimento { get; set; }
	public DateTime DataDeCriacao { get; set; } = DateTime.UtcNow;
	public float Proporcao => Altura > 0 ? (float)Comprimento / Altura : 0;
}
