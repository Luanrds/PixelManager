using Bogus;
using PixelManager.Communication.Request;
using PixelManager.Domain.Enum;

namespace CommomTestUtilities.Requests;
public class RequestMetadadosDeImagemJsonBuilder
{
	public static RequestMetadadosDeImagemJson Build()
	{
		return new Faker<RequestMetadadosDeImagemJson>()
			.RuleFor(n => n.NomeDoArquivo, (f) => f.System.FileName())
			.RuleFor(n => n.TipoDoArquivo, f => f.PickRandom<TipoArquivo>())
			.RuleFor(n => n.Altura, f => f.Random.Int(100, 5000))
			.RuleFor(n => n.Comprimento, f => f.Random.Int(100, 5000));
	}
}
