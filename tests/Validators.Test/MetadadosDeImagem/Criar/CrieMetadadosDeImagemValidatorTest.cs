using CommomTestUtilities.Requests;
using FluentAssertions;
using FluentValidation.Results;
using PixelManager.Application.Validadores;

namespace Validators.Test.MetadadosDeImagem.Criar;
public class CrieMetadadosDeImagemValidatorTest
{ 
	[Fact]
	public void Success()
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeTrue();
	}

	[Fact]
	public void Erro_Nome_Vazio()
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();

		request.NomeDoArquivo = string.Empty;

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeFalse();

		resultado.Errors.Should().ContainSingle()
			.And.Contain(e => e.ErrorMessage.Equals("O nome do arquivo é obrigatório."));
	}

	[Fact]
	public void Erro_Nome_Muito_Longo()
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.NomeDoArquivo = new string('a', 101);

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeFalse();

		resultado.Errors.Should().ContainSingle()
			.And.Contain(e => e.ErrorMessage.Equals("O nome do arquivo não pode exceder 100 caracteres."));
	}

	[Fact]
	public void Erro_TipoDoArquivo_Invalido()
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.TipoDoArquivo = (PixelManager.Domain.Enum.TipoArquivo)(-1);

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeFalse();

		resultado.Errors.Should().ContainSingle()
			.And.Contain(e => e.ErrorMessage.Equals("O tipo do arquivo é inválido."));
	}

	[Theory]
	[InlineData(0)]
	[InlineData(-10)]
	public void Erro_Altura_Invalida(int alturaInvalida)
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.Altura = alturaInvalida;

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeFalse();

		resultado.Errors.Should().ContainSingle()
			.And.Contain(e => e.ErrorMessage.Equals("A altura da imagem deve ser maior que zero."));
	}

	[Theory]
	[InlineData(0)]
	[InlineData(-50)]
	public void Erro_Comprimento_Invalido(int comprimentoInvalido)
	{
		var validator = new MetadadosDeImagemValidator();

		var request = RequestMetadadosDeImagemJsonBuilder.Build();
		request.Comprimento = comprimentoInvalido;

		ValidationResult resultado = validator.Validate(request);

		resultado.IsValid.Should().BeFalse();

		resultado.Errors.Should().ContainSingle()
			.And.Contain(e => e.ErrorMessage.Equals("O comprimento da imagem deve ser maior que zero."));
	}
}
