using FluentValidation;
using PixelManager.Exceptions.Exceptions;

namespace PixelManager.Application.Validadores;

public static class ValidatorExtensions
{
    public static void ValideOuLance<T>(this IValidator<T> validator, T instance)
    {
        try
        {
            validator.ValidateAndThrow(instance);
        }
        catch (ValidationException ex)
        {
            throw new ErrosDeValidacaoException(ex);
        }
    }
}
