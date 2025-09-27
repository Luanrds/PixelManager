using PixelManager.Domain.Entidades;

namespace PixelManager.Infrastructure.Contexto;
public class InMemoryDatabase
{
	private static InMemoryDatabase? _instance;
	public static InMemoryDatabase Instance => _instance ??= new InMemoryDatabase();

	public List<MetadadosDeImagem> MetadadosDeImagens { get; set; } = [];
}