using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Raven.Client.Documents;
using Raven.Embedded;
using Raven.TestDriver;

namespace WebApi.Test;
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
	private IDocumentStore? _store;

	protected override void ConfigureWebHost(IWebHostBuilder builder)
	{
		builder.UseEnvironment("Test");

		builder.ConfigureServices(services =>
		{
			var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IDocumentStore));
			if (descriptor != null)
			{
				services.Remove(descriptor);
			}

			var testDriver = new RavenTestDriverWrapper();
			_store = testDriver.GetDocumentStore();
			services.AddSingleton<IDocumentStore>(_store);
		});
	}

	private class RavenTestDriverWrapper : RavenTestDriver
	{
		static RavenTestDriverWrapper()
		{
			ConfigureServer(new TestServerOptions
			{
				Licensing = new ServerOptions.LicensingOptions
				{
					ThrowOnInvalidOrMissingLicense = false
				}
			});
		}

		public IDocumentStore GetDocumentStore()
		{
			return base.GetDocumentStore();
		}
	}
}