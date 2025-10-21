namespace PixelManager.Domain.Entidades;

public class FiltroBaseCarregarMais
{
    public int Skip { get; set; } = 0;
    public int Take { get; set; } = 100;
}
