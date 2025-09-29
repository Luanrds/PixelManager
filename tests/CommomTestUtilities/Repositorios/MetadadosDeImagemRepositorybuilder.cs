using Moq;
using PixelManager.Domain.Entidades;
using PixelManager.Domain.Repositorios;

namespace CommomTestUtilities.Repositorios;
public static class MetadadosDeImagemRepositorybuilder
{
	public static Mock<IMetadadosDeImagemRepository> Build()
    {
		Mock<IMetadadosDeImagemRepository> mock = new();

		mock.Setup(r => r.Adicione(It.IsAny<MetadadosDeImagem>())).Returns(Task.CompletedTask);

		return mock;
	}
}
