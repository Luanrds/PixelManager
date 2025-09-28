using CommomTestUtilities.Requests;
using FluentValidation.Results;
using PixelManager.Application.Validadores;

namespace Validators.Test.MetadadosDeImagem.Criar;
public class MetadadosDeImagemValidatorTest
{
	private readonly MetadadosDeImagemValidator _validator;

	public MetadadosDeImagemValidatorTest(MetadadosDeImagemValidator validator)
	{
		_validator = validator;
	}

	[Fact]
	public void Success()
	{
		var request = RequestMetadadosDeImagemJsonBuilder.Build();

		ValidationResult resultado = _validator.Validate(request);

		Assert.True(resultado.IsValid);
	}
}
