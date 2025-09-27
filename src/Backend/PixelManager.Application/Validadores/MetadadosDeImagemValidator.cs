using FluentValidation;
using PixelManager.Communication.Request;

namespace PixelManager.Application.Validadores;
public class MetadadosDeImagemValidator : AbstractValidator<RequestMetadadosDeImagemJson>
{
	public MetadadosDeImagemValidator()
	{
		RuleFor(x => x.NomeDoArquivo)
			.NotEmpty()
			.WithMessage("O nome do arquivo é obrigatório.")
			.MaximumLength(100)
			.WithMessage("O nome do arquivo não pode exceder 100 caracteres.");

		RuleFor(x => x.TipoDoArquivo)
			.IsInEnum()
			.WithMessage("O tipo do arquivo é inválido.");

		RuleFor(x => x.Altura)
			.GreaterThan(0)
			.WithMessage("A altura da imagem deve ser maior que zero.");

		RuleFor(x => x.Comprimento)
			.GreaterThan(0)
			.WithMessage("O comprimento da imagem deve ser maior que zero.");
	}
}
